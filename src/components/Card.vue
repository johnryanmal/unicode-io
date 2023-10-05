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
        :horizontal="$q.screen.lt.md"
        style="width: 90vw; height: 90vh"
        :limits="[0, 100]"
        before-class="text-no-wrap"
        after-class="tooltip-scroller"
      >
        <template #before>
          <q-list role="tablist">
            <template v-for="[name, [min, max]], index in Object.entries(blocks)" :key="index">
              <q-item
                ref="tabs"
                role="tab"
                clickable
                active-class="active-tab"
                :active="activeTab === index"
                :tabindex="(tab === index) ? 0 : -1"
                @click="activeTab = index"
                @focus="tab = index"
                @keydown="(event) => {
                  const size = Object.keys(blocks).length

                  switch (event.code) {
                    case 'ArrowDown':
                    case 'KeyJ':
                      event.preventDefault()
                      tabs[(index + 1) % size]?.$el.focus()
                      break

                    case 'ArrowUp':
                    case 'KeyK':
                      event.preventDefault()
                      tabs[(index + size - 1) % size]?.$el.focus()
                      break
                  }
                }"
              >
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
            v-model="activeTab"
            animated
            transition-prev="jump-down"
            transition-next="jump-up"
            style="min-width: calc(2 * calc(60px + 1vw))"
          >
            <template
              v-for="[name, [min, max]], panelIndex in Object.entries(blocks)"
              :key="panelIndex"
            >
              <q-tab-panel :name="panelIndex" class="q-pa-none">
                <q-card-section>
                  <p class="text-center text-overline">{{ name }}</p>
                  <div
                    ref="grid"
                    role="grid"
                    class="row wrap justify-center items-start content-start q-gutter-md"
                  >
                    <q-card
                      v-for="codepoint, cardIndex in range(min, max)"
                      :key="cardIndex"
                      ref="cards"
                      role="presentation"
                      flat bordered
                      class="non-selectable"
                      style="width: calc(60px + 1vw); height: calc(60px + 1vw)"
                    >
                      <q-item
                        ref="items"
                        :tabindex="(card === cardIndex) ? 0 : -1"
                        clickable
                        v-intersection="(entry) => {
                          if (focused === cardIndex) {
                            visible = entry.isIntersecting
                          }
                        }"
                        @focus="card = focused = cardIndex; visble = true"
                        @blur="focused = null"
                        @mouseenter="hovered = cardIndex"
                        @mouseleave="hovered = null"
                        @keydown="(event) => {
                          const size = max - min + 1
                          const gridWidth = width(grid[0])
                          const cardWidth = width(cards[cardIndex].$el)
                          const columns = Math.floor(gridWidth / cardWidth)
                          const remainder = size % columns

                          switch (event.code) {
                            case 'ArrowRight':
                            case 'KeyL':
                              event.preventDefault()
                              items[(cardIndex + 1) % size].$el.focus()
                              break

                            case 'ArrowLeft':
                            case 'KeyH':
                              event.preventDefault()
                              items[(cardIndex + size - 1) % size].$el.focus()
                              break

                            case 'ArrowDown':
                            case 'KeyL':
                              event.preventDefault()
                              if (cardIndex < size-columns) {
                                items[cardIndex + columns].$el.focus()
                              } else {
                                items[cardIndex % columns].$el.focus()
                              }
                              break

                            case 'ArrowUp':
                            case 'KeyH':
                              event.preventDefault()
                              if (cardIndex >= columns) {
                                items[cardIndex - columns].$el.focus()
                              } else if (cardIndex >= remainder) {
                                items[size - remainder - columns + cardIndex].$el.focus()
                              } else {
                                items[size - remainder + cardIndex].$el.focus()
                              }
                              break
                          }
                        }"
                        v-ripple
                        class="fit text-center justify-around items-center flex column no-wrap q-pa-sm"
                      >
                        <div class="text-h5" style="width: 32px; height: 32px">{{ String.fromCodePoint(codepoint) }}</div>
                        <div class="text-caption">{{ toCodepoint(codepoint) }}</div>
                      </q-item>
                      <q-tooltip
                        no-parent-event
                        ref="tooltips"
                        scroll-target=".tooltip-scroller"
                        class="text-caption text-uppercase"
                        v-bind="(
                          $q.platform.is.mobile
                            ? {
                              anchor: 'top middle',
                              self: 'bottom middle'
                            }
                            : {
                              anchor: 'bottom middle',
                              self: 'top middle'
                            }
                        )"
                        transition-show="fade"
                        transition-hide="fade"
                        :offset="[0, 6]"
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
import { defineComponent, ref, computed } from 'vue'

import blocks from 'assets/unicode.json'
import names from 'assets/names.json'

import { dom } from 'quasar'

export default defineComponent({
  name: 'Card',
  setup() {
    const tooltips = ref([])

    let tooltip = ref(null)
    let _visible = ref(false)
    let _focused = ref(null)
    let _hovered = ref(null)

    function updateTooltip() {
      const next = (_visible.value ? _focused.value : null) ?? _hovered.value
      if (tooltip.value !== next) {
        tooltips.value[tooltip.value]?.hide()
        tooltips.value[next]?.show()
        tooltip.value = next
      }
    }

    const visible = computed({
      get() {
        return _visible.value
      },
      set(value) {
        _visible.value = value
        updateTooltip()
      }
    })

    const focused = computed({
      get() {
        return _focused.value
      },
      set(value) {
        _focused.value = value
        _visible.value = (_focused.value !== null)
        updateTooltip()
      }
    })

    let _timeout = null
    const hovered = computed({
      get() {
        return _hovered.value
      },
      set(value) {
        _hovered.value = value

        if (value === null) {
          updateTooltip()
        } else {
          if (_timeout !== null) {
            clearTimeout(_timeout)
          }
          _timeout = setTimeout(updateTooltip, 500)
        }
      }
    })

    return {
      blocks,
      names,
      split: ref(50),
      activeTab: ref(0),
      tab: ref(0),
      tabs: ref([]),
      tooltip,
      tooltips,
      focused,
      hovered,
      visible,
      card: ref(0),
      cards: ref([]),
      items: ref([]),
      grid: ref(null),
      toCodepoint(number) {
        return `U+${number.toString(16).padStart(4, '0')}`
      },
      range(min, max) {
        const array = []
        for (let x = min; x <= max; x++) {
          array.push(x)
        }
        return array
      },
      width(el) {
        const style = window.getComputedStyle(el)
        return parseFloat(style.marginLeft) + dom.width(el) + parseFloat(style.marginRight)
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
