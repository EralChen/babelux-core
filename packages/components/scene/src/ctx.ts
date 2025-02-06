import type { SceneOptions } from '@babylonjs/core'
import type { PropType } from 'vue'
import type { LoadEvent } from './types'

export const props = {
  defaultOptions: {
    type: Object as PropType<SceneOptions>,
    default: () => ({}),
  },
}

export const emits = {
  load: (e: LoadEvent) => e,
}
