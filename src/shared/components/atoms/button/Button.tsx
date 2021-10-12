import { Button } from 'antd';
import React from 'react';

import styles from './button.module.scss';

interface IButton {
  text: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const AntDButton: React.FC<IButton> = ({ text, onClick, icon }) => {
  return (
    <div>
      <Button className={styles.button} type="primary" onClick={onClick} icon={icon}>
        {text}
      </Button>
    </div>
  );
};

export default AntDButton;
