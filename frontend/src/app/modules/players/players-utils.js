import { createProfilePath } from '../../const/routes'

export const createPlayerWithLink = (player, constructUrl) => {
  return {
    ...player,
    link: constructUrl(createProfilePath(player.id)),
  }
}
