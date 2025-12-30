import { App } from 'vue'
import BxEngine from './src/index.vue'
export * as __BxEngine from './src/types'

BxEngine.install = (app: App): void => {
  app.component(BxEngine.name || 'BxEngine', BxEngine)
}
export {
  BxEngine,
}
export default BxEngine
