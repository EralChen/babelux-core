<script lang="ts">
import { useScene } from '@babelux-core/composables'
import { ArcRotateCamera } from '@babylonjs/core'
import { throttle } from 'lodash-es'
import { defineComponent, onBeforeUnmount, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'BxArcRotateCamera',
  props,
  emits,
  setup (props, { emit }) {
    const scene = useScene()

    const debouncedSetPanSensibility = throttle(setPanSensibility, 500)

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
      debouncedSetPanSensibility()
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

    function setPanSensibility () {
      if (props.panningSensibility !== undefined) {
        camera.panningSensibility = props.panningSensibility
        return
      }

      if (props.panningSensibilitis.length === 0) {
        return
      }

      // Otherwise use distance-based sensitivity from panningSensibilitis array
      const distance = camera.radius
      let sensitivity = 3000 // Default fallback sensitivity

      // Sort by distance to ensure we get the right range
      const sensitivities = [...props.panningSensibilitis].sort(([a], [b]) => a - b)

      // Find the appropriate sensitivity range based on current distance
      for (const [rangeDist, rangeSens] of sensitivities) {
        if (distance <= rangeDist) {
          sensitivity = rangeSens
          break
        }
      }

      // If distance is beyond all defined ranges, use the sensitivity of the last range
      if (sensitivities.length > 0 && distance > sensitivities[sensitivities.length - 1][0]) {
        sensitivity = sensitivities[sensitivities.length - 1][1]
      }

      camera.panningSensibility = sensitivity
    }

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
