import { createProfilePath } from '../../const/routes'

export const createPlayerWithLink = (player, constructUrl) => ({
  ...player,
  link: constructUrl(createProfilePath(player.id)),
})
