<script lang="ts">
import { useScene } from '@babelux-core/composables'
import { ArcRotateCamera } from '@babylonjs/core'
import { defineComponent, onBeforeUnmount, watchEffect } from 'vue'
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
    camera._panningMouseButton = 1
    camera._useCtrlForPanning = false // Disable Ctrl + Left click panning

    emit('load', {
      camera,
      scene,
    })

    // Set camera limits
    watchEffect(() => {
      camera.lowerBetaLimit = props.lowerBetaLimit
      camera.upperBetaLimit = props.upperBetaLimit
      camera.lowerRadiusLimit = props.lowerRadiusLimit
      camera.upperRadiusLimit = props.upperRadiusLimit
    })

    watchEffect(() => {
      // If panningSensibility is explicitly set, use it directly
      if (props.panningSensibility !== undefined) {
        camera.panningSensibility = props.panningSensibility
      }
    })

    // Sync props to camera instance
    watchEffect(() => {
      camera.target = props.target
    })
    watchEffect(() => {
      camera.alpha = props.alpha
    })
    watchEffect(() => {
      camera.beta = props.beta
    })
    watchEffect(() => {
      camera.radius = props.radius
    })

    // Observe camera changes for v-model
    const matrixObserver = camera.onViewMatrixChangedObservable.add(() => {
      emit('update:alpha', camera.alpha)
      emit('update:beta', camera.beta)
      emit('update:radius', camera.radius)
    })

    const targetObserver = camera.onMeshTargetChangedObservable.add(() => {
      emit('update:target', camera.target)
    })

    // Clean up
    onBeforeUnmount(() => {
      camera.onViewMatrixChangedObservable.remove(matrixObserver)
      camera.onMeshTargetChangedObservable.remove(targetObserver)
      camera.dispose()
    })

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
