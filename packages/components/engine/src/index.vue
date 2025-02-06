<script lang="ts">
import type { Ref } from 'vue'
import { Engine } from '@babylonjs/core'
import { useResizeObserver } from '@vueuse/core'
import { debounce } from 'lodash-es'
import { defineComponent, onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'BxEngine',
  props,
  emits,
  setup (props, { emit }) {
    const canvasNode = shallowRef() as Ref<HTMLCanvasElement>
    const engineRef = shallowRef<Engine | null>(null)
    const ready = ref(false)
    const debounceResize = debounce(() => {
      engineRef.value?.resize()
    }, 500)

    onMounted(() => {
      engineRef.value = new Engine(
        canvasNode.value,
        true,
        props.defaultOptions,
      )
      provide('bx_engine', engineRef.value)
      ready.value = true
      emit('load', { engine: engineRef.value }) // Emit load event
    })

    onBeforeUnmount(() => {
      engineRef.value?.dispose()
    })

    useResizeObserver(canvasNode, debounceResize)

    return {
      canvasNode,
      ready,
    }
  },
})
</script>

<template>
  <div class="bx-engine">
    <canvas ref="canvasNode"></canvas>

    <slot v-if="ready"></slot>
  </div>
</template>

<style>
.bx-engine {
  width: 100%;
  height: 100%;
}
.bx-engine canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
