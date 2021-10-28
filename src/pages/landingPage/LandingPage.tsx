import { ArrowRightOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import featureImage from 'assets/sample-feature.jpg';
import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showDrawer } from 'redux-features/commonDrawer';
import { routes } from 'routes';
import AntDButton from 'shared/components/atoms/button/Button';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';

import styles from './landingPage.module.scss';

const PAGE_TITLE = 'Home';

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
        <h2 className={styles.introductionTitle}>Build internal tools, remarkably fast</h2>
        <p className={styles.introductionText}>
          Stop wrestling with UI libraries, hacking together data sources, and figuring out access
          controls. Start shipping apps that move your business forward.
        </p>
        <div className={styles.introBtnWrapper}>
          <Space size={8}>
            <AntDButton
              className={cn(styles.designBtn, styles.primaryDesignBtn)}
              type="primary"
              text="Check Pricing"
              icon={<ArrowRightOutlined />}
              onClick={navigateToPricing}
            />
            <AntDButton
              className={cn(styles.designBtn, styles.secondaryDesignBtn)}
              type="link"
              text="Login"
              onClick={handleLogin}
            />
          </Space>
        </div>
      </section>
      <section className={styles.featuresWrapper}>
        <Image className={styles.featureImage} src={featureImage} preview={false} />
        <div className={styles.featureTextWrapper}>
          <h3 className={styles.featureTitle}>A complete set of powerful building blocks</h3>
          <p className={styles.featureText}>
            All internal tools are made up of the building blocks: Tables, Lists, Charts, Forms,
            Wizards, Maps and so on. Retool provides a complete set of powerful building blocks out
            of the box. Spend your time getting UI in front of stakeholders, not hunting down the
            best React table library. Assemble your app in 30 seconds by dragging and dropping from
            our pre-built components.
          </p>
        </div>
      </section>
      <section className={styles.featuresWrapper}>
        <div className={styles.featureTextWrapper}>
          <h3 className={styles.featureTitle}>A complete set of powerful building blocks</h3>
          <p className={styles.featureText}>
            All internal tools are made up of the building blocks: Tables, Lists, Charts, Forms,
            Wizards, Maps and so on. Retool provides a complete set of powerful building blocks out
            of the box. Spend your time getting UI in front of stakeholders, not hunting down the
            best React table library. Assemble your app in 30 seconds by dragging and dropping from
            our pre-built components.
          </p>
        </div>
        <Image className={styles.featureImage} src={featureImage} preview={false} />
      </section>
      <section className={styles.featuresWrapper}>
        <div className={styles.featureTextWrapper}>
          <h3 className={styles.featureTitle}>A complete set of powerful building blocks</h3>
          <p className={styles.featureText}>
            All internal tools are made up of the building blocks: Tables, Lists, Charts, Forms,
            Wizards, Maps and so on. Retool provides a complete set of powerful building blocks out
            of the box. Spend your time getting UI in front of stakeholders, not hunting down the
            best React table library. Assemble your app in 30 seconds by dragging and dropping from
            our pre-built components.
          </p>
        </div>
        <Image className={styles.featureImage} src={featureImage} preview={false} />
      </section>
    </>
  );
};

export default LandingPage;
