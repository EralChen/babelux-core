<script lang="ts" setup>
import { useEngine } from '@babelux-core/composables'
import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core'

// 使用自定义的 useEngine 组合函数获取引擎实例
const engine = useEngine()

// 获取渲染的 canvas 元素
const canvas = engine.getRenderingCanvas() as HTMLCanvasElement
// 创建一个新的 Babylon.js 场景
const scene = new Scene(engine)

// 创建一个新的 ArcRotateCamera
// 参数说明：
// - "camera"：相机的名称
// - -Math.PI / 2：相机的 alpha 角度
// - Math.PI / 2.5：相机的 beta 角度
// - 3：相机的半径
// - new Vector3(0, 0, 0)：相机的目标位置
// - scene：相机所属的场景
const camera = new ArcRotateCamera(
  'camera',
  -Math.PI / 2,
  Math.PI / 2.5,
  3,
  new Vector3(0, 0, 0),
  scene,
)
// 将相机控制附加到 canvas 上
camera.attachControl(canvas, true)

// 创建一个新的 HemisphericLight
// 参数说明：
// - "light"：光源的名称
// - new Vector3(0, 1, 0)：光源的方向
const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

// 创建一个新的球体
// 参数说明：
// - "sphere"：球体的名称
// - { diameter: 2, segments: 32 }：球体的直径和分段数
// - scene：球体所属的场景
const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, null)

// 启动引擎的渲染循环
engine.runRenderLoop(() => {
  // 在每一帧渲染场景
  scene.render()
})
</script>

<template>
  <slot></slot>
</template>
