<!-- gamePlayView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImg from '@/assets/images/backgrounds/hotel-background.png'
import userSpriteImg from '@/assets/images/userSprites/enforcer-nail-bat.png'
import UiCharacter from '@/components/uiCharacter.vue'

const canvasRef = ref(null)
const canvasWidth = 1280
const canvasHeight = 720

const showCharacterUI = ref(false)

// Keyboard shortcut
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'c') {
      showCharacterUI.value = !showCharacterUI.value
    }
  })

  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const background = new Image()
  const userSprite = new Image()

  background.src = backgroundImg
  userSprite.src = userSpriteImg

  let imagesLoaded = 0

  const tryStartRender = () => {
    imagesLoaded++
    if (imagesLoaded < 2) return

    const render = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight)
      ctx.drawImage(userSprite, 630, 500, 96, 96)
      requestAnimationFrame(render)
    }

    render()
  }

  background.onload = tryStartRender
  userSprite.onload = tryStartRender
})
</script>

<template>
  <div class="canvas-container">
    <div class="canvas-wrapper">
      <canvas ref="canvasRef" id="game-canvas" :width="canvasWidth" :height="canvasHeight" />
      <UiCharacter v-model:show="showCharacterUI" />
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
  overflow: hidden; /* optional if you want to crop panels */
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

</style>