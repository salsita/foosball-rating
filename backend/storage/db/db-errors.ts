interface ErrorWithCode extends Error {
  code: string
}

export const isUniqueViolation = (e: ErrorWithCode): boolean => e.code === '23505'

export const isForeignKeyViolation = (e: ErrorWithCode): boolean => e.code === '23503'
