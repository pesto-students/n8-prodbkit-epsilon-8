import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';

import AntDButton from '../button/Button';
import styles from './header.module.scss';

interface IHeader {
  title: string;
  buttonText?: string;
  buttonCallback?: () => void;
  buttonIcon?: React.ReactNode;
  showSearchInput?: boolean;
  onSearchTextChange?: (text: string) => void;
}

const Header: React.FC<IHeader> = ({
  title,
  buttonText,
  buttonCallback,
  buttonIcon,
  showSearchInput = false,
  onSearchTextChange,
}) => {
  return (
    <div className={styles.headerWrapper}>
      <Space size={32}>
        <h2 className={styles.title}>{title}</h2>
        {showSearchInput && onSearchTextChange && (
          <Input
            type="search"
            className={styles.searchInput}
            onChange={(e: any) => {
              onSearchTextChange(e.target.value);
            }}
            placeholder="Search"
            size="middle"
          ></Input>
        )}
      </Space>
      {buttonText && (
        <AntDButton type="primary" text={buttonText} onClick={buttonCallback} icon={buttonIcon} />
      )}
    </div>
  );
};

export default Header;
