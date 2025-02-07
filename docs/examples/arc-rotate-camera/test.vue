<script lang="ts" setup>
import { useScene } from '@babelux-core/composables'
import { type ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, PointLight, StandardMaterial, Vector3 } from '@babylonjs/core'

const scene = useScene()
const _camera = scene.activeCamera as ArcRotateCamera

// Create materials
const metalMaterial = new StandardMaterial('metal-material', scene)
metalMaterial.diffuseColor = new Color3(0.4, 0.4, 0.45)
metalMaterial.specularColor = new Color3(0.8, 0.8, 0.8)
metalMaterial.specularPower = 32

const wallMaterial = new StandardMaterial('wall-material', scene)
wallMaterial.diffuseColor = new Color3(0.8, 0.8, 0.75)

// Add lights
const ambientLight = new HemisphericLight('ambient', new Vector3(0, 10, 0), scene)
ambientLight.intensity = 0.8

// Add point lights along aisles
for (let x = -15; x <= 15; x += 10) {
  for (let z = -15; z <= 15; z += 10) {
    const pointLight = new PointLight('point', new Vector3(x, 9, z), scene)
    pointLight.intensity = 0.8
    pointLight.range = 15
  }
}

// Create warehouse walls
const walls = [
  { position: new Vector3(0, 5, -25), scaling: new Vector3(50, 10, 1) }, // Back wall
  { position: new Vector3(0, 5, 25), scaling: new Vector3(50, 10, 1) }, // Front wall
  { position: new Vector3(-25, 5, 0), scaling: new Vector3(1, 10, 50) }, // Left wall
  { position: new Vector3(25, 5, 0), scaling: new Vector3(1, 10, 50) }, // Right wall
]

walls.forEach(({ position, scaling }) => {
  const wall = MeshBuilder.CreateBox('wall', { size: 1 }, scene)
  wall.position = position
  wall.scaling = scaling
  wall.material = wallMaterial
})

// Create warehouse floor
const floor = MeshBuilder.CreateGround('floor', { width: 100, height: 100 }, scene)
const floorMaterial = new StandardMaterial('floor-material', scene)
floorMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5) // Concrete color
floor.material = floorMaterial

// Create warehouse racks
function createRack (x: number, z: number) {
// Vertical supports
  const support1 = MeshBuilder.CreateBox('support', { height: 10, width: 0.4, depth: 0.4 }, scene)
  support1.position = new Vector3(x, 5, z)
  support1.material = metalMaterial

  const support2 = MeshBuilder.CreateBox('support', { height: 10, width: 0.4, depth: 0.4 }, scene)
  support2.position = new Vector3(x, 5, z + 4)
  support2.material = metalMaterial

  // Horizontal shelves
  for (let y = 2; y <= 8; y += 2) {
    const shelf = MeshBuilder.CreateBox('shelf', { height: 0.2, width: 0.8, depth: 4 }, scene)
    shelf.position = new Vector3(x, y, z + 2)
    shelf.material = metalMaterial
  }

  // Add some random boxes on shelves
  for (let y = 3; y <= 9; y += 2) {
    if (Math.random() > 0.3) {
      // Random box size variations
      const box = MeshBuilder.CreateBox('box', {
        height: 0.8 + Math.random() * 0.4,
        width: 0.4 + Math.random() * 0.4,
        depth: 0.6 + Math.random() * 0.4,
      }, scene)
      box.position = new Vector3(
        x + (Math.random() * 0.2 - 0.1),
        y,
        z + 2 + (Math.random() * 2 - 1),
      )

      const boxMaterial = new StandardMaterial('box-material', scene)
      // More varied box colors including some accent colors
      const useAccentColor = Math.random() > 0.7
      if (useAccentColor) {
        boxMaterial.diffuseColor = new Color3(
          0.8 + Math.random() * 0.2,
          0.2 + Math.random() * 0.2,
          0.2 + Math.random() * 0.2,
        )
      }
      else {
        boxMaterial.diffuseColor = new Color3(
          0.6 + Math.random() * 0.2,
          0.6 + Math.random() * 0.2,
          0.6 + Math.random() * 0.2,
        )
      }
      boxMaterial.specularPower = 32
      box.material = boxMaterial
    }
  }
}

// Create multiple racks
for (let x = -20; x <= 20; x += 5) {
  for (let z = -20; z <= 20; z += 10) {
    createRack(x, z)
  }
}

// Center camera initially
// Position camera for a good initial view
_camera.target = new Vector3(0, 5, 0)
_camera.radius = 30
_camera.alpha = Math.PI / 4 // 45 degrees horizontal
_camera.beta = Math.PI / 3 // 60 degrees vertical
</script>

<template>
  <slot></slot>
</template>
