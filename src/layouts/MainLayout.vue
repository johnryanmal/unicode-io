<template>
  <q-layout>
    <q-page-container>
      <router-view class="column items-stretch q-pt-md q-px-md q-gutter-md"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>
