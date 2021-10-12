import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';

interface IAvatarProp {
  size?: number;
  icon?: React.ReactNode;
  label?: string;
}

const UserAvatar: React.FC<IAvatarProp> = (props: IAvatarProp) => {
  const { size = 36, icon = <UserOutlined />, label } = props;
  return (
    <div>
      <Avatar size={size} icon={icon} />
      {label && <h3>{label}</h3>}
    </div>
  );
};

export default UserAvatar;
