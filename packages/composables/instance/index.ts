import type { Engine, Scene } from '@babylonjs/core'
import { inject } from 'vue'

export function useEngine () {
  const engine = inject<Engine>('bx_engine')
  if (!engine) {
    throw new Error('useEngine() must be used inside a <Engine> component')
  }
  return engine
}

export function useScene () {
  const scene = inject<Scene>('bx_scene')
  if (!scene) {
    throw new Error('useScene() must be used inside a <Scene> component')
  }
  return scene
}
