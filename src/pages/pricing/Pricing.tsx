import { CheckCircleTwoTone } from '@ant-design/icons';
import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showDrawer } from 'redux-features/commonDrawer';
import AntDButton from 'shared/components/atoms/button/Button';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';

import { pricingData, pricingDataObject } from './pricing.constants';
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
          <h2 className={styles.introductionTitle}>{pricingDataObject.title}</h2>
          <p className={styles.introductionText}>{pricingDataObject.subtitle}</p>
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
                    {pricingInfo.summary}
                  </span>
                  <div className={styles.pricingFeatures}>
                    <span className={styles.pricingType}>{pricingInfo.listTitle}</span>
                    <ul className={styles.list}>
                      {pricingInfo.features.map((listItem: string, index: number) => (
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
