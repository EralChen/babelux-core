import { App } from 'vue'
import BxScene from './src/index.vue'
export * as __BxScene from './src/types'

BxScene.install = (app: App): void => {
  app.component(BxScene.name || 'BxScene', BxScene)
}
export {
  BxScene,
}
export default BxScene
