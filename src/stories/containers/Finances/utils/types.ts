import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { Team } from '@ses/core/models/interfaces/team';
import type { DateTime } from 'luxon';

export type FilterDoughnut = 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain' | 'Budget';

export interface NavigationCard {
  svgImage: JSX.Element;
  title: string;
  description?: React.ReactNode;
  href: string;
  totalDai?: number;
  valueDai?: number;
  color: string;
}
export interface BudgetsFinances {
  id: string;
  parentId: string;
  name: string;
  code: string;
  idPath: string;
  codePath: string;
  image: string;
  description: string;
}

export interface DoughnutSeries {
  name: string;
  value: number;
  percent: number;
  actuals: number;
  budgetCap: number;
  color: string;
}

export type PeriodicSelectionFilter = 'Monthly' | 'Quarterly' | 'Annually' | 'Semi-annual';

export interface DelegateExpenseTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
  hidden?: boolean;
  sortReverse?: boolean;
}

// Update Date for Expense when Api is ready
export interface MomentDataItem extends Team {
  reportMonth: DateTime;
  totalActuals: number;
  lastModified: DateTime;
}
export type Metric = 'Budget' | 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain';
export interface MetricsWithAmount {
  name: Metric;
  amount: number;
}

export type MetricValues = {
  Budget: number;
  Actual: number;
  Forecast: number;
  'Net Expenses On-chain': number;
  'Net Expenses Off-chain': number;
};
