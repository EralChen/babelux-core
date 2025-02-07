<script lang="ts" setup>
import { BxArcRotateCamera } from '@babelux-core/components/arc-rotate-camera'
import { BxEngine } from '@babelux-core/components/engine'
import { BxScene } from '@babelux-core/components/scene'
import TestVue from './test.vue'
</script>

<template>
  <BxEngine>
    <BxScene>
      <BxArcRotateCamera
        :panning-sensibilitis="[
          [20, 500],
          [50, 50],
          [100, 25],
          [1000, 18],
        ]"
      ></BxArcRotateCamera>

      <TestVue></TestVue>
    </BxScene>
  </BxEngine>
</template>
