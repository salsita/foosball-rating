export const lockDate = (expected: Date): void => {
  const _Date = global.Date
  beforeEach(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    global.Date = jest.fn(() => expected) as any
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    global.Date.now = jest.fn(() => expected) as any
  })
  afterEach(() => {
    global.Date = _Date
  })
}
