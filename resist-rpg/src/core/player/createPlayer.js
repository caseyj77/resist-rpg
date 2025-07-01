// createPlayer.js
import { initialStats } from './baseStats.js';

export function createPlayer(userName, role = 'scavenger') {
  const stats = initialStats[role];

  if (!stats) {
    throw new Error(`Unknown role: ${role}`);
  }

  return {
    name: userName,
    role,
    ...stats, // spreads strength, intelligence, curiosity
    inventory: [],
    weapons: [],
  };
}

