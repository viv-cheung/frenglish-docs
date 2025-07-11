import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Trans } from '@lingui/macro';

import styles from './index.module.css';

function HomepageHeader() {
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
              styles.customButton,
            )}
            to='/docs/intro'
          >
            <Trans>Frenglish Tutorial - 4min ⏱️</Trans>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} - Automate your translations`}
      description='Description will go into a meta tag in <head />'
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
