/* eslint no-new: 0 */
require('babel-polyfill')

const ClippedList = require('../controls/clipped-list')

new ClippedList(document.getElementById('interactions-list'), 'See all new interactions', 'See less interactions')
new ClippedList(document.getElementById('contacts-list'), 'See all new contacts', 'See less contacts')
