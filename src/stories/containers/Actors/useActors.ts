import useMediaQuery from '@mui/material/useMediaQuery';
import { SortEnum } from '@ses/core/enums/sortEnum';
import lightTheme from '@ses/styles/theme/light';
import orderBy from 'lodash/orderBy';
import { useMemo, useState } from 'react';
import type { ActorTableHeader } from './components/ActorHeader/ActorsHeaderTable';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

export const useActors = (actors: EcosystemActor[], stories = false) => {
  const isLessPhone = useMediaQuery(lightTheme.breakpoints.down(376));
  const [readMore, setReadMore] = useState<boolean>(stories);
  const showTextDesk = readMore;
  const handleRead = () => {
    setReadMore(!readMore);
  };

  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Disabled,
  ]);

  const columns: ActorTableHeader[] = [
    {
      header: 'Ecosystem Actor',
      styles: {
        boxSizing: 'border-box',
        [lightTheme.breakpoints.up('desktop_1194')]: {
          minWidth: 359,
          paddingLeft: 16,
        },
      },
      sortReverse: true,
      sort: headersSort[0],
    },
    {
      header: 'Role',
      styles: {
        width: 232,
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 18,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 60,
        },
      },
      sortReverse: true,
      sort: headersSort[1],
    },
    {
      header: 'Scope',
      sort: headersSort[2],
      styles: {
        width: 232,
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 36,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 52,
          justifyContent: 'center',
        },
      },
      sortReverse: true,
    },
    {
      header: 'Last Modified',
      sort: SortEnum.Neutral,
      hidden: true,
    },
  ];

  const groupByStatusDefaultSorting: EcosystemActor[] = useMemo(() => {
    const resultMoment = orderBy(actors, 'name');

    return resultMoment;
  }, [actors]);
  const sortData = useMemo(() => {
    const sortDataFunction = (items: EcosystemActor[]) => {
      if (headersSort[sortColumn] === SortEnum.Disabled) return items;

      const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;

      const name = (a: EcosystemActor, b: EcosystemActor) => a.name.localeCompare(b.name) * multiplier;
      const role = (a: EcosystemActor, b: EcosystemActor) => a.category[0].localeCompare(b.category[0]) * multiplier;
      const scope = (a: EcosystemActor, b: EcosystemActor) =>
        a.scopes[0].name.localeCompare(b.scopes[0].name) * multiplier;

      const sortAlg = [name, role, scope, () => 0];
      return [...items].sort(sortAlg[sortColumn]);
    };
    return sortDataFunction;
  }, [headersSort, sortColumn]);

  const tableItems: EcosystemActor[] = useMemo(() => {
    const sortedData = sortData(groupByStatusDefaultSorting);
    return sortedData?.map((x: EcosystemActor) => ({
      ...x,
      value: x,
      key: x.code,
    }));
  }, [groupByStatusDefaultSorting, sortData]);

  const onSortClick = (index: number) => {
    console.log('onSortClick', index);
    const sortNeutralState = columns.map((column) =>
      column.sort ? SortEnum.Neutral : SortEnum.Disabled
    ) as SortEnum[];

    if (headersSort[index] === SortEnum.Neutral) {
      if (columns[index].sortReverse) {
        sortNeutralState[index] = SortEnum.Desc;
      } else {
        sortNeutralState[index] = SortEnum.Asc;
      }
    } else {
      sortNeutralState[index] = headersSort[index] === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc;
    }

    setHeadersSort(sortNeutralState);
    setSortColumn(index);
  };

  // TODO: Remove this add new search when filter is add
  const filtersActive = tableItems;

  return {
    handleRead,
    readMore,
    showTextDesk,
    isLessPhone,
    filtersActive,
    columns,
    onSortClick,
  };
};