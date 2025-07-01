<!-- uiCharacter.vue -->
<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/playerStore'

const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['update:show'])

const store = usePlayerStore()
const player = computed(() => store.player)

const closePanel = () => {
  emit('update:show', false)
}
</script>

<template>
  <div v-if="show" class="ui-panel character-ui">
    <div class="character-header">
      <div class="portrait-placeholder"></div>
      <div class="info">
        <div><strong>Name:</strong> <span>{{ player.name }}</span></div>
        <div><strong>Role:</strong> <span>{{ player.role }}</span></div>
        <div><strong>Affiliation:</strong> <span>{{ player.affiliation }}</span></div>
      </div>
    </div>

    <div class="character-stats">
      <h4>Stats</h4>
      <ul>
        <li>Strength: <span>{{ player.stats.strength }}</span></li>
        <li>Intelligence: <span>{{ player.stats.intelligence }}</span></li>
        <li>Curiosity: <span>{{ player.stats.curiosity }}</span></li>
      </ul>
    </div>

    <div class="status-effects">
      <h4>Status Effects</h4>
      <ul>
        <li>Hunger: <span>{{ player.status.hunger }}</span></li>
        <li>Fatigue: <span>{{ player.status.fatigue }}</span></li>
        <li>Injury: <span>{{ player.status.injury }}</span></li>
      </ul>
    </div>

    <!-- Optional Close Button -->
    <button @click="closePanel" class="close-btn">Close</button>
  </div>
</template>

<style >

.ui-panel.character-ui {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 280px;
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid #555;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  color: #ddd;
  z-index: 1000;
  box-shadow: 0 0 10px #111;
  border-radius: 4px;
}

.character-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.portrait-placeholder {
  width: 64px;
  height: 64px;
  background: #333;
  border: 2px solid #888;
  box-shadow: inset 0 0 4px #000;
}

.info div {
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.character-stats,
.status-effects {
  margin-top: 1rem;
}

.character-stats h4,
.status-effects h4 {
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #777;
  padding-bottom: 2px;
  font-size: 14px;
  color: #ff6f00;
  letter-spacing: 0.5px;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

li {
  margin-bottom: 0.4rem;
  font-size: 13px;
}

.close-btn {
  margin-top: 1rem;
  background-color: #222;
  border: 1px solid #888;
  color: #fff;
  font-family: 'Courier New', monospace;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: #444;
}
</style>
