// src/pages/index.tsx
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import { I18nProvider } from '@lingui/react'
import { i18n, activateLanguage } from '../../i18n' // Ensure correct path to i18n file
import { Trans } from '@lingui/macro'
import { useHistory } from '@docusaurus/router'
import BrowserOnly from '@docusaurus/BrowserOnly'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  console.log('Rendering HomepageHeader') // Debugging log
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <img
          src='/assets/MainLogo.svg'
          alt='Main Logo'
          className={clsx(styles.mainLogo, 'no-border')}
        />
        <p className={clsx('hero__subtitle', styles.hero__subtitle)}>
          <Trans>Set Up Once, Up to Date Translations Forever</Trans>
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              'button button--secondary button--lg',
              styles.customButton
            )}
            to='/docs/intro'>
            <Trans>Frenglish Tutorial - 4min ⏱️</Trans>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const { location } = useHistory()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const locale = location.pathname.split('/')[1] || 'en'
    activateLanguage(locale)
    setLoading(false)
  }, [location.pathname])

  console.log('Rendering Home') // Debugging log
  if (loading) {
    return <div>Loading translations...</div>
  }

  return (
    <BrowserOnly>
      {() => (
        <I18nProvider i18n={i18n}>
          <Layout
            title={`${siteConfig.title} - Automate your translations`}
            description='Description will go into a meta tag in <head />'>
            <HomepageHeader />
            <main>
              <HomepageFeatures />
            </main>
          </Layout>
        </I18nProvider>
      )}
    </BrowserOnly>
  )
}
