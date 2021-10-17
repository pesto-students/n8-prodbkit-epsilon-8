import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Skeleton, Space, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { IGlobalState } from 'shared/interfaces/globalState';

import { showDrawer, showModal } from '../../redux-features/common';
import Header from '../../shared/components/atoms/header/Header';
import AntDSkeleton from '../../shared/components/atoms/skeleton/Skeleton';
import { modalTitleMap } from '../../shared/constants';
import { IMemberData } from './member.interface';
import styles from './members.module.scss';
import { updateMemberList } from './redux/members';
import { getAllMembers, removeMember } from './services/members.service';

const PAGE_TITLE = 'Members';

const Members: React.FC = () => {
  const dispatch = useDispatch();
  const globalStoreData = useSelector((state: IGlobalState) => state.member);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<IMemberData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllMembers().then((res: any) => {
      setMemberList(res.data);
      setIsLoading(false);
    });
  }, [globalStoreData.memberList]);

  const handleViewMember = (id: string) => {
    dispatch(showDrawer({ key: 'viewMember', id: id }));
  };

  const handleEditMember = (id: string) => {
    dispatch(showDrawer({ key: 'editMember', id: id }));
  };

  const deleteMember = (id: string) => {
    removeMember(id).then((res: any) => {
      if (res.status === 204) {
        dispatch(updateMemberList(res.data));
        notification.success({
          message: 'Member successfully deleted.',
        });
      } else {
        notification.error({
          message: "Couldn't delete this member. Please try again.",
        });
      }
    });
  };

  const handleDeleteMember = (id: string, email: string) => {
    confirm({
      title: `Are you sure delete this member: ${email}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteMember(id);
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Actions',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size={8}>
          <InfoCircleOutlined onClick={() => handleViewMember(record.id)} />
          <EditOutlined onClick={() => handleEditMember(record.id)} />
          <DeleteOutlined onClick={() => handleDeleteMember(record.id, record.email)} />
        </Space>
      ),
    },
  ];

  const handleAddMember = () => {
    dispatch(showDrawer({ key: 'addMember' }));
  };

  return (
    <div className={styles.memberWrapper}>
      <Helmet>
        <meta name="Pro-DB Kit" content="Ninja 8 demo app" charSet="utf-8" />
        <title>{PAGE_TITLE}</title>
      </Helmet>
      {isLoading ? (
        <AntDSkeleton />
      ) : (
        <>
          <Header
            title={PAGE_TITLE}
            buttonText="Add Member"
            buttonCallback={handleAddMember}
            buttonIcon={<PlusOutlined />}
          />
          <Table columns={columns} dataSource={memberList} />
        </>
      )}
    </div>
  );
};

export default Members;
