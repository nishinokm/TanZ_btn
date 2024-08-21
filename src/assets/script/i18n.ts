import Setting from '@/../setting/setting.json'
import { i18n } from '@/store/setting'
import { createI18n } from 'vue-i18n'
import { getCategory } from './utils'
import { CategoryList, Locales, VoicesList } from './voices'

const TW: any = { ...Locales['zh-TW'], voice: {}, voicecategory: {} }
const EN: any = { ...Locales['en-US'], voice: {}, voicecategory: {} }
const JP: any = { ...Locales['ja-JP'], voice: {}, voicecategory: {} }

const NAME = Setting['name'] || {}

TW.info = {
  ...TW.info,
  ...NAME['TW'] || {
    title: '語音按鈕',
    fullName: ''
  }
}

EN.info = {
  ...EN.info,
  ...NAME['EN'] || {
    title: 'Voices Button',
    fullName: ''
  }
}

JP.info = {
  ...JP.info,
  ...NAME['JP'] || {
    title: 'ボイスボタン',
    fullName: ''
  }
}

for (const category of CategoryList) {
  if (category.translate) {
    if (category.translate['zh-TW']) {
      TW.voicecategory[category.name] = category.translate['zh-TW']
    }
    if (category.translate['en-US']) {
      EN.voicecategory[category.name] = category.translate['en-US']
    }
    if (category.translate['ja-JP']) {
      JP.voicecategory[category.name] = category.translate['ja-JP']
    }
  }
}

/**
 * 获取音频对应语言的数量
 */
let TWNum = 0
let ENNum = 0
let JPNum = 0
let HideTWNum = 0
let HideENNum = 0
let HideJPNum = 0
for (const voice of VoicesList) {
  if (voice.translate) {
    const category = getCategory(voice.category)!
    if (voice.translate['zh-TW'] && category.translate['zh-TW']) {
      TW.voice[voice.name] = voice.translate['zh-TW']
      if (voice.hide || category.hide) {
        HideTWNum++
      } else {
        TWNum++
      }
    }
    if (voice.translate['en-US'] && category.translate['en-US']) {
      EN.voice[voice.name] = voice.translate['en-US']
      if (voice.hide || category.hide) {
        HideENNum++
      } else {
        ENNum++
      }
    }
    if (voice.translate['ja-JP'] && category.translate['ja-JP']) {
      JP.voice[voice.name] = voice.translate['ja-JP']
      if (voice.hide || category.hide) {
        HideJPNum++
      } else {
        JPNum++
      }
    }
  }
}

TW.voiceTotal = TWNum.toString()
EN.voiceTotal = ENNum.toString()
JP.voiceTotal = JPNum.toString()
TW.hideVoiceTotal = (TWNum + HideTWNum).toString()
EN.hideVoiceTotal = (ENNum + HideENNum).toString()
JP.hideVoiceTotal = (JPNum + HideJPNum).toString()

/**
 * 获取音频对应语言的更新日期和更新数量
 */
let TWLastDate = ''
let ENLastDate = ''
let JPLastDate = ''
let TWTemp: null | Date = null
let ENTemp: null | Date = null
let JPTemp: null | Date = null
let hideTWLastDate = ''
let hideENLastDate = ''
let hideJPLastDate = ''
let hideTWTemp: null | Date = null
let hideENTemp: null | Date = null
let hideJPTemp: null | Date = null
for (const voice of VoicesList) {
  if (voice.date) {
    const voiceDate = new Date(voice.date!)
    const category = getCategory(voice.category)!
    if (voice.translate['zh-TW'] && category.translate['zh-TW']) {
      if (!(voice.hide || category.hide)) {
        if (!TWTemp) {
          TWTemp = voiceDate
          TWLastDate = voice.date!
        }
        if (voiceDate > TWTemp) {
          TWTemp = voiceDate
          TWLastDate = voice.date!
        }
      }
      if (!hideTWTemp) {
        hideTWTemp = voiceDate
        hideTWLastDate = voice.date!
      }
      if (voiceDate > hideTWTemp) {
        hideTWTemp = voiceDate
        hideTWLastDate = voice.date!
      }
    }
    if (voice.translate['en-US'] && category.translate['en-US']) {
      if (!(voice.hide || category.hide)) {
        if (!ENTemp) {
          ENTemp = voiceDate
          ENLastDate = voice.date!
        }
        if (voiceDate > ENTemp) {
          ENTemp = voiceDate
          ENLastDate = voice.date!
        }
      }
      if (!hideENTemp) {
        hideENTemp = voiceDate
        hideENLastDate = voice.date!
      }
      if (voiceDate > hideENTemp) {
        hideENTemp = voiceDate
        hideENLastDate = voice.date!
      }
    }
    if (voice.translate['ja-JP'] && category.translate['ja-JP']) {
      if (!(voice.hide || category.hide)) {
        if (!JPTemp) {
          JPTemp = voiceDate
          JPLastDate = voice.date!
        }
        if (voiceDate > JPTemp) {
          JPTemp = voiceDate
          JPLastDate = voice.date!
        }
      }
      if (!hideJPTemp) {
        hideJPTemp = voiceDate
        hideJPLastDate = voice.date!
      }
      if (voiceDate > hideJPTemp) {
        hideJPTemp = voiceDate
        hideJPLastDate = voice.date!
      }
    }
  }
}

TW.lastDate = TWLastDate || ''
EN.lastDate = ENLastDate || ''
JP.lastDate = JPLastDate || ''
TW.hideLastDate = hideTWLastDate || ''
EN.hideLastDate = hideENLastDate || ''
JP.hideLastDate = hideJPLastDate || ''

TW.newVoice = VoicesList.filter((item) => item.date && item.date === TWLastDate && item.translate['zh-TW'] && CategoryList.find(category => category.name === item.category)!.translate['zh-TW']).length.toString() || ''
EN.newVoice = VoicesList.filter((item) => item.date && item.date === ENLastDate && item.translate['en-US'] && CategoryList.find(category => category.name === item.category)!.translate['en-US']).length.toString() || ''
EN.newVoice = VoicesList.filter((item) => item.date && item.date === JPLastDate && item.translate['ja-JP'] && CategoryList.find(category => category.name === item.category)!.translate['ja-JP']).length.toString() || ''

TW.hideNewVoice = VoicesList.filter((item) => item.date && item.date === hideTWLastDate && item.translate['zh-TW'] && CategoryList.find(category => category.name === item.category)!.translate['zh-TW']).length.toString() || ''
EN.hideNewVoice = VoicesList.filter((item) => item.date && item.date === hideENLastDate && item.translate['en-US'] && CategoryList.find(category => category.name === item.category)!.translate['en-US']).length.toString() || ''
EN.hideNewVoice = VoicesList.filter((item) => item.date && item.date === hideJPLastDate && item.translate['ja-JP'] && CategoryList.find(category => category.name === item.category)!.translate['ja-JP']).length.toString() || ''

const I18N = createI18n({
  locale: (/en/i.test(navigator.language) && i18n.value) ? 'en-US' : (/jp/i.test(navigator.language) && i18n.value) ? 'ja-JP' : 'zh-TW',
  messages: {
    'zh-TW': TW,
    'en-US': EN,
    'ja-JP': JP
  }
})

export default I18N
