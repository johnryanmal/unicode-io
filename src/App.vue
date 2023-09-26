<template>
  <router-view />
</template>

<style lang="scss">
html {
  overflow: hidden;
  overscroll-behavior: none;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
