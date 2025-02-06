<script lang="ts" setup>
import { useScene } from '@babelux-core/composables'
import { ArcRotateCamera, Color3, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()

// Create camera
const camera = new ArcRotateCamera('camera', 0, Math.PI / 3, 10, Vector3.Zero(), scene)
camera.attachControl(undefined, true)

// Create a basic cube
const box = MeshBuilder.CreateBox('box', { size: 2 }, scene)
box.position = new Vector3(0, 1, 0)

// Add material to the cube
const material = new StandardMaterial('boxMaterial', scene)
material.diffuseColor = new Color3(0.4, 0.4, 0.8)
box.material = material

// Rotation animation
function renderFunction () {
  box.rotation.y += 0.01
}
scene.registerBeforeRender(renderFunction)

// Clean up
onBeforeUnmount(() => {
  scene.unregisterBeforeRender(renderFunction)
  box.dispose()
  material.dispose()
  camera.dispose()
})
</script>

<template>
  <slot></slot>
</template>
