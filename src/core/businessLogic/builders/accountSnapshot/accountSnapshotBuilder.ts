import type {
  SnapshotAccount,
  SnapshotAccountBalance,
  SnapshotAccountTransaction,
} from '@ses/core/models/dto/snapshotAccountDTO';

export class SnapshotAccountBuilder {
  private readonly _snapshotAccount: SnapshotAccount;

  constructor() {
    this._snapshotAccount = {
      id: '',
      accountLabel: '',
      accountType: '',
      accountAddress: '',
      groupAccountId: '',
      upstreamAccountId: '',
      snapshotAccountTransaction: [] as SnapshotAccountTransaction[],
      snapshotAccountBalance: [] as SnapshotAccountBalance[],
    };
  }

  withId(id: string): SnapshotAccountBuilder {
    this._snapshotAccount.id = id;
    return this;
  }

  withAccountLabel(accountLabel: string): SnapshotAccountBuilder {
    this._snapshotAccount.accountLabel = accountLabel;
    return this;
  }

  withAccountType(accountType: string): SnapshotAccountBuilder {
    this._snapshotAccount.accountType = accountType;
    return this;
  }

  withAccountAddress(accountAddress: string): SnapshotAccountBuilder {
    this._snapshotAccount.accountAddress = accountAddress;
    return this;
  }

  withGroupAccountId(groupAccountId: string): SnapshotAccountBuilder {
    this._snapshotAccount.groupAccountId = groupAccountId;
    return this;
  }

  withUpstreamAccountId(upstreamAccountId: string): SnapshotAccountBuilder {
    this._snapshotAccount.upstreamAccountId = upstreamAccountId;
    return this;
  }

  addSnapshotAccountTransaction(snapshotAccountTransaction: SnapshotAccountTransaction): SnapshotAccountBuilder {
    this._snapshotAccount.snapshotAccountTransaction.push(snapshotAccountTransaction);
    return this;
  }

  addSnapshotAccountBalance(snapshotAccountBalance: SnapshotAccountBalance): SnapshotAccountBuilder {
    this._snapshotAccount.snapshotAccountBalance.push(snapshotAccountBalance);
    return this;
  }

  build(): SnapshotAccount {
    return this._snapshotAccount;
  }
}