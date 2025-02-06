<script lang="ts" setup>
import { SkUserSelectTables } from '@babelux-core/components/user-select-tables'
import { ref } from 'vue'
import { User } from '@babelux-core/api/user'

const currentUsers = ref<User[]>([])
</script>
<template>
  <p>currentUsers: {{ currentUsers }}</p>
  <SkUserSelectTables
    v-model="currentUsers"
  ></SkUserSelectTables>
</template>