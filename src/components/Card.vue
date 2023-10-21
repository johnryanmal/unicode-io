<template>
  <q-card class="non-selectable" flat bordered style="display: inline-flex; flex-direction: column; flex: 2 1 0px; overflow: hidden; touch-action: pan-y">
    <!-- <q-item class="desktop-only">
      <q-item-section>
        <q-item-label>Unicode Codepoints</q-item-label>
        <q-item-label caption>
          By Blocks
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator horizontal class="desktop-only"/> -->

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
                @click="activeTab = index; page = 1"
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
            :style="{ 'min-width': 4*cardSize+5*cardGutter+'px' }"
          >
            <template
              v-for="[name, [min, max]], panelIndex in Object.entries(blocks)"
              :key="panelIndex"
            >
              <q-tab-panel :name="panelIndex" class="q-pa-none">
                <q-card-section :style="{ 'padding': cardGutter+'px' }">
                  <div class="column items-center" :style="{ 'padding-bottom': cardGutter+'px' }">
                    <div class="text-center text-overline">{{ name }}</div>
                    <q-item-label caption>{{ paginate(min, max, 256, page).map(toCodepoint).join('..') }}</q-item-label>
                    <q-pagination
                      v-if="pages(min, max, 256) > 1"
                      v-model="page"
                      :min="1"
                      :max="pages(min, max, 256)"
                      input
                    />
                  </div>

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
                      v-for="codepoint, cardIndex in range(...paginate(min, max, 256, page))"
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
                        role="button"
                        :tabindex="(card === cardIndex) ? 0 : -1"
                        clickable
                        @click="(event) => {
                          if (event.detail !== 0) {
                            // focus text area only if it was clicked
                            textarea.focus()
                          }
                          const [start, end] = getCursor(textarea)

                          const char = String.fromCodePoint(codepoint)
                          text = text.substring(0, start) + char + text.substring(end)
                          setCursor(textarea, start + char.length)
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

  <q-card :flat="!editing" bordered :class="editing ? 'active-card' : ''" style="display: inline-flex; flex-direction: column; flex: 1 1 0px; transition: all var(--q-transition-duration) ease-in-out; min-height: 50px"
  >
    <div ref="textparent" style="display: flex; flex-grow: 1; position: relative; overflow: hidden">
      <textarea
        ref="textarea"
        class="fit q-px-md no-scrollbar"
        @pointerdown="onTyping"
        @focus="editing = true"
        @blur="editing = false; inputmode = 'none'; keyboard = false; typing = false"
        @keydown="onTyping"
        style="border: none; outline: none; resize: none"
        :style="{ 'height': textheight+'px !important', 'padding-top': 8+'px', 'padding-bottom': `calc(${textheight-8+'px'} - 1em)`}"
        :placeholder="'Type in or use the buttons above to insert text here.\n\n(Those on a mobile device may find the keyboard button useful.)'"
        v-model="text"
        :inputmode="inputmode"
      ></textarea>
    </div>

    <div v-if="!$q.screen.lt.md && !typing" class="text-caption" style="position: absolute; bottom: 0px; left: 0px; padding-left: 4px; background-color: rgb(255, 255, 255, 0.85); pointer-events: none">
      <span>
        {{ plural('codepoint', codepoints(text).length) }} ({{ plural('non-surrogate', nonSurrogates(text).length) }}, {{ plural('surrogate pair', surrogatePairs(text).length) }}, {{ plural('lone surrogate', loneSurrogates(text).length) }}), {{ plural('code unit', text.length) }} (Encoding: UTF-16)
      </span>
    </div>

    <div
      style="position: absolute; bottom: 4px; right: 4px; display: flex; flex-direction: row-reverse; justify-content: end; align-items: end; gap: 4px; background-color: rgb(255, 255, 255, 0.85); border-radius: max(100vw, 100vh)"
      :style="{
        'gap': cardGutter+'px'
      }"
    >
      <q-item
        ref="delete"
        role="button"
        clickable
        v-ripple.center
        class="q-pa-none row justify-center items-center"
        style="width: 42px; height: 42px; min-height: 0px; border-radius: 50%; touch-action: manipulation"
        @pointerdown.prevent
        @click="(event) => {
          if (event.detail !== 0) {
            // focus text area only if it was clicked
            textarea.focus()
          }
          const [start, end] = getCursor(textarea)

          if (start !== end) {
            text = text.substring(0, start) + text.substring(end)
            setCursor(textarea, start)
          } else if (start > 0) {
            text = text.substring(0, start-1) + text.substring(start)
            setCursor(textarea, start-1)
          }
        }"
      >
        <q-icon name="backspace" size="sm" style="transform: translateX(-1px)" />
        <q-tooltip
          v-if="$q.platform.is.desktop"
          class="text-caption non-selectable"
          anchor="top middle"
          self="bottom middle"
          transition-show="fade"
          transition-hide="fade"
          :delay="500"
        >
          Backspace
        </q-tooltip>
      </q-item>

      <q-item
        role="button"
        clickable
        v-ripple.center
        class="q-pa-none row justify-center items-center"
        style="width: 42px; height: 42px; min-height: 0px; border-radius: 50%; touch-action: manipulation"
        @pointerdown.prevent
        @click="() => {
          if (keyboard) {
            //hide keyboard
            inputmode = 'none'
            keyboard = false
            textarea.blur()
          } else {
            //show keyboard
            inputmode = 'text'
            keyboard = true
            textarea.focus()
          }
        }"
      >
        <q-icon :name="keyboard ? 'keyboard_hide' : 'keyboard'" size="sm" />
        <q-tooltip
          v-if="$q.platform.is.desktop"
          class="text-caption non-selectable"
          anchor="top middle"
          self="bottom middle"
          transition-show="fade"
          transition-hide="fade"
          :delay="500"
        >
          {{ keyboard ? 'Hide Keyboard' : 'Show Keyboard' }}
        </q-tooltip>
      </q-item>

      <q-item
        v-if="editing"
        role="button"
        clickable
        v-ripple.center
        class="q-pa-none row justify-center items-center"
        style="width: 42px; height: 42px; min-height: 0px; border-radius: 50%; touch-action: manipulation"
        @pointerdown.prevent
        @click="() => {
          text = ''
        }"
      >
        <q-icon name="delete" size="sm" />
        <q-tooltip
          v-if="$q.platform.is.desktop"
          class="text-caption non-selectable"
          anchor="top middle"
          self="bottom middle"
          transition-show="fade"
          transition-hide="fade"
          :delay="500"
        >
          Delete Text
        </q-tooltip>
      </q-item>

      <q-item
        v-if="editing"
        role="button"
        clickable
        v-ripple.center
        class="q-pa-none row justify-center items-center"
        style="width: 42px; height: 42px; min-height: 0px; border-radius: 50%; touch-action: manipulation"
        @pointerdown.prevent
      >
        <q-icon name="add_circle" size="sm" />
        <q-tooltip
          v-if="$q.platform.is.desktop"
          class="text-caption non-selectable"
          anchor="top middle"
          self="bottom middle"
          transition-show="fade"
          transition-hide="fade"
          :delay="500"
        >
          Join Selection (U+200B)
        </q-tooltip>
      </q-item>

      <q-item
        v-if="editing"
        role="button"
        clickable
        v-ripple.center
        class="q-pa-none row justify-center items-center"
        style="width: 42px; height: 42px; min-height: 0px; border-radius: 50%; touch-action: manipulation"
        @pointerdown.prevent
      >
        <q-icon name="pending" size="sm" />
        <q-tooltip
          v-if="$q.platform.is.desktop"
          class="text-caption non-selectable"
          anchor="top middle"
          self="bottom middle"
          transition-show="fade"
          transition-hide="fade"
          :delay="500"
        >
          Split Selection (U+200B)
        </q-tooltip>
      </q-item>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

