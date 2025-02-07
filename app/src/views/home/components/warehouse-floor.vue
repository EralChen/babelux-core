<script lang="ts" setup>
import type { Mesh } from '@babylonjs/core'
import { useScene } from '@babelux-core/composables'
import { Color3, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()

// Create floor material
const floorMaterial = new StandardMaterial('floorMaterial', scene)
floorMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2) // Dark gray
floorMaterial.specularColor = new Color3(0.05, 0.05, 0.05) // Low specular reflection
floorMaterial.roughness = 0.8 // Make it look less shiny

// Create floor
const floor = MeshBuilder.CreateGround('floor', { width: 30, height: 20 }, scene)
floor.material = floorMaterial
floor.receiveShadows = true

// Create grid lines material
const gridMaterial = new StandardMaterial('gridMaterial', scene)
gridMaterial.diffuseColor = new Color3(0.3, 0.3, 0.3)
gridMaterial.alpha = 0.3

// Add grid lines
const gridLines: Mesh[] = []
// Vertical lines
for (let x = -14; x <= 14; x += 2) {
  const line = MeshBuilder.CreateBox('gridLine', { height: 0.01, width: 0.02, depth: 20 }, scene)
  line.position = new Vector3(x, 0.01, 0)
  line.material = gridMaterial
  gridLines.push(line)
}
// Horizontal lines
for (let z = -10; z <= 10; z += 2) {
  const line = MeshBuilder.CreateBox('gridLine', { height: 0.01, width: 30, depth: 0.02 }, scene)
  line.position = new Vector3(0, 0.01, z)
  line.material = gridMaterial
  gridLines.push(line)
}

// Cleanup
onBeforeUnmount(() => {
  floor.dispose()
  floorMaterial.dispose()
  gridMaterial.dispose()
  gridLines.forEach(line => line.dispose())
})
</script>

<template>
  <slot></slot>
</template>
