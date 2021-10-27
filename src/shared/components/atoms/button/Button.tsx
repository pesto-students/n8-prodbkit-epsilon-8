import { Button, ButtonProps } from 'antd';
import React from 'react';

import styles from './button.module.scss';

interface IButton extends ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const AntDButton: React.FC<IButton> = ({ text, onClick, icon = <></>, ...props }) => {
  return (
    <div>
      <Button
        className={props.type === 'primary' ? styles.buttonPrimary : styles.buttonLink}
        onClick={onClick}
        icon={icon}
        {...props}
      >
        {text}
      </Button>
    </div>
  );
};

export default AntDButton;
