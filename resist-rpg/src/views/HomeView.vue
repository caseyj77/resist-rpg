<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  // Static text
const drawText = () => {
  ctx.clearRect(0, 0, 1280, 720)

  // Slight flicker in color brightness
  const brightness = Math.floor(Math.random() * 40) + 215 // range: 215–255
  ctx.fillStyle = `rgb(${brightness}, ${brightness * 0.4}, 0)` // flickery orange

  ctx.font = '46px "Press Start 2P"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Are you ready to RESIST', 640, 360)
}

  const drawCRTOverlay = () => {
    const opacity = Math.random() * 0.05 + 0.02 // subtle flicker
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.fillRect(0, 0, 1280, 720)
  }

  const render = () => {
    drawText()
    drawCRTOverlay()
    requestAnimationFrame(render)
  }

  render()
})


</script>

<template>
  <div class ="canvas-container">
    <h2> Welcome to the Wastelands</h2>
    <canvas id="game-viewer" width="1280" height="720" ref="canvasRef">
    </canvas>
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
  background-color: #1e1e1e; /* dark wasteland backdrop */
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

canvas#game-viewer {
  border: 2px solid #444;
  box-shadow: 0 0 12px #000000aa;
  background-color: #000; /* prevents white flash if canvas is cleared */
  image-rendering: pixelated; /* helps if you're doing retro-style graphics */
  width: 1280px;
  height: 720px;
  max-width: 100%;
  max-height: 80vh;
}

</style>
