import { registerNode } from '@antv/g6'
import { registerSecondParams } from './common'
import { MaterialNode } from './ctx'

export function genRect () {
  registerNode(
    MaterialNode.zzRect,
    registerSecondParams,
    'rect',
  )
}