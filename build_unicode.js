const meta = require('@unicode/unicode-15.1.0')

//https://www.npmjs.com/package/@unicode/unicode-15.1.0#readme
const blocks = meta['Block']

const nameExcludes = new Set([
  '<control>',
  'Hangul Syllable',
  'Non Private Use High Surrogate',
  'Private Use High Surrogate',
  'Low Surrogate',
  'Private Use',
  'Tangut Ideograph',
  'Tangut Ideograph Supplement',
  'CJK Ideograph',
  'CJK Ideograph Extension A',
  'CJK Ideograph Extension B',
  'CJK Ideograph Extension C',
  'CJK Ideograph Extension D',
  'CJK Ideograph Extension E',
  'CJK Ideograph Extension F',
  'CJK Ideograph Extension G',
  'CJK Ideograph Extension H',
  'CJK Ideograph Extension I',
  'Plane 15 Private Use',
  'Plane 16 Private Use'
])

const originals = Object.fromEntries(Array.from(require('@unicode/unicode-15.1.0/Names').entries()).filter(([codepoint, value]) => !nameExcludes.has(value)))
const corrections = require('@unicode/unicode-15.1.0/Names/Correction')
const controls = require('@unicode/unicode-15.1.0/Names/Control')
const abbreviations = require('@unicode/unicode-15.1.0/Names/Abbreviation')
const alternates = require('@unicode/unicode-15.1.0/Names/Alternate')
const figments = require('@unicode/unicode-15.1.0/Names/Figment')

const names = {}
for (const data of [corrections, originals, controls, abbreviations, alternates, figments]) {
  for (const [codepoint, nameData] of Object.entries(data)) {
    if(!names[codepoint]) {
      names[codepoint] = []
    }
    names[codepoint] = names[codepoint].concat(nameData)
  }
}

const ranges = {}
for (const block of blocks) {
  const codepoints = require(`@unicode/unicode-15.1.0/Block/${block}/code-points.js`)
  const first = codepoints[0]
  const last = codepoints[codepoints.length - 1]

  const length = last - first + 1
  if (length !== codepoints.length) {
    throw new Error(`Could not convert codepoints in block ${block} into a range`)
  }

  const lookup = new Set(codepoints)
  for (let codepoint = first; codepoint <= last; codepoint++) {
    if (!lookup.has(codepoint)) {
      throw new Error(`Missing codepoint ${codepoint}; range is not contiguous from ${first} to ${last} in block ${block}`)
    }
  }

  const name = block.replaceAll('_', ' ')
  ranges[name] = [first, last]
}

const data = Object.fromEntries(
  Object.entries(ranges).sort(([blockA, rangeA], [blockB, rangeB]) => rangeA[0] - rangeB[0])
)

const fs = require('fs')

fs.writeFileSync('./src/assets/unicode.json', JSON.stringify(data, null, 2))
fs.writeFileSync('./src/assets/names.json', JSON.stringify(names, null, 2))
