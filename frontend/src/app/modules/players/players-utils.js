import { createProfilePath } from '../../const/routes'

const createPlayerWithLink = (player, constructUrl) => ({
  ...player,
  link: constructUrl(createProfilePath(player.id)),
})

export const withLinks =
  (players, constructUrl) => players.map(player => createPlayerWithLink(player, constructUrl))
