import { Player } from '../types/Player';

const storage = require('../storage/Storage');
const { InputError } = require('../errors/InputError');

export class PlayerRepository {
  constructor() {
  }

  private static isPlayer = (test: unknown): test is Player => {
    if (typeof test !== 'object' || !test) return false;
    const { name, initialRating } = test as Player;
    return !!name || !!initialRating;
  };

  private static isValidName = (name: string) => {
    return name.length > 0 && name.length === name.trim().length;
  };

  public static addPlayer = async (body: unknown): Promise<Player> => {
    if (!PlayerRepository.isPlayer(body)) {
      throw new InputError('Player is not valid');
    }
    if (!PlayerRepository.isValidName(body.name)) {
      throw new InputError('The name is not valid');
    }

    return await storage.insertPlayer(body);
  };
}
