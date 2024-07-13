import { i18n } from '@lingui/core'
import { messages as enMessages } from './locales/en/messages'
import { messages as frMessages } from './locales/fr/messages'

i18n.load({
  en: enMessages,
  fr: frMessages,
})

const activateLanguage = (locale) => {
  console.log('Activating language:', locale);
  i18n.activate(locale);
}
export { i18n, activateLanguage }
