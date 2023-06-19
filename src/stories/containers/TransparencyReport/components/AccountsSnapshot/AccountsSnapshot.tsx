import styled from '@emotion/styled';
import React from 'react';
import CUReserves from './components/CUReserves/CUReserves';
import ExpensesComparison from './components/ExpensesComparison/ExpensesComparison';
import FundingOverview from './components/FundingOverview/FundingOverview';
import useAccountsSnapshot from './useAccountsSnapshot';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';

interface AccountsSnapshotProps {
  snapshot: Snapshots;
  snapshotOwner: string;
}

const AccountsSnapshot: React.FC<AccountsSnapshotProps> = ({ snapshot, snapshotOwner }) => {
  const {
    expensesComparisonRows,
    includeOffChain,
    toggleIncludeOffChain,
    startDate,
    endDate,
    mainBalance,
    transactionHistory,
    cuReservesBalance,
    onChainAccounts,
  } = useAccountsSnapshot(snapshot);

  return (
    <Wrapper>
      <FundingOverview
        snapshotOwner={snapshotOwner}
        startDate={startDate}
        endDate={endDate}
        balance={mainBalance}
        transactionHistory={transactionHistory}
      />
      <CUReserves
        snapshotOwner={snapshotOwner}
        includeOffChain={includeOffChain}
        toggleIncludeOffChain={toggleIncludeOffChain}
        startDate={startDate}
        endDate={endDate}
        balance={cuReservesBalance}
        accounts={onChainAccounts}
      />
      <ExpensesComparison rows={expensesComparisonRows} />
    </Wrapper>
  );
};

export default AccountsSnapshot;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 64,
  marginBottom: 64,
});