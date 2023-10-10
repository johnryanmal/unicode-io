<template>
  <q-card class="non-selectable" flat bordered style="display: inline-flex; flex-direction: column; flex: 2 1 0px; overflow: hidden; touch-action: pan-y">
    <q-item>
      <q-item-section>
        <q-item-label>Unicode Codepoints</q-item-label>
        <q-item-label caption>
          By Blocks
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator horizontal/>

    <div ref="splitparent" style="flex: 1 1 0px; min-height: 0; width: 100%">
      <q-splitter
        v-model="split"
        :horizontal="$q.screen.lt.md"
        :limits="[0, 100]"
        :style="{ 'height': splitheight+'px' }"
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
                v-on="(
                  $q.platform.is.desktop
                    ? {
                      pointerdown(event) {
                        if (focused === null) {
                          event.preventDefault()
                        }
                      }
                    }
                    : {}
                )"
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
        </template>

        <template #after>
          <q-tab-panels
            v-model="activeTab"
            animated
            transition-prev="jump-down"
            transition-next="jump-up"
            :style="{ 'min-width': 2*cardSize+'px' }"
          >
            <template
              v-for="[name, [min, max]], panelIndex in Object.entries(blocks)"
              :key="panelIndex"
            >
              <q-tab-panel :name="panelIndex" class="q-pa-none">
                <q-card-section :style="{ 'padding': cardGutter+'px' }">
                  <p class="text-center text-overline">{{ name }}</p>
                  <div
                    ref="grid"
                    role="grid"
                    class="justify-center"
                    :style="{
                      'display': 'grid',
                      'grid-template-columns': `repeat(auto-fill, ${cardSize}px)`,
                      'grid-gap': cardGutter+'px'
                    }"
                  >
                    <q-card
                      v-for="codepoint, cardIndex in range(min, max)"
                      :key="cardIndex"
                      ref="cards"
                      role="presentation"
                      :style="{
                        'width': cardSize+'px',
                        'height': cardSize+'px'
                      }"
                      flat bordered
                    >
                      <q-item
                        ref="items"
                        :tabindex="(card === cardIndex) ? 0 : -1"
                        clickable
                        @click="(event) => {
                          if (event.detail !== 0) {
                            // focus text area only if it was clicked
                            textarea.focus()
                          }
                          const start = textarea.selectionStart
                          const end = textarea.selectionEnd

                          const char = String.fromCodePoint(codepoint)
                          text = text.substring(0, start) + char + text.substring(end)
                          setCursor(textarea, start+1)
                        }"
                        v-intersection="(entry) => {
                          if (focused === cardIndex) {
                            visible = entry.isIntersecting
                          }
                        }"

                        v-on="(
                          $q.platform.is.desktop
                            ? {
                              pointerdown(event) {
                                if (focused === null) {
                                  event.preventDefault()
                                }
                              },
                              'focus': () => card = focused = cardIndex,
                              'blur': () => focused = null,
                            }
                            : {
                              'pointerdown': (event) => event.preventDefault()
                            }
                        )"
                        @pointerenter="hovered = cardIndex"
                        @pointerleave="hovered = null"

                        @keydown="(event) => {
                          const size = max - min + 1
                          let space = width(grid[0])
                          let columns = 0
                          while (space > cardSize) {
                            space -= cardSize
                            columns++
                            space -= cardGutter
                          }
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
                        v-ripple.center
                        class="fit text-center justify-around items-center flex column no-wrap q-pa-sm"
                        style="touch-action: manipulation"
                      >
                        <div class="text-h5" style="width: 32px; height: 32px">{{ String.fromCodePoint(codepoint) }}</div>
                        <div class="text-caption">{{ toCodepoint(codepoint) }}</div>
                      </q-item>
                      <q-tooltip
                        no-parent-event
                        ref="tooltips"
                        scroll-target=".tooltip-scroller"
                        class="text-caption text-uppercase non-selectable"
                        v-bind="(
                          $q.screen.lt.md
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
    </div>
  </q-card>

  <q-card :flat="!editing" bordered :class="editing ? 'active-card' : ''" style="display: inline-flex; flex-direction: row; flex: 1 1 0px; overflow: hidden; transition: all var(--q-transition-duration) ease-in-out">
      <q-item class="q-pr-none" style="display: flex; flex-grow: 1">
        <div class="fit" style="position: relative">
          <textarea
            ref="textarea"
            class="fit"
            @focus="editing = true"
            @blur="editing = false"
            style="border: none; outline: none; resize: none; position: absolute"
            placeholder="Type in or paste text here"
            v-model="text"
            inputmode="none"
          ></textarea>
        </div>
      </q-item>

      <q-card-actions vertical class="justify-between">
        <q-btn flat round icon="backspace" @click="(event) => {
          if (event.detail !== 0) {
            // focus text area only if it was clicked
            textarea.focus()
          }
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          if (start !== end) {
            text = text.substring(0, start) + text.substring(end)
            setCursor(textarea, start)
          } else if (start > 0) {
            text = text.substring(0, start-1) + text.substring(start)
            setCursor(textarea, start-1)
          }
        }"/>
        <q-btn flat round icon="delete" @click="text = ''"/>
      </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

import blocks from 'assets/unicode.json'
import names from 'assets/names.json'

import { dom } from 'quasar'
const { width, height } = dom

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

      if (next === tooltip.value) {
        tooltips.value[tooltip.value]?.updatePosition()
      } else {
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

    function onFrame() {
      tooltips.value[tooltip.value]?.updatePosition()
      window.requestAnimationFrame(onFrame)
    }

    const splitparent = ref(null)
    const splitheight = ref(0)
    const splitobserver = new ResizeObserver((entries) => {
      splitheight.value = entries[0].contentRect.height
    })

    const innerWidth = ref(0)
    function onResize() {
      innerWidth.value = window.innerWidth

      splitheight.value = height(splitparent.value)
      tooltips.value[tooltip.value]?.updatePosition()
    }
    const vw = computed(() => innerWidth.value/100)

    onMounted(() => {
      window.addEventListener('resize', onResize)
      onResize()
      onFrame()
      splitobserver.observe(splitparent.value)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      window.cancelAnimationFrame(onFrame)
      splitobserver.unobserve(splitparent.value)
    })

    const cardSize = computed(() => 60 + 2/3*vw.value)
    const cardGutter = computed(() => cardSize.value / 5)

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
      cardSize,
      cardGutter,
      card: ref(0),
      cards: ref([]),
      items: ref([]),
      grid: ref(null),
      text: ref(''),
      editing: ref(false),
      textarea: ref(null),
      splitheight,
      splitparent,
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
      width,
      setCursor(el, pos) {
        nextTick(() => {
          el.setSelectionRange(pos, pos)
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.active-tab {
  background-color: mix($primary, white, 10%);
}
.active-card {
  border-color: $primary;
}
</style>
