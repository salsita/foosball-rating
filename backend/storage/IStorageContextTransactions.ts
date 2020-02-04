export interface IStorageContextTransactions {
  commit(): Promise<void>

  rollback(): Promise<void>
}
