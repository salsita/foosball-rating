import { DBError } from '../../types/Database'

export const UNIQUE_VIOLATION_CODE = '23505'
export const RAISE_EXCEPTION_CODE = 'P0001'
export const CHECK_VIOLATION_CODE = '23514'

export const isUniqueViolation = (error: DBError): boolean => error.code == UNIQUE_VIOLATION_CODE

export const isRaiseException = (error: DBError): boolean => error.code == RAISE_EXCEPTION_CODE

export const isCheckViolation = (error: DBError): boolean => error.code == CHECK_VIOLATION_CODE
