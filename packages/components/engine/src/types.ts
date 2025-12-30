import type { Engine } from '@babylonjs/core'
import type { ReturnVoid } from '@vunk/shared'

export interface LoadEvent {
  engine: Engine
}

export type OnLoad = (e: LoadEvent) => ReturnVoid
