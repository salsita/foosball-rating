import { Player } from '../types/Player'

let seed = 0
export const generateRandomPlayer = (): Player => {
  return {
    name: `${Date.now().toString()}${seed++}`,
  }
}
