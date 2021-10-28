import { CheckCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showDrawer } from 'redux-features/commonDrawer';
import AntDButton from 'shared/components/atoms/button/Button';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';

import { pricingData } from './pricing.constants';
import styles from './pricing.module.scss';

const PAGE_TITLE = 'Pricing';

const Pricing: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(showDrawer({ key: 'login' }));
  };

  return (
    <>
      <CommonHelmet title={PAGE_TITLE} />
      <div className={styles.pricingMain}>
        <section className={styles.pricingWrapper}>
          <h2 className={styles.introductionTitle}>Deliver the apps your team needs now</h2>
          <p className={styles.introductionText}>
            Pro DB kit scales for any organization — from startups to Fortune 500s.
          </p>
        </section>
        <section className={styles.pricaTableWrapper}>
          {pricingData.map((pricingInfo: any, index: number) => {
            return (
              <>
                <div key={index} className={styles.tableColumn}>
                  <span className={styles.pricingType}>{pricingInfo.type}</span>
                  <div className={styles.amountWrapper}>
                    <span className={styles.currency}>INR</span>
                    <span className={styles.amount}>{pricingInfo.pricePerMonth}</span>
                  </div>
                  <AntDButton
                    className={cn(styles.pricingTextBtn, styles.marginTop8)}
                    type="primary"
                    text={pricingInfo.buttonText}
                    onClick={handleLogin}
                  />
                  <span className={cn(styles.currency, styles.marginTop8)}>
                    {pricingInfo.btnSubtitle}
                  </span>
                  <div className={styles.pricingFeatures}>
                    <span className={styles.pricingType}>{pricingInfo.listTitle}</span>
                    <ul className={styles.list}>
                      {pricingInfo.featureItems.map((listItem: string, index: number) => (
                        <li key={index}>
                          <CheckCircleTwoTone />
                          <span className={styles.listItemText}>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Pricing;
