<script lang="ts" setup>
import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const data = ref('')
let engine: Engine | null = null

onMounted(() => {
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
  if (canvas) {
    engine = new Engine(canvas, true)
    const scene = createScene(engine)
    engine.runRenderLoop(() => {
      scene.render()
    })
    window.addEventListener('resize', onResize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  engine?.dispose()
})

function onResize () {
  engine?.resize()
}

function createScene (engine: Engine): Scene {
  const canvas = engine.getRenderingCanvas() as HTMLCanvasElement
  const scene = new Scene(engine)
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  light.intensity = 0.7
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene)
  sphere.position.y = 1
  const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
  return scene
}
</script>

<template>
  <div class="page-home">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<style>
.page-home {
  width: 100vw;
  height: 100vh;
}
.page-home canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
