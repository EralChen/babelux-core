<script lang="ts" setup>
import { useScene } from '@babelux-core/composables'
import { Color3, HemisphericLight, PointLight, ShadowGenerator, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()

// Main ambient light
const ambientLight = new HemisphericLight('ambientLight', new Vector3(0, 1, 0), scene)
ambientLight.intensity = 0.3
ambientLight.groundColor = new Color3(0.2, 0.2, 0.3) // Slightly bluish for contrast
ambientLight.specular = new Color3(0.3, 0.3, 0.3)

// Main overhead light
const mainLight = new PointLight('mainLight', new Vector3(0, 10, 0), scene)
mainLight.intensity = 0.8
mainLight.diffuse = new Color3(1, 0.97, 0.9) // Warm white
mainLight.specular = new Color3(1, 0.97, 0.9)
mainLight.radius = 2 // Larger radius for softer shadows

// Corner lights for ambiance
const cornerLights: PointLight[] = []
const cornerPositions = [
  new Vector3(-12, 4, -8),
  new Vector3(-12, 4, 8),
  new Vector3(12, 4, -8),
  new Vector3(12, 4, 8),
]

cornerPositions.forEach((position, index) => {
  const light = new PointLight(`cornerLight${index}`, position, scene)
  light.intensity = 0.5
  light.diffuse = new Color3(0.98, 0.95, 0.8) // Slightly warmer for accent lighting
  light.specular = new Color3(0.98, 0.95, 0.8)
  light.radius = 1
  light.range = 15
  cornerLights.push(light)
})

// Enhanced shadow generator
const shadowGenerator = new ShadowGenerator(2048, mainLight) // Higher resolution shadows
shadowGenerator.useBlurExponentialShadowMap = true
shadowGenerator.blurKernel = 64 // Increased blur for softer shadows
shadowGenerator.darkness = 0.7
shadowGenerator.transparencyShadow = true
shadowGenerator.setDarkness(0.7)
shadowGenerator.bias = 0.00001 // Reduce shadow acne

// Set shadow properties for corner lights
cornerLights.forEach((light) => {
  const cornerShadow = new ShadowGenerator(1024, light)
  cornerShadow.useBlurExponentialShadowMap = true
  cornerShadow.blurKernel = 32
  cornerShadow.darkness = 0.6
  cornerShadow.bias = 0.00001
})

// Cleanup
onBeforeUnmount(() => {
  ambientLight.dispose()
  mainLight.dispose()
  cornerLights.forEach(light => light.dispose())
  shadowGenerator.dispose()
})
</script>

<template>
  <slot></slot>
</template>
