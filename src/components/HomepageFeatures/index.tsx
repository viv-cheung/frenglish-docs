import React, { useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'
import { motion } from 'framer-motion'

const getFeatures = () => [
  {
    title: t`Easy to Use`,
    Svg: require('/assets/lightbulb.svg').default,
    description: (
      <Trans>
        Frenglish was designed to provide multilingual support for all your
        content automatically utilizing your company's context. Finish your
        automated language support in minutes.
      </Trans>
    ),
  },
  {
    title: t`Focus on What Matters`,
    Svg: require('/assets/talking.svg').default,
    description: (
      <Trans>
        Frenglish lets you focus on all your other important priorities instead
        of worrying to keep all your locale files up to date.
      </Trans>
    ),
  },
  {
    title: t`Integrates directly to your website`,
    Svg: require('/assets/laptop.svg').default,
    description: (
      <Trans>
        If your website utilizes i18n, the Frenglish bot will automatically
        update and generate all locale files from your origin.
      </Trans>
    ),
  },
]

const HomepageFeatures = () => {
  const [features, setFeatures] = useState(getFeatures())

  useEffect(() => {
    setFeatures(getFeatures())
  }, [])

  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className={clsx('col col--4', styles.feature)}
            >
              <div className='text--center'>
                <feature.Svg className={styles.featureSvg} role='img' />
              </div>
              <div className='text--center padding-horiz--md'>
                <Heading as='h3'>{feature.title}</Heading>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomepageFeatures
