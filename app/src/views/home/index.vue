<script lang="ts" setup>
import { BxArcRotateCamera } from '@babelux-core/components/arc-rotate-camera'
import { BxEngine } from '@babelux-core/components/engine'
import { BxScene } from '@babelux-core/components/scene'
import Features from './features.vue'
</script>

<template>
  <BxEngine>
    <BxScene>
      <BxArcRotateCamera></BxArcRotateCamera>
      <Features></Features>
    </BxScene>
  </BxEngine>
</template>
