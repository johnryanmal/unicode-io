<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

document.addEventListener('keydown', (event) => {
	if (event.code === 'Escape') {
		document.activeElement.blur()
	}
})

export default defineComponent({
  name: 'App'
})
</script>
