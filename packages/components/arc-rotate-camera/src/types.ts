import type { ArcRotateCamera, Scene } from '@babylonjs/core'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  scene: Scene
  camera: ArcRotateCamera
}

export type OnLoad = (event: LoadEvent) => ReturnVoid
