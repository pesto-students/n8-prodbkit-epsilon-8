import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import cn from 'classnames';
import React from 'react';

import styles from './avatar.module.scss';

interface IAvatarProp {
  size?: number;
  icon?: React.ReactNode;
  label?: string;
  labelColor?: 'dark' | 'light';
}

const UserAvatar: React.FC<IAvatarProp> = (props: IAvatarProp) => {
  const { size = 36, icon = <UserOutlined />, label, labelColor = 'light' } = props;
  return (
    <Space direction="horizontal" size={8}>
      <Avatar size={size} icon={icon} />
      {label && (
        <span
          className={cn(styles.label, labelColor === 'dark' ? styles.colordark : styles.colorLight)}
        >
          {label}
        </span>
      )}
    </Space>
  );
};

export default UserAvatar;
