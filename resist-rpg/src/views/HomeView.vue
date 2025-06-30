<script setup>
import { exampleStore } from '@/stores/exampleStore'
const store = exampleStore()
</script>

<template>
  <div class="home">
    <h1>{{ store.message }}</h1>
    <button @click="store.updateMessage('Updated!')">Update Message</button>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>
