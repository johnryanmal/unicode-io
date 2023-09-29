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
            <template v-for="[min, max], name in blocks" :key="name">
              <q-item clickable :active="tab == name" @click="tab = name">
                <q-item-section>
                  <q-item-label>{{ name }}</q-item-label>
                  <q-item-label caption>{{ toCodepoint(min) }}..{{ toCodepoint(max) }}</q-item-label>
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
            transition-prev="jump-down"
            transition-next="jump-up"
          >
            <template v-for="codepoints, name in blocks" :key="name">
              <q-tab-panel :name="name" style="height: 300px">
                <div class="text-overline text-no-wrap">{{ name }}</div>
                <div class="row wrap justify-start items-start content-start q-gutter-sm">
                  <q-intersection
                    v-for="codepoint in codepoints"
                    :key="codepoint"
                    style="width: 100px; height: 100px"
                  >
                    <q-card flat bordered class="q-ma-sm">
                      <q-card-section class="text-center justify-between">
                        <div class="text-h6">{{ String.fromCodePoint(codepoint) ?? ' '}}</div>
                        <div class="text-caption">{{ toCodepoint(codepoint) }}</div>
                      </q-card-section>
                    </q-card>
                  </q-intersection>
                </div>
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

import data from 'assets/unicode.json'

function range(min, max) {
  const array = []
  for (let x = min; x <= max; x++) {
    array.push(x)
  }
  return array
}

function mapObject(obj, func) {
  return Object.fromEntries(
    Object.entries(obj).map(func)
  )
}

export default defineComponent({
  name: 'Card',
  setup() {
    return {
      blocks: mapObject(data, (([block, [min, max]]) => [block.replaceAll('_', ' '), range(min, max)])),
      split: ref(50),
      tab: ref(Object.keys(data)[0]),
      toCodepoint(number) {
        return `U+${number.toString(16).padStart(4, '0')}`
      }
    }
  }
})
</script>
