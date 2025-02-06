<script lang="ts" setup>
import { BxEngine } from '@babelux-core/components/engine'
import { BxScene } from '@babelux-core/components/scene'
import TestVue from './test.vue'
</script>

<template>
  <BxEngine>
    <BxScene>
      <TestVue></TestVue>
    </BxScene>
  </BxEngine>
</template>
