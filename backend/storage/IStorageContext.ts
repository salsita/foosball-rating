import { IStorageContextTransactions } from './IStorageContextTransactions'
import { IStorageContextOperations } from './IStorageContextOperations'

export type IStorageContext = IStorageContextOperations & IStorageContextTransactions
