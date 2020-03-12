export const UNIQUE_VIOLATION_CODE = '23505'

export const isUniqueViolation = (error): boolean => error.code == UNIQUE_VIOLATION_CODE
