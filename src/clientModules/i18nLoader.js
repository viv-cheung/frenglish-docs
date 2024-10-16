// src/clientModules/i18nLoader.js
import { useEffect } from 'react'
import { useHistory } from '@docusaurus/router'
import { activateLanguage } from '../../i18n'
import BrowserOnly from '@docusaurus/BrowserOnly'

export default function i18nLoader() {
  const { location } = useHistory()

  return (
    <BrowserOnly>
      {() => {
        useEffect(() => {
          const locale = location.pathname.split('/')[1]
          if (locale) {
            activateLanguage(locale)
          }
        }, [location.pathname])

        return null
      }}
    </BrowserOnly>
  )
}
