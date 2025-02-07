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

  lowerBetaLimit: {
    type: Number,
    default: 0.1,
  },
  upperBetaLimit: {
    type: [Number, null],
    default: Math.PI / 2,
  },
  lowerRadiusLimit: {
    type: [Number, null],
    default: 2.5,
  },
  upperRadiusLimit: {
    type: [Number, null],
    default: null,
  },
  panningSensibility: {
    type: Number,
    default: undefined,
  },

  // Array of [distance, sensitivity] pairs for distance-based panning sensitivity
  panningSensibilitis: {
    type: Array as PropType<[number, number][]>,
    default: () => [
      // [20, 500],
      // [50, 50],
      // [100, 25],
      // [1000, 18],
    ],

  },

}

export const emits = {
  'load': (e: LoadEvent) => e,
  'update:alpha': (_: number) => true,
  'update:beta': (_: number) => true,
  'update:radius': (_: number) => true,
  'update:target': (_: Vector3) => true,
}
