import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import { parseQuarter } from './utils/quarters';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';
const useFinancesOverview = (quarterExpenses: ExpenseDto[] = [], monthly: Partial<ExpenseDto>[]) => {
  const sortedQuarters = useMemo(
    () =>
      quarterExpenses.sort((a, b) => {
        const [aYear, aQuarter] = parseQuarter(a.period);
        const [bYear, bQuarter] = parseQuarter(b.period);

        return aYear !== bYear ? aYear - bYear : aQuarter - bQuarter;
      }),
    [quarterExpenses]
  );
  const [selectedYear, setSelectedYear] = useState<number>(() => DateTime.local().minus({ year: 1 }).year);

  const { isLight } = useThemeContext();
  const years = [2021, 2022, 2023];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockData = [
    {
      period: '2023-01',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 13512500.0,
    },
    {
      period: '2023-02',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-03',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-04',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 1230000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-05',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 34234343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-06',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 23234343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-07',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 4451000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-08',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 23212343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-09',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 3234343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-10',
      budget: '/makerdao/core-units',
      prediction: 0.0,
      actuals: 1934343.0,
      discontinued: 3932650.0,
    },
    {
      period: '2023-11',
      budget: '/makerdao/core-units',
      prediction: 0,
      actuals: 3334343.0,
      discontinued: 433432,
    },
    {
      period: '2023-12',
      budget: '/makerdao/core-units',
      prediction: 41345123.0,
      actuals: 34545456,
      discontinued: 0,
    },
  ];

  const handleChangeSelectYear = (year: number) => {
    setSelectedYear(year);
  };

  const totalExpenses = useCallback(() => {
    const valuesYearSelect = monthly.filter(
      (charValue) => DateTime.fromISO(charValue?.period || '').year === selectedYear
    );

    const prediction = valuesYearSelect.map((item) => item?.prediction) || [];
    const moment = prediction?.reduce((current, next) => (current || 0) + (next || 0), 0);

    return moment;
  }, [monthly, selectedYear]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fillArrayWhenNoData = useCallback((series: { period: string; value: number }[]) => {
    const filledArray = new Array<{ period: string; value: number }>(12).fill({
      value: 0,
      period: '',
    });

    const monthWithData = series.map((item) => ({
      value: item.value,
      period: Number(DateTime.fromISO(item.period || '').month),
    }));
    monthWithData.forEach((itemY) => {
      filledArray[itemY.period - 1] = {
        value: itemY.value,
        period: itemY.period.toString(),
      };
    });
    return filledArray;
  }, []);
  // implement function to process data from APi for the chart
  const processDataPerMonth = useCallback(() => {
    const valuesYearSelect = monthly.filter(
      (charValue) => DateTime.fromISO(charValue?.period || '').year === selectedYear
    );

    const discontinued = fillArrayWhenNoData(
      valuesYearSelect.map((item) => ({
        value: item.discontinued || 0,
        period: item.period || '',
      }))
    );
    const actuals = fillArrayWhenNoData(
      valuesYearSelect.map((item, index) => ({
        value: (item.actuals || 0) - discontinued[index].value,
        period: item.period || '',
      }))
    );
    const prediction = fillArrayWhenNoData(
      valuesYearSelect.map((item, index) => ({
        value: (item.prediction || 0) - actuals[index].value,
        period: item.period || '',
      }))
    );
    return {
      prediction,
      actuals,
      discontinued,
    };
  }, [fillArrayWhenNoData, monthly, selectedYear]);

  const valuesForChart = processDataPerMonth();
  const noneBorder = [0, 0, 0, 0];
  const lowerBorder = [0, 0, 6, 6];
  const superiorBorder = [6, 6, 0, 0];
  const fullBorder = [16, 16, 46, 46];

  const newActual = valuesForChart.actuals.map((item, index: number) => ({
    name: 'Active Budget',
    value: item.value,
    itemStyle: {
      borderRadius:
        valuesForChart.discontinued[index].value === 0 && valuesForChart.prediction[index].value === 0
          ? fullBorder
          : lowerBorder,
    },
  }));

  const newDiscontinued = valuesForChart.discontinued.map((item, index: number) => ({
    name: 'Discontinued',
    value: item.value,
    itemStyle: {
      borderRadius:
        valuesForChart.actuals[index].value === 0 && valuesForChart.prediction[index].value === 0
          ? fullBorder
          : valuesForChart.actuals[index].value !== 0 && valuesForChart.prediction[index].value !== 0
          ? noneBorder
          : valuesForChart.actuals[index].value !== 0 && valuesForChart.prediction[index].value === 0
          ? superiorBorder
          : lowerBorder,
    },
  }));

  const newPrediction = valuesForChart.prediction.map((item, index: number) => ({
    name: 'Expense forecasts',
    value: item.value,
    itemStyle: {
      borderRadius:
        valuesForChart.actuals[index].value === 0 && valuesForChart.prediction[index].value === 0
          ? fullBorder
          : superiorBorder,
    },
  }));

  return {
    isLight,
    sortedQuarters,
    selectedYear,
    years,
    handleChangeSelectYear,
    processDataPerMonth,
    newDiscontinued,
    newPrediction,
    newActual,
    totalExpenses,
  };
};

export default useFinancesOverview;