import blocks from 'assets/unicode.json'
import names from 'assets/names.json'

import { dom } from 'quasar'
const { width } = dom


function range(min, max) {
  const array = []
  for (let x = min; x <= max; x++) {
    array.push(x)
  }
  return array
}

function pages(min, max, size) {
  const length = max - min + 1
  return Math.ceil(length / size)
}

function paginate(min, max, size, page) {
  const index = page - 1
  const first = min + size*index
  const last = Math.min(first + size - 1, max)
  return [first, last]
}

function codepoints(string) {
  return [...string]
}

function surrogatePairs(string) {
  return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) ?? []
}

function loneSurrogates(string) {
  return string.match(/([\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF])/g) ?? []
}

function nonSurrogates(string) {
  return string.match(/[^\uD800-\uDBFF\uDC00-\uDFFF]/g) ?? []
}

function plural(string, count) {
  if (count === 1) {
    return `${count} ${string}`
  } else {
    return `${count} ${string}s`
  }
}

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

    const textparent = ref(null)
    const textheight = ref(0)
    const textobserver = new ResizeObserver((entries) => {
      textheight.value = entries[0].contentRect.height
    })

    const innerWidth = ref(0)
    function onResize() {
      innerWidth.value = window.innerWidth

      tooltips.value[tooltip.value]?.updatePosition()
    }
    const vw = computed(() => innerWidth.value/100)

    onMounted(() => {
      window.addEventListener('resize', onResize)
      onResize()
      onFrame()
      splitobserver.observe(splitparent.value)
      textobserver.observe(textparent.value)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      window.cancelAnimationFrame(onFrame)
      splitobserver.unobserve(splitparent.value)
    })

    const cardSize = computed(() => 60 + 2/3*vw.value)
    const cardGutter = computed(() => cardSize.value / 5)

    const typing = ref(false)
    const onTyping = after(typing, 1500)

    function after(model, ms) {
      let timeout = null
      return () => {
        model.value = true
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          model.value = false
        }, ms)
      }
    }


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
      inputmode: ref('none'),
      textheight,
      textparent,
      textarea: ref(null),
      keyboard: ref(null),
      typing,
      onTyping,
      splitheight,
      splitparent,
      toCodepoint(number) {
        return `U+${number.toString(16).toUpperCase().padStart(4, '0')}`
      },
      range,
      page: ref(1),
      pages,
      paginate,
      width,
      getCursor(el) {
        return [el.selectionStart, el.selectionEnd]
      },
      setCursor(el, start, end) {
        nextTick(() => {
          el.setSelectionRange(start, end ?? start)
        })
      },
      codepoints,
      surrogatePairs,
      loneSurrogates,
      nonSurrogates,
      plural
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
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
