const toNumber = (from: string = '0') => Number(from);
const toBoolean = (from: string = 'false') => from === 'true';

export const envHelpers = {
  toNumber,
  toBoolean,
}
