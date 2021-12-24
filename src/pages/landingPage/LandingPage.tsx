import { ArrowRightOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import introImage1 from 'assets/block.svg';
import introImage3 from 'assets/connect.svg';
import featureImage from 'assets/sample-feature.jpg';
import introImage2 from 'assets/solution.svg';
import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showDrawer } from 'redux-features/commonDrawer';
import { routes } from 'routes';
import AntDButton from 'shared/components/atoms/button/Button';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';

import { staticDataObject } from './landingPage.constants';
import styles from './landingPage.module.scss';

const PAGE_TITLE = 'Home';
const featureImages = [introImage1, introImage2, introImage3];

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(showDrawer({ key: 'login' }));
  };

  const navigateToPricing = () => {
    history.push(routes.pricing);
  };

  return (
    <>
      <CommonHelmet title={PAGE_TITLE} />
      <section className={styles.introductionWrapper}>
        <h2 className={styles.introductionTitle}>{staticDataObject.title}</h2>
        <p className={styles.introductionText}>{staticDataObject.subtitle}</p>
        <div className={styles.introBtnWrapper}>
          <Space size={8}>
            <AntDButton
              className={cn(styles.designBtn, styles.primaryDesignBtn)}
              type="primary"
              text="Get Started For Free"
              icon={<ArrowRightOutlined />}
              onClick={navigateToPricing}
            />
          </Space>
        </div>
      </section>
      <section className={styles.featureSectionWrapper}>
        {staticDataObject.pageSection.map((sectionItem: any, index: number) => (
          <Space key={index} size={16} className={styles.featuresWrapper}>
            <div className={styles.featureImage}>
              <Image src={featureImages[index]} preview={false} />
            </div>
            <div className={styles.featureTextWrapper}>
              <h3 className={styles.featureTitle}>{sectionItem.heading}</h3>
              <p className={styles.featureText}>{sectionItem.content}</p>
            </div>
          </Space>
        ))}
      </section>
    </>
  );
};

export default LandingPage;
