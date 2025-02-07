<script lang="ts">
import type { PointerInfo } from '@babylonjs/core'
import { useScene } from '@babelux-core/composables'
import { ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { defineComponent, onBeforeUnmount, ref, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'BxArcRotateCamera',
  props,
  emits,
  setup (props, { emit }) {
    const scene = useScene()

    // Initialize camera once
    const camera = new ArcRotateCamera(
      props.name,
      props.alpha,
      props.beta,
      props.radius,
      props.target,
      scene,
      props.setActiveOnSceneIfNoneActive,
    )

    // Configure camera controls
    camera.attachControl()

    // Use middle mouse button (1) for panning instead of Ctrl + Left click
    camera.panningSensibility = 80 // Adjust panning sensitivity
    camera._panningMouseButton = 1
    camera._useCtrlForPanning = false // Disable Ctrl + Left click panning

    emit('load', {
      camera,
      scene,
    })

    // Sync props to camera instance
    watchEffect(() => {
      camera.target = props.target
    })
    watchEffect(() => {
      camera.alpha = props.alpha
    })
    watchEffect(() => {
      camera.radius = props.radius
    })
    watchEffect(() => {
      camera.beta = props.beta
    })

    // Clean up
    onBeforeUnmount(() => {
      camera.dispose()
    })

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
