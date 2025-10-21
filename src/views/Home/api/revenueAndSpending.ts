type RevenueMetric = 'fees' | 'liquidationIncome' | 'psm' | 'daiSpent' | 'mkrVesting' | 'dsr' | 'annualProfit';
export type RevenueAndSpendingRecords = Record<string, Partial<Record<RevenueMetric, number>>>;

export const getRevenueAndSpendingData = async (): Promise<RevenueAndSpendingRecords> => {
  // Makerburn API has been sunset; return an empty payload for now.
  return {};
};
