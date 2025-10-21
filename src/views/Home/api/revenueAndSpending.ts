export interface RevenueAndSpendingData {
  fees: number;
  liquidationIncome: number;
  psm: number;
  daiSpent: number;
  mkrVesting: number;
  dsr: number;
  annualProfit: number;
}
export type RevenueAndSpendingRecords = Record<string, RevenueAndSpendingData>;

const EMPTY_REVENUE_AND_SPENDING: RevenueAndSpendingRecords = {
  2021: {
    fees: 0,
    liquidationIncome: 0,
    psm: 0,
    daiSpent: 0,
    mkrVesting: 0,
    dsr: 0,
    annualProfit: 0,
  },
  2022: {
    fees: 0,
    liquidationIncome: 0,
    psm: 0,
    daiSpent: 0,
    mkrVesting: 0,
    dsr: 0,
    annualProfit: 0,
  },
  2023: {
    fees: 0,
    liquidationIncome: 0,
    psm: 0,
    daiSpent: 0,
    mkrVesting: 0,
    dsr: 0,
    annualProfit: 0,
  },
  2024: {
    fees: 0,
    liquidationIncome: 0,
    psm: 0,
    daiSpent: 0,
    mkrVesting: 0,
    dsr: 0,
    annualProfit: 0,
  },
};

export const getRevenueAndSpendingData = async () => {
  // Makerburn API has been sunset; return placeholder data until Atlas metrics are ready.
  return EMPTY_REVENUE_AND_SPENDING;
};
