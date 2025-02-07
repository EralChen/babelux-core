import type { PropType } from 'vue'
import type { LoadEvent } from './types'
import { Vector3 } from '@babylonjs/core'

export const props = {
  name: {
    type: String,
    default: 'arc_rotate_camera',
  },
  alpha: {
    type: Number,
    default: 0,
  },
  beta: {
    type: Number,
    default: Math.PI / 3,
  },
  radius: {
    type: Number,
    default: 10,
  },
  target: {
    type: Object as PropType<Vector3>,
    default: () => Vector3.Zero(),
  },
  setActiveOnSceneIfNoneActive: {
    type: Boolean,
    default: true,
  },

}

export const emits = {
  load: (e: LoadEvent) => e,
}
