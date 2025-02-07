<script lang="ts" setup>
import { useScene } from '@babelux-core/composables'
import { Color3, HemisphericLight, PointLight, ShadowGenerator, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount } from 'vue'

const scene = useScene()

// Add ambient light
const ambientLight = new HemisphericLight('ambientLight', new Vector3(0, 1, 0), scene)
ambientLight.intensity = 0.4
ambientLight.groundColor = new Color3(0.2, 0.2, 0.2)

// Add main directional light for shadows
const mainLight = new PointLight('mainLight', new Vector3(0, 8, 0), scene)
mainLight.intensity = 0.7
mainLight.diffuse = new Color3(1, 0.95, 0.8) // Warm white light

// Add warehouse corner lights
const cornerLights: PointLight[] = []
const cornerPositions = [
  new Vector3(-12, 4, -8),
  new Vector3(-12, 4, 8),
  new Vector3(12, 4, -8),
  new Vector3(12, 4, 8),
]

cornerPositions.forEach((position, index) => {
  const light = new PointLight(`cornerLight${index}`, position, scene)
  light.intensity = 0.4
  light.diffuse = new Color3(1, 0.95, 0.8)
  light.range = 12
  cornerLights.push(light)
})

// Setup shadow generator
const shadowGenerator = new ShadowGenerator(1024, mainLight)
shadowGenerator.useBlurExponentialShadowMap = true
shadowGenerator.blurKernel = 32

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
