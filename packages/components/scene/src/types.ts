import type { Scene } from '@babylonjs/core'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {

  scene: Scene
}

export type OnLoad = (event: LoadEvent) => ReturnVoid
