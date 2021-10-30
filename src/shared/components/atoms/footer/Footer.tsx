import { Space } from 'antd';
import cn from 'classnames';
import React from 'react';

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={cn(styles.footerWrapper, styles.positionBottom)}>
        <Space size={16}>
          <span>Ninja8 project - Pro DB kit</span>
          <span>&copy; Team Epsilon</span>
        </Space>
      </div>
    </footer>
  );
};

export default Footer;
