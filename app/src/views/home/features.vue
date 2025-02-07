<script lang="ts" setup>
import { useScene } from '@babelux-core/composables'
import WarehouseContainers from './components/warehouse-containers.vue'
import WarehouseFloor from './components/warehouse-floor.vue'
import WarehouseLighting from './components/warehouse-lighting.vue'
import WarehouseShelves from './components/warehouse-shelves.vue'

const scene = useScene()
</script>

<template>
  <WarehouseFloor />
  <WarehouseLighting />
  <WarehouseShelves />
  <WarehouseContainers />
</template>
