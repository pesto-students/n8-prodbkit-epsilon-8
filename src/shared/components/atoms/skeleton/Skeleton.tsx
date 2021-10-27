import { Skeleton, Space } from 'antd';
import React from 'react';

import styles from './skeleton.module.scss';

const AntDSkeleton: React.FC = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <Space direction="horizontal" size={16}>
          <Skeleton.Avatar active={true} size={'large'} shape={'circle'} />
          <Skeleton.Input className={styles.headerTitle} active={true} size={'large'} />
        </Space>
        <div>
          <Skeleton.Input className={styles.headerButton} active={true} size={'default'} />
        </div>
      </div>
      <div>
        <Skeleton className={styles.body} paragraph={{ rows: 15 }} active={true} />
      </div>
    </React.Fragment>
  );
};

export default AntDSkeleton;
