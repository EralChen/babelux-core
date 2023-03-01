import { PropType } from 'vue'

export const props = {
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'form'|'default'>,
    default: 'form',
  },
}

export const emits = {
}