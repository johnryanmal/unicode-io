<template>
  <q-page class="flex flex-center">
    <Card />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Card from 'components/Card.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { Card }
})
</script>
