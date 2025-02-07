<script lang="ts" setup>
import { BxArcRotateCamera } from '@babelux-core/components/arc-rotate-camera'
import { BxEngine } from '@babelux-core/components/engine'
import { BxScene } from '@babelux-core/components/scene'
import { Vector3 } from '@babylonjs/core'
import TestVue from './test.vue'
</script>

<template>
  <BxEngine>
    <BxScene>
      <BxArcRotateCamera
        :alpha="Math.PI / 2"
        :beta="Math.PI / 4"
        :radius="10"
        :target="new Vector3(0, 2, 0)"
      ></BxArcRotateCamera>

      <TestVue></TestVue>
    </BxScene>
  </BxEngine>
</template>
