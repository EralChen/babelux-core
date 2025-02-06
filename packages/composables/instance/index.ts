import type { Engine } from '@babylonjs/core'
import { inject } from 'vue'

export function useEngine () {
  const engine = inject<Engine>('bx_engine')
  if (!engine) {
    throw new Error('useEngine() must be used inside a <Engine> component')
  }
  return engine
}
