import _ from 'lodash';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useUrlAnchor } from '../../../../../core/hooks/useUrlAnchor';
import { API_MONTH_TO_FORMAT } from '../../../../../core/utils/date';
import { capitalizeSentence, getWalletWidthForWallets } from '../../../../../core/utils/string';
import { renderLinks, renderWallet } from '../../transparencyReportUtils';
import type {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '../../../../../core/models/dto/coreUnitDTO';
import type {
  InnerTableColumn,
  InnerTableRow,
  RowType,
} from '../../../../components/AdvancedInnerTable/AdvancedInnerTable';
import type { DateTime } from 'luxon';

export const useTransparencyForecast = (currentMonth: DateTime, propBudgetStatements: BudgetStatementDto[]) => {
  const firstMonth = useMemo(() => currentMonth.plus({ month: 1 }), [currentMonth]);
  const secondMonth = useMemo(() => currentMonth.plus({ month: 2 }), [currentMonth]);
  const thirdMonth = useMemo(() => currentMonth.plus({ month: 3 }), [currentMonth]);
  const [thirdIndex, setThirdIndex] = useState(0);

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWalletDto } = {};

    const budgetStatement = propBudgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return [];

    budgetStatement.budgetStatementWallet.forEach((wallet) => {
      if (wallet.address) {
        if (!dict[wallet.address.toLowerCase()]) {
          wallet.name = capitalizeSentence(wallet.name);
          dict[wallet.address.toLowerCase()] = wallet;
        }
      }
    });

    return _.sortBy(Object.values(dict), 'id');
  }, [currentMonth, propBudgetStatements]);

  const getForecastForMonthOnWalletOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet =
      budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
      null;

    if (!wallet) return 0;

    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (i) => i.forecast ?? 0
    );
  };

  const getBudgetCapForMonthOnWalletOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth?.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet =
      budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
      null;

    if (!wallet) return 0;

    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === month?.toFormat(API_MONTH_TO_FORMAT)),
      (i) => i.budgetCap ?? 0
    );
  };

  const getForecastSumOfMonthsOnWallet = useCallback(
    (
      budgetStatements: BudgetStatementDto[],
      walletAddress: string | undefined,
      currentMonth: DateTime,
      months: DateTime[]
    ) => {
      let result = 0;

      if (!walletAddress) return result;

      months.forEach((month) => {
        result += getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
      });

      return result;
    },
    []
  );

  const getBudgetCapSumOfMonthsOnWallet = useCallback(
    (
      budgetStatements: BudgetStatementDto[],
      walletAddress: string | undefined,
      currentMonth: DateTime,
      months: DateTime[]
    ) => {
      let result = 0;

      if (!walletAddress) return result;

      months.forEach((month) => {
        result += getBudgetCapForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
      });

      return result;
    },
    []
  );

  const getForecastSumForMonth = (budgetStatements: BudgetStatementDto[], currentMonth: DateTime, month: DateTime) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.forecast ?? 0
      )
    );
  };

  const getForecastSumForMonths = useCallback(
    (budgetStatements: BudgetStatementDto[], currentMonth: DateTime, months: DateTime[]) => {
      let result = 0;

      months.forEach((month) => {
        result += getForecastSumForMonth(budgetStatements, currentMonth, month);
      });

      return result;
    },
    []
  );

  const getBudgetCapForMonthOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.budgetCap ?? 0
      )
    );
  };

  const getTotalQuarterlyBudgetCapOnBudgetStatement = useCallback(
    (budgetStatements: BudgetStatementDto[], months: DateTime[]) => {
      let result = 0;

      wallets.forEach((wallet) => {
        result += getBudgetCapSumOfMonthsOnWallet(
          budgetStatements,
          wallet?.address?.toLowerCase() || '',
          currentMonth,
          months
        );
      });

      return result;
    },
    [currentMonth, getBudgetCapSumOfMonthsOnWallet, wallets]
  );

  const breakdownTabs = useMemo(() => {
    if (!propBudgetStatements || propBudgetStatements.length === 0) return [];
    return wallets?.map((wallet) => wallet.name);
  }, [propBudgetStatements, wallets]);

  const getLineItemsForWalletOnMonth = (
    budgetStatements: BudgetStatementDto[],
    currentMonth: DateTime,
    month: DateTime,
    walletAddress: string
  ) => {
    const budgetStatement = budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

    if (!budgetStatement) return [];

    return (
      budgetStatement.budgetStatementWallet
        ?.find((wallet) => wallet.address?.toLowerCase() === walletAddress?.toLowerCase())
        ?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)) ?? []
    );
  };

  const getLineItemForecastSumForMonth = (items: BudgetStatementLineItemDto[], month: DateTime) =>
    _.sumBy(
      items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => item.forecast ?? 0
    );

  const getLineItemForecastSumForMonths = (items: BudgetStatementLineItemDto[], months: DateTime[]) => {
    const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
    return _.sumBy(
      items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
      (item) => item.forecast ?? 0
    );
  };

  const getBudgetCapForMonthOnLineItem = (items: BudgetStatementLineItemDto[], month: DateTime) =>
    _.sumBy(
      items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => item.budgetCap ?? 0
    );

  const getTotalQuarterlyBudgetCapOnLineItem = (items: BudgetStatementLineItemDto[], months: DateTime[]) => {
    const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
    return _.sumBy(
      items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
      (item) => item.budgetCap ?? 0
    );
  };

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `forecast-${id}`;
  };

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header) => headerToId(header)));
  }, [breakdownTabs]);

  const anchor = useUrlAnchor();
  const breakdownTitleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!scrolled && anchor && !_.isEmpty(headerIds) && headerIds.includes(anchor)) {
      setScrolled(true);
      let offset = (breakdownTitleRef?.current?.offsetTop || 0) - 260;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 90;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor, headerIds, scrolled]);

  useEffect(() => {
    if (anchor && !_.isEmpty(headerIds)) {
      setThirdIndex(Math.max(headerIds.indexOf(anchor), 0));
    }
  }, [anchor, headerIds]);

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some((item) => item.group && item.actual);
  }, [thirdIndex, wallets]);

  const mainTableColumns: InnerTableColumn[] = useMemo(
    () => [
      {
        header: 'Wallet',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(wallets),
        minWidth: getWalletWidthForWallets(wallets),
        hasBorderRight: true,
      },
      {
        header: firstMonth.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: secondMonth.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: thirdMonth.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: 'Mthly Budget',
        type: 'number',
        align: 'right',
        hasBorderRight: true,
      },
      {
        header: '3 Months',
        type: 'number',
        align: 'right',
      },
      {
        header: 'Qtly Budget',
        type: 'number',
        align: 'right',
      },
      {
        header: 'External Links',
        type: 'custom',
        align: 'left',
        isCardFooter: true,
        cellRender: renderLinks,
      },
    ],
    [firstMonth, secondMonth, thirdMonth, wallets]
  );

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!propBudgetStatements || !propBudgetStatements.length) {
      return result;
    }

    let emptyWallets = 0;

    wallets.forEach((wallet) => {
      const numberCellData = [
        getForecastForMonthOnWalletOnBudgetStatement(propBudgetStatements, wallet?.address, currentMonth, firstMonth),
        getForecastForMonthOnWalletOnBudgetStatement(propBudgetStatements, wallet?.address, currentMonth, secondMonth),
        getForecastForMonthOnWalletOnBudgetStatement(propBudgetStatements, wallet?.address, currentMonth, thirdMonth),
        getBudgetCapForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          currentMonth
        ),
        getForecastSumOfMonthsOnWallet(propBudgetStatements, wallet?.address, currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),

        getBudgetCapSumOfMonthsOnWallet(propBudgetStatements, wallet?.address, currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),
      ];

      if (numberCellData.every((n) => n === 0)) {
        emptyWallets++;
      }

      result.push({
        type: 'normal',
        items: [
          {
            column: mainTableColumns[0],
            value: wallet,
          },
          {
            column: mainTableColumns[1],
            value: numberCellData[0],
          },
          {
            column: mainTableColumns[2],
            value: numberCellData[1],
          },
          {
            column: mainTableColumns[3],
            value: numberCellData[2],
          },
          {
            column: mainTableColumns[4],
            value: numberCellData[3],
          },
          {
            column: mainTableColumns[5],
            value: numberCellData[4],
          },
          {
            column: mainTableColumns[6],
            value: numberCellData[5],
          },
          {
            column: mainTableColumns[7],
            value: wallet.address,
          },
        ],
      });
    });

    if (result.length === emptyWallets) {
      return [];
    }

    result.push({
      type: 'total',
      items: [
        {
          column: mainTableColumns[0],
          value: 'Total',
        },
        {
          column: mainTableColumns[1],
          value: getForecastSumForMonth(propBudgetStatements, currentMonth, firstMonth),
        },
        {
          column: mainTableColumns[2],
          value: getForecastSumForMonth(propBudgetStatements, currentMonth, secondMonth),
        },
        {
          column: mainTableColumns[3],
          value: getForecastSumForMonth(propBudgetStatements, currentMonth, thirdMonth),
        },
        {
          column: mainTableColumns[4],
          value: getBudgetCapForMonthOnBudgetStatement(propBudgetStatements, currentMonth, currentMonth),
        },
        {
          column: mainTableColumns[5],
          value: getForecastSumForMonths(propBudgetStatements, currentMonth, [firstMonth, secondMonth, thirdMonth]),
        },
        {
          column: mainTableColumns[6],
          value: getTotalQuarterlyBudgetCapOnBudgetStatement(propBudgetStatements, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
      ],
      hideMobile: result.length < 2,
    });

    return result;
  }, [
    propBudgetStatements,
    wallets,
    mainTableColumns,
    currentMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    getForecastSumForMonths,
    getTotalQuarterlyBudgetCapOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapSumOfMonthsOnWallet,
  ]);

  const breakdownHeaders = useMemo(() => {
    const result: InnerTableColumn[] = [
      {
        header: 'Group',
        hidden: !hasGroups,
        isCardHeader: true,
        width: '240px',
        type: 'text',
      },
      {
        header: 'Budget Category',
        isCardHeader: true,
        width: hasGroups ? '220px' : '240px',
        type: 'text',
      },
      {
        header: firstMonth.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: secondMonth.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: thirdMonth.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: 'Mthly Budget',
        type: 'number',
        align: 'right',
      },
      {
        header: '3 Months',
        type: 'number',
        align: 'right',
      },
      {
        header: 'Qtly Budget',
        type: 'number',
        align: 'right',
      },
    ];

    return result;
  }, [hasGroups, firstMonth, secondMonth, thirdMonth]);

  const getBreakdownItemsForGroup = useCallback(
    (grouped: { [id: string]: BudgetStatementLineItemDto[] }, type?: RowType) => {
      const result: InnerTableRow[] = [];
      const subTotal = {
        0: 'Sub-Total',
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      };

      for (const groupedKey in grouped) {
        const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

        let i = 1;
        for (const groupedCatKey in groupedCategory) {
          if (
            Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)) +
              Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)) +
              Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)) +
              Math.abs(
                getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth])
              ) +
              Math.abs(getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth)) +
              Math.abs(
                getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])
              ) ===
            0
          ) {
            continue;
          }

          subTotal[2] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth);

          subTotal[3] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth);

          subTotal[4] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth);

          subTotal[5] += getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]);

          subTotal[6] += getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth);

          subTotal[7] += getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]);

          result.push({
            type: 'normal',
            items: [
              {
                column: breakdownHeaders[0],
                value: i === 1 ? groupedKey : '',
              },
              {
                column: breakdownHeaders[1],
                value: groupedCatKey,
              },
              {
                column: breakdownHeaders[2],
                value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth),
              },
              {
                column: breakdownHeaders[3],
                value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth),
              },
              {
                column: breakdownHeaders[4],
                value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth),
              },

              {
                column: breakdownHeaders[6],
                value: getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth),
              },
              {
                column: breakdownHeaders[5],
                value: getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ]),
              },
              {
                column: breakdownHeaders[7],
                value: getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ]),
              },
            ],
          });

          i++;
        }
      }

      result.push({
        type: type || 'normal',
        items: [
          {
            column: breakdownHeaders[0],
            value: hasGroups ? 'Subtotal' : '',
          },
          {
            column: breakdownHeaders[1],
            value: hasGroups ? '' : 'Subtotal',
          },
          {
            column: breakdownHeaders[2],
            value: subTotal[2],
          },
          {
            column: breakdownHeaders[3],
            value: subTotal[3],
          },
          {
            column: breakdownHeaders[4],
            value: subTotal[4],
          },
          {
            column: breakdownHeaders[6],
            value: subTotal[6],
          },
          {
            column: breakdownHeaders[5],
            value: subTotal[5],
          },
          {
            column: breakdownHeaders[7],
            value: subTotal[7],
          },
        ],
      });

      return result;
    },
    [breakdownHeaders, currentMonth, firstMonth, hasGroups, secondMonth, thirdMonth]
  );

  const breakdownItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!propBudgetStatements || propBudgetStatements.length === 0) {
      return result;
    }
    if (!wallets.length) {
      return result;
    }

    const currentWalletAddress = wallets[thirdIndex]?.address ?? '';

    const ungrouped = [
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, currentMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, firstMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, secondMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, thirdMonth, currentWalletAddress),
    ];

    result.push({
      type: 'section',
      items: [
        {
          column: breakdownHeaders[0],
          value: 'Headcount Expenses',
        },
        {
          column: breakdownHeaders[1],
          value: hasGroups ? '' : 'Headcount Expenses',
        },
      ],
    });

    const groupedHeadCount = _.groupBy(
      ungrouped.filter((x) => x.headcountExpense),
      (item) => item.group
    );

    result.push(...getBreakdownItemsForGroup(groupedHeadCount, 'subTotal'));

    result.push({
      type: 'section',
      items: [
        {
          column: breakdownHeaders[0],
          value: 'Non-Headcount Expenses',
        },
        {
          column: breakdownHeaders[1],
          value: hasGroups ? '' : 'Non-Headcount Expenses',
        },
      ],
    });

    const groupedNonHeadCount = _.groupBy(
      ungrouped.filter((x) => !x.headcountExpense),
      (item) => item.group
    );

    result.push(...getBreakdownItemsForGroup(groupedNonHeadCount, 'subTotal'));

    if (result.length <= 4) {
      return [];
    }

    result.push({
      type: 'total',
      items: [
        {
          column: breakdownHeaders[0],
          value: hasGroups ? 'Total' : '',
        },
        {
          column: breakdownHeaders[1],
          value: hasGroups ? '' : 'Total',
        },
        {
          column: breakdownHeaders[2],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            firstMonth
          ),
        },
        {
          column: breakdownHeaders[3],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            secondMonth
          ),
        },
        {
          column: breakdownHeaders[4],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            thirdMonth
          ),
        },
        {
          column: breakdownHeaders[6],
          value: getBudgetCapForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            currentMonth
          ),
        },
        {
          column: breakdownHeaders[5],
          value: getForecastSumOfMonthsOnWallet(propBudgetStatements, currentWalletAddress, currentMonth, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
        {
          column: breakdownHeaders[7],
          value: getBudgetCapSumOfMonthsOnWallet(propBudgetStatements, currentWalletAddress, currentMonth, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
      ],
    });

    return result;
  }, [
    propBudgetStatements,
    wallets,
    thirdIndex,
    currentMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    breakdownHeaders,
    hasGroups,
    getBreakdownItemsForGroup,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapSumOfMonthsOnWallet,
  ]);

  return {
    thirdIndex,
    mainTableItems,
    mainTableColumns,
    headerIds,
    breakdownTabs,
    breakdownHeaders,
    breakdownItems,
    breakdownTitleRef,
    firstMonth,
    secondMonth,
    thirdMonth,
    getForecastSumOfMonthsOnWallet,
    getForecastSumForMonths,
    wallets,
  };
};