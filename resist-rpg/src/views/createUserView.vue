<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvasRef = ref(null)

const canvasWidth = 1280
const canvasHeight = 720

const playerName = ref('')
const selectedRole = ref('')
const selectedWeapon = ref('')

const roles = ['Scavenger', 'Enforcer', 'Analyst'] //this needs to pull from the list of "classes from baseStats.js file"
const weapons = ['Pipe', 'Slingshot', 'Wrench']

const startGame = () => {
  if (playerName.value && selectedRole.value && selectedWeapon.value) {
    router.push('/play')
  } else {
    alert('Please complete all fields.')
  }
}

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  let scanlineOffset = 0

  const drawCRTOverlay = () => {
    const opacity = Math.random() * 0.15 + 0.05
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const drawScanlines = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    for (let y = scanlineOffset; y < canvasHeight; y += 2) {
      ctx.fillRect(0, y, canvasWidth, 1)
    }
    scanlineOffset = (scanlineOffset + 1) % 2
  }

  const render = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    drawCRTOverlay()
    drawScanlines()
    requestAnimationFrame(render)
  }

  render()
})
</script>

<template>
  <div class="canvas-container">
    <h2>Create Your Resistance Fighter</h2>
    <div class="canvas-wrapper">
      <canvas ref="canvasRef" id="game-canvas" :width="canvasWidth" :height="canvasHeight" />

      <div class="overlay-ui">
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="playerName" placeholder="Enter your name" />
        </div>

        <div class="field">
          <label>Role</label>
          <select v-model="selectedRole">
            <option disabled value="">-- Choose a role --</option>
            <option v-for="role in roles" :key="role">{{ role }}</option>
          </select>
        </div>

        <div class="field">
          <label>Starting Weapon</label>
          <select v-model="selectedWeapon">
            <option disabled value="">-- Choose a weapon --</option>
            <option v-for="weapon in weapons" :key="weapon">{{ weapon }}</option>
          </select>
        </div>

        <button @click="startGame">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  background-color: #1e1e1e;
  color: #f0f0f0;
  font-family: 'Orbitron', sans-serif;
}

.canvas-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ff6f00;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px #000;
}

.canvas-wrapper {
  position: relative;
  width: 1280px;
  height: 720px;
}

canvas#game-canvas {
  width: 100%;
  height: 100%;
  background-color: #000;
  border: 2px solid #444;
  box-shadow: 0 0 12px #000000aa;
  image-rendering: pixelated;
  display: block;
}

/* UI Panel overlay, styled to blend into CRT layout */
.overlay-ui {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
  background: rgba(30, 30, 30, 0.95);
  padding: 2rem;
  border: 2px solid #ff6f00;
  box-shadow: 0 0 20px #ff6f00aa;
  z-index: 10;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
}

.field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  color: #ffcc80;
  font-weight: bold;
}

input,
select {
  padding: 0.5rem;
  background: #111;
  border: 1px solid #444;
  color: #fff;
  font-size: 1rem;
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #222;
  border: 2px solid #ff6f00;
  color: #ff6f00;
  font-family: 'Press Start 2P', sans-serif;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  background-color: #333;
  box-shadow: 0 0 10px #ff6f00;
}
</style>
