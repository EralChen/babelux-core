<script lang="ts" setup>
import type { AbstractMesh, Light } from '@babylonjs/core'
import { useScene } from '@babelux-core/composables'
import { Color3, MeshBuilder, PointerEventTypes, StandardMaterial, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount, ref } from 'vue'

const scene = useScene()

// Create container material with metallic look
const containerMaterial = new StandardMaterial('containerMaterial', scene)
containerMaterial.diffuseColor = new Color3(0.7, 0.3, 0.2) // Reddish brown
containerMaterial.specularColor = new Color3(0.5, 0.5, 0.5)
containerMaterial.roughness = 0.4

// Create containers that can be moved
const containers: AbstractMesh[] = []
const selectedContainer = ref<AbstractMesh | null>(null)

function createContainer (position: Vector3) {
  const container = MeshBuilder.CreateBox('container', { height: 1, width: 1, depth: 0.8 }, scene)
  container.position = position
  container.material = containerMaterial
  containers.push(container)

  // Make container pickable and enable shadows
  container.isPickable = true
  container.receiveShadows = true

  // Add container to shadow casters
  scene.lights.forEach((light: Light) => {
    const shadowGenerator = light.getShadowGenerator?.()
    shadowGenerator?.getShadowMap()?.renderList?.push(container)
  })

  return container
}

// Create some initial containers
for (let i = 0; i < 5; i++) {
  createContainer(new Vector3(-8, 0.5, -2 + i))
}

// Handle container selection and movement
let startingPoint: Vector3 | null = null

scene.onPointerObservable.add((pointerInfo) => {
  if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
    if (pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh) {
      const pickedMesh = pointerInfo.pickInfo.pickedMesh
      if (containers.includes(pickedMesh)) {
        selectedContainer.value = pickedMesh
        startingPoint = pointerInfo.pickInfo.pickedPoint?.clone() || null

        // Highlight selected container
        if (pickedMesh.material instanceof StandardMaterial) {
          pickedMesh.material.emissiveColor = new Color3(0.2, 0.2, 0.2)
        }
      }
    }
  }

  if (pointerInfo.type === PointerEventTypes.POINTERMOVE && selectedContainer.value && startingPoint) {
    const current = pointerInfo.pickInfo?.pickedPoint
    if (current) {
      const diff = current.subtract(startingPoint)
      selectedContainer.value.position.addInPlace(new Vector3(diff.x, 0, diff.z))
      startingPoint = current
    }
  }

  if (pointerInfo.type === PointerEventTypes.POINTERUP) {
    if (selectedContainer.value && selectedContainer.value.material instanceof StandardMaterial) {
      selectedContainer.value.material.emissiveColor = new Color3(0, 0, 0)
    }
    selectedContainer.value = null
    startingPoint = null
  }
})

// Cleanup
onBeforeUnmount(() => {
  containers.forEach(container => container.dispose())
  containerMaterial.dispose()
})

// Expose selected container for UI
defineExpose({
  selectedContainer,
})
</script>

<template>
  <div class="warehouse-ui absolute left-4 top-4 p-4 bg-white/80 rounded shadow">
    <h3 class="text-lg font-bold mb-2">
      仓库管理系统
    </h3>
    <div v-if="selectedContainer" class="text-sm">
      正在移动容器: {{ selectedContainer.name }}
    </div>
    <div v-else class="text-sm">
      点击并拖动容器以移动它们
    </div>
  </div>
  <slot></slot>
</template>
