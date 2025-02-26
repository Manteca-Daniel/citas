import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const token = ref('') // Definir el token como estado reactivo

  return { token } // Asegurar que el token sea accesible desde fuera de la store
})

export const logged = defineStore('counter', () => {
  const log = ref('') // Definir el token como estado reactivo

  return { log } // Asegurar que el token sea accesible desde fuera de la store
})
