<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const canvasRef = ref(null)
const router = useRouter()

const canvasWidth = 1280
const canvasHeight = 720

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  let scanlineOffset = 0

  const drawText = () => {
    const brightness = Math.floor(Math.random() * 100) + 155
    ctx.fillStyle = `rgb(${brightness}, ${brightness * 0.4}, 0)`
    ctx.font = '46px "Press Start 2P", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Are you ready to RESIST', canvasWidth / 2, 300)
  }

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
    drawText()
    drawCRTOverlay()
    drawScanlines()
    requestAnimationFrame(render)
  }

  render()
})

const startGame = () => {
  router.push('/createUser')
}
</script>

<template>
  <div class="canvas-container">
    <h2>Welcome to the Wastelands</h2>
    <div class="canvas-wrapper">
      <canvas ref="canvasRef" id="game-canvas" width="1280" height="720"></canvas>
      <button class="start-btn" @click="startGame">Start Game</button>
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: #1e1e1e; /* Dark CRT-style backdrop */
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

/* Styled button floating on top of the canvas */
.start-btn {
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #222;
  color: #ff6f00;
  font-family: 'Press Start 2P', sans-serif;
  padding: 1rem 2rem;
  border: 3px solid #ff6f00;
  cursor: pointer;
  z-index: 10;
  transition: 0.2s ease-in-out;
}

.start-btn:hover {
  background-color: #333;
  box-shadow: 0 0 10px #ff6f00;
}
</style>
