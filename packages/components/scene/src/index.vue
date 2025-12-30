<script lang="ts">
import { useEngine } from '@babelux-core/composables'
import { Scene } from '@babylonjs/core'
import { defineComponent, onBeforeUnmount, provide } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'BxScene',
  props,
  emits,
  setup (props, { emit }) {
    const engine = useEngine()

    const scene = new Scene(engine, props.defaultOptions)

    provide('bx_scene', scene)

    emit('load', { scene })

    // Define render function
    const renderFunction = () => {
      scene.render()
    }

    // Set up render loop with specific function
    engine.runRenderLoop(renderFunction)

    // Clean up specific render function
    onBeforeUnmount(() => {
      engine.stopRenderLoop(renderFunction)
      scene.dispose()
    })

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
