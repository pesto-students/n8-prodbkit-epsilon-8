import React from 'react';

import AntDButton from '../button/Button';
import styles from './header.module.scss';

interface IHeader {
  title: string;
  buttonText: string;
  buttonCallback: () => void;
  buttonIcon?: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ title, buttonText, buttonCallback, buttonIcon }) => {
  return (
    <div className={styles.headerWrapper}>
      <h2 className={styles.title}>{title}</h2>
      <AntDButton type="primary" text={buttonText} onClick={buttonCallback} icon={buttonIcon} />
    </div>
  );
};

export default Header;
