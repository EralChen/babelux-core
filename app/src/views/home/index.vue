<script lang="ts" setup>
import type { __BxArcRotateCamera } from '@babelux-core/components/arc-rotate-camera'
import type { __BxScene } from '@babelux-core/components/scene'
import type {
  Scene,
} from '@babylonjs/core'
import { BxArcRotateCamera } from '@babelux-core/components/arc-rotate-camera'
import { BxEngine } from '@babelux-core/components/engine'
import { BxScene } from '@babelux-core/components/scene'
import {
  CubeTexture,
  DefaultRenderingPipeline,
  SceneOptimization,
  SceneOptimizerOptions,
  SSAORenderingPipeline,
} from '@babylonjs/core'
import Features from './features.vue'

// Scene optimization
function setupSceneOptimizations (scene: Scene) {
  const options = new SceneOptimizerOptions()
  options.addOptimization(new SceneOptimization(0))
  options.targetFrameRate = 60

  // Enable HDR rendering
  scene.imageProcessingConfiguration.isEnabled = true
  scene.imageProcessingConfiguration.contrast = 1.2
  scene.imageProcessingConfiguration.exposure = 1.0

  // Enable PBR and HDR environment
  scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
    'https://playground.babylonjs.com/textures/environment.dds',
    scene,
  )
  scene.environmentIntensity = 0.75

  // Setup default pipeline
  const pipeline = new DefaultRenderingPipeline('defaultPipeline', true, scene)
  pipeline.samples = 4 // MSAA
  pipeline.bloomEnabled = true
  pipeline.bloomThreshold = 0.8
  pipeline.bloomWeight = 0.3
  pipeline.bloomKernel = 64

  pipeline.chromaticAberrationEnabled = true
  pipeline.chromaticAberration.aberrationAmount = 1

  pipeline.sharpenEnabled = true
  pipeline.sharpen.edgeAmount = 0.3

  pipeline.grainEnabled = true
  pipeline.grain.intensity = 5

  pipeline.depthOfFieldEnabled = true
  pipeline.depthOfField.focalLength = 150
  pipeline.depthOfField.fStop = 1.4
  pipeline.depthOfField.focusDistance = 2000

  // SSAO for better depth perception
  const ssao = new SSAORenderingPipeline('ssao', scene, {
    ssaoRatio: 0.5,
    combineRatio: 1.0,
    samples: 32,
    maxZ: 100,
  })
  scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline('ssao', scene.activeCamera)
}

const loadCamera: __BxArcRotateCamera.OnLoad = ({ scene }) => {
  setupSceneOptimizations(scene)
}
</script>

<template>
  <BxEngine>
    <BxScene>
      <BxArcRotateCamera
        @load="loadCamera"
      ></BxArcRotateCamera>
      <Features></Features>
    </BxScene>
  </BxEngine>
</template>
