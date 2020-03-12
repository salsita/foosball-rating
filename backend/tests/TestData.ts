export const FOOSBALL_DATA = {
  name: 'foosball',
  description: 'what a game',
}

export const FOOSBALL_ROW = {
  Id: '1',
  Name: FOOSBALL_DATA.name,
  Description: FOOSBALL_DATA.description,
}

export const FOOSBALL_GAME = {
  id: 1,
  ...FOOSBALL_DATA,
}
