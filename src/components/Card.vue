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
        style="width: 90vw; height: 90vh"
        :limits="[0, 100]"
        before-class="text-no-wrap"
        after-class="tooltip-scroller"
      >
        <template #before>
          <q-list class="non-selectable">
            <template v-for="[min, max], name in blocks" :key="name">
              <q-item clickable active-class="active-tab" :active="tab == name" @click="tab = name">
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
            transition-prev="jump-down"
            transition-next="jump-up"
            style="min-width: calc(2 * calc(60px + 1vw))"
          >
            <template v-for="[min, max], name in blocks" :key="name">
              <q-tab-panel :name="name" class="q-pa-none">
                <q-card-section>
                  <p class="text-center text-overline">{{ name }}</p>
                  <div class="row wrap justify-center items-start content-start q-gutter-md">
                    <q-card
                    v-for="codepoint in range(min, max)"
                    :key="codepoint"
                    flat bordered v-ripple.early class="cursor-pointer q-hoverable non-selectable">
                      <span class="q-focus-helper"></span>
                      <q-card-section
                        class="text-center justify-around items-center flex column no-wrap q-pa-sm"
                        style="width: calc(60px + 1vw); height: calc(60px + 1vw)"
                      >
                        <div class="text-h5" style="width: 32px; height: 32px">{{ String.fromCodePoint(codepoint) }}</div>
                        <div class="text-caption">{{ toCodepoint(codepoint) }}</div>
                      </q-card-section>
                      <q-tooltip
                        scroll-target=".tooltip-scroller"
                        class="text-caption"
                        anchor="bottom middle" self="top middle"
                        transition-show="fade"
                        transition-hide="fade"
                        :delay="300"
                        :offset="[0, 5]"
                      >
                        {{ names[codepoint]?.[0] ?? name }}
                      </q-tooltip>
                    </q-card>
                  </div>
                </q-card-section>
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

import blocks from 'assets/unicode.json'
import names from 'assets/names.json'

export default defineComponent({
  name: 'Card',
  setup() {
    return {
      blocks,
      names,
      split: ref(50),
      tab: ref(Object.keys(blocks)[0]),
      toCodepoint(number) {
        return `U+${number.toString(16).padStart(4, '0')}`
      },
      *range(min, max) {
        for (let x = min; x <= max; x++) {
          yield x
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.active-tab {
  background-color: mix($primary, white, 10%);
}
</style>
