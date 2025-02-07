<script lang="ts" setup>
import type { Mesh } from '@babylonjs/core'
import { useScene } from '@babelux-core/composables'
import { Color3, MeshBuilder, PBRMaterial, Texture, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()

// Create floor material with PBR
const floorMaterial = new PBRMaterial('floorMaterial', scene)
floorMaterial.albedoColor = new Color3(0.2, 0.2, 0.2)
floorMaterial.metallic = 0.3
floorMaterial.roughness = 0.4
floorMaterial.microSurface = 0.9 // High micro-surface for better reflections

// Add some texture detail
const floorTexture = new Texture('https://playground.babylonjs.com/textures/floor_bump.png', scene)
floorMaterial.bumpTexture = floorTexture
if (floorTexture) {
  floorTexture.uScale = 4
  floorTexture.vScale = 4
}
floorMaterial.useParallax = true
floorMaterial.useParallaxOcclusion = true
floorMaterial.parallaxScaleBias = 0.1

// Create floor
const floor = MeshBuilder.CreateGround('floor', { width: 30, height: 20 }, scene)
floor.material = floorMaterial
floor.receiveShadows = true

// Create grid lines material with PBR
const gridMaterial = new PBRMaterial('gridMaterial', scene)
gridMaterial.albedoColor = new Color3(0.3, 0.3, 0.3)
gridMaterial.alpha = 0.3
gridMaterial.metallic = 0.5
gridMaterial.roughness = 0.3

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
