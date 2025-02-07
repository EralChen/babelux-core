import type { ArcRotateCamera, Scene } from '@babylonjs/core'

export interface LoadEvent {
  scene: Scene
  camera: ArcRotateCamera
}
