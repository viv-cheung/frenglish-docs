import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React from 'react';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('/assets/lightbulb.svg').default,
    description: (
      <>
        Frenglish was designed to provide multilingual support for all your content automatically utilizing your company's context. Finish your automated language support in minutes.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('/assets/talking.svg').default,
    description: (
      <>
        Frenglish lets you focus on all your other important priorities instead of worrying to keep all your locale files up to date. 
      </>
    ),
  },
  {
    title: 'Integrates directly to your website',
    Svg: require('/assets/laptop.svg').default,
    description: (
      <>
        If your website utilizes i18n, the Frenglish bot will automatically update and generate all locale files from your origin
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
