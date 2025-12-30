import { App } from 'vue'
import BxArcRotateCamera from './src/index.vue'
export * as __BxArcRotateCamera from './src/types'

BxArcRotateCamera.install = (app: App): void => {
  app.component(BxArcRotateCamera.name || 'BxArcRotateCamera', BxArcRotateCamera)
}
export {
  BxArcRotateCamera,
}
export default BxArcRotateCamera
