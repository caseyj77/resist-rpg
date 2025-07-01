import { defineStore } from 'pinia'
import { ref } from 'vue'

export const exampleStore = defineStore('example', () => {
  const message = ref('Hello from Pinia!')
  function updateMessage(newMsg) {
    message.value = newMsg
  }

  return { message, updateMessage }
})
