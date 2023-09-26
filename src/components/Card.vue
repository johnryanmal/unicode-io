<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered>

      <q-item>
        <q-item-section>
          <q-item-label>Unicode Codepoints</q-item-label>
          <q-item-label caption>
            By Blocks
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator horizontal/>

      <q-splitter
        v-model="split"
        style="height: 300px"
        :limits="[0, 100]"
        before-class="overflow-scroll text-no-wrap"
        after-class="overflow-hidden"
      >
        <template #before>
          <q-list>
            <template v-for="[name, caption] in blocks">
              <q-item clickable :active="tab == name" @click="tab = name">
                <q-item-section>
                  <q-item-label>{{ name }}</q-item-label>
                  <q-item-label caption>{{ caption }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
          <!-- <q-tabs
            v-model="tab"
            vertical
          >
            <template v-for="[name] in blocks">
              <q-tab :name="name" :label="name" />
            </template>
          </q-tabs> -->
        </template>

        <template #after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="slide-down"
            transition-next="slide-up"
          >
            <template v-for="[name, _] in blocks">
              <q-tab-panel :name="name" style="height: 300px">
                <div class="text-overline text-no-wrap">{{ name }}</div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              </q-tab-panel>
            </template>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const names = [
  'Basic Latin',
  'Latin-1 Supplement',
  'Latin Extended-A',
  'Latin Extended-B'
]

const captions = [
  'U+0000..U+007F',
  'U+0080..U+00FF',
  'U+0100..U+017F',
  'U+0180..U+024F',
]

export default defineComponent({
  name: 'Card',
  setup() {
    return {
      blocks: names.map((name, index) => [name, captions[index]]),
      split: ref(50),
      tab: ref(names[0]),
    }
  }
})
</script>
