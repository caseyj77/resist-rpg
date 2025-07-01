// playerStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const player = ref({
    name: 'Rook',
    role: 'Scavenger',
    affiliation: 'Sector 9',
    stats: {
      strength: 7,
      intelligence: 5,
      curiosity: 8
    },
    status: {
      hunger: 'Low',
      fatigue: 'Alert',
      injury: 'Bruised'
    }
  })

  return { player }
})
