<script lang="ts" setup>
import type { Camera } from '@babylonjs/core'
import { useScene } from '@babelux-core/composables'
import { ArcRotateCamera, Color3, FreeCamera, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()

// Create ArcRotateCamera with panning enabled
const arcRotateCamera = new ArcRotateCamera('arcRotateCamera', 0, Math.PI / 3, 10, Vector3.Zero(), scene)
arcRotateCamera.attachControl(
  undefined,
  true,
  false,
)
// Create FreeCamera
const freeCamera = new FreeCamera('freeCamera', new Vector3(0, 5, -10), scene)
freeCamera.setTarget(Vector3.Zero())

// Initially use ArcRotateCamera
let activeCamera: Camera = arcRotateCamera
scene.activeCamera = activeCamera

// Create a basic cube to represent an item in the warehouse
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

// Function to switch cameras
function switchCamera () {
  if (activeCamera === arcRotateCamera) {
    activeCamera.detachControl()
    activeCamera = freeCamera
  }
  else {
    activeCamera.detachControl()
    activeCamera = arcRotateCamera
  }
  scene.activeCamera = activeCamera
  activeCamera.attachControl(undefined, true)
}

// Clean up
onBeforeUnmount(() => {
  scene.unregisterBeforeRender(renderFunction)
  box.dispose()
  material.dispose()
  arcRotateCamera.dispose()
  freeCamera.dispose()
})
</script>

<template>
  <button @click="switchCamera">
    Switch Camera
  </button>
  <slot></slot>
</template>
