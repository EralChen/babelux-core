<script lang="ts" setup>
import type { Light, Mesh } from '@babylonjs/core'
import { useScene } from '@babelux-core/composables'
import { Color3, MeshBuilder, PBRMaterial, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()
const _meshes: Mesh[] = []

// Create materials with PBR
const shelfMaterial = new PBRMaterial('shelfMaterial', scene)
shelfMaterial.albedoColor = new Color3(0.6, 0.6, 0.6) // Light gray for shelves
shelfMaterial.metallic = 0.8 // High metallic for metal-like appearance
shelfMaterial.roughness = 0.3 // Lower roughness for shinier appearance
shelfMaterial.microSurface = 0.95 // High micro-surface for clear reflections

// Create shelf structure
function createShelf (position: Vector3) {
  // Vertical supports
  const support1 = MeshBuilder.CreateBox('support1', { height: 4, width: 0.2, depth: 1 }, scene)
  support1.position = new Vector3(position.x - 1.4, position.y + 2, position.z)
  support1.material = shelfMaterial
  _meshes.push(support1)

  const support2 = MeshBuilder.CreateBox('support2', { height: 4, width: 0.2, depth: 1 }, scene)
  support2.position = new Vector3(position.x + 1.4, position.y + 2, position.z)
  support2.material = shelfMaterial
  _meshes.push(support2)

  // Horizontal shelves
  for (let i = 0; i < 3; i++) {
    const shelf = MeshBuilder.CreateBox('shelf', { height: 0.1, width: 3, depth: 1 }, scene)
    shelf.position = new Vector3(position.x, position.y + i * 1.5 + 0.5, position.z)
    shelf.material = shelfMaterial
    _meshes.push(shelf)
  }
}

// Create warehouse layout
for (let x = -6; x <= 6; x += 4) {
  for (let z = -4; z <= 4; z += 3) {
    createShelf(new Vector3(x, 0, z))
  }
}

// Enable shadows for all meshes
scene.lights.forEach((light: Light) => {
  const shadowGenerator = light.getShadowGenerator?.()
  if (shadowGenerator) {
    _meshes.forEach((mesh) => {
      shadowGenerator.getShadowMap()?.renderList?.push(mesh)
      mesh.receiveShadows = true
    })
  }
})

// Cleanup
onBeforeUnmount(() => {
  _meshes.forEach(mesh => mesh.dispose())
  shelfMaterial.dispose()
})
</script>

<template>
  <slot></slot>
</template>
