const toStringParams = (...args: any[]): string[] => args.map(arg => arg.toString())

export const storageContextHelpers = {
  toStringParams,
}
