<script lang="tsx" setup>
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { baseFontSize } from '@skzz/platform/theme'
import type { NormalObject, SetDataEvent } from '@vunk/core'
import { useThemeStore } from '@/stores/theme'
import { SkAppForm } from '@skzz/platform/components/app-form'
import { setData } from '@vunk/core'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const themeStore = useThemeStore()

const formData = computed(() => {
  const obj: NormalObject = {}
  Object.entries(themeStore.fontSizeStyles).forEach(([k, v]) => {
    if (k.startsWith('--f-')) {
      obj[k] = +v.replace('rem', '')
    }
    else {
      obj[k] = v
    }
  })
  return obj
})
function setFormData (e: SetDataEvent) {
  if (e.k.startsWith('--f-')) {
    e.v = `${e.v}rem`
  }
  setData(themeStore.fontSizeStyles, e)
}

const formItems: __SkAppForm.CoreFormItem<'font-size' | keyof typeof baseFontSize>[] = [
  {
    templateType: 'VkfInput',
    prop: 'font-size',
    label: 'font-size',
  },

  {
    templateType: 'VkfInputNumber',
    prop: '--f-xxs',
    label: 'f-xxs',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xs',
    label: 'f-xs',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-s',
    label: 'f-s',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-m',
    label: 'f-m',
    disabled: true,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-l',
    label: 'f-l',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xl',
    label: 'f-xl',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--f-xxl',
    label: 'f-xxl',
    step: 0.1,
  },

]

const formItemsWithDemo = computed(() => {
  return formItems.map((item) => {
    return {
      templateType: 'VkfFlex',
      align: 'baseline',
      templateSlots: [
        {
          templateType: 'VkfFlex',
          basis: '350px',
          templateSlots: [
            item,
          ],
        },

        {
          templateType: 'Component',
          is: () => (
            <div style={
              {
                fontSize: `var(${item.prop})`,
              }
            }
            >
              {item.label}
            </div>
          ),
        },
      ],
    } as __SkAppForm.FormItem
  })
})
</script>

<template>
  <SkAppForm
    :label-width="100"
    :form-items="formItemsWithDemo"
    :data="formData"
    v-bind="$attrs"
    @set-data="setFormData"
  >
  </SkAppForm>
</template>

<style>

</style>
