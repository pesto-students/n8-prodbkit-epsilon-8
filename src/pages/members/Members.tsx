import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Space, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';
import { getUrlById } from 'shared/utils/api';

import { showDrawer } from '../../redux-features/commonDrawer';
import styles from './members.module.scss';
import { updateMemberList } from './redux/members';
import { fetchMemberList, removeMember } from './services/members.service';

const PAGE_TITLE = 'Members';

const Members: React.FC = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const memberAPIResponse = useQuery(`member${id}`, () => fetchMemberList(id));

  const { data } = memberAPIResponse;

  const handleViewMember = (id: string) => {
    dispatch(showDrawer({ key: 'memberForm', id: id }));
  };

  const handleEditMember = (id: string) => {
    dispatch(showDrawer({ key: 'editMember', id: id }));
  };

  const deleteMember = (id: string) => {
    // removeMember(id).then((res: any) => {
    //   if (res.status === 204) {
    //     dispatch(updateMemberList(res.data));
    //     notification.success({
    //       message: 'Member successfully deleted.',
    //     });
    //   } else {
    //     notification.error({
    //       message: "Couldn't delete this member. Please try again.",
    //     });
    //   }
    // });
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
      render: (text: string, record: any) => <span>{record.username || '-'}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size={8}>
          <InfoCircleOutlined onClick={() => handleViewMember(record.id)} />
          {/* <EditOutlined onClick={() => handleEditMember(record.id)} /> */}
          <DeleteOutlined onClick={() => handleDeleteMember(record.id, record.email)} />
        </Space>
      ),
    },
  ];

  const handleAddMember = () => {
    dispatch(showDrawer({ key: 'addMember', urlId: id }));
  };

  return (
    <div className={styles.memberWrapper}>
      <CommonHelmet title={PAGE_TITLE} />
      <Header
        title={PAGE_TITLE}
        buttonText="Add Member"
        buttonCallback={handleAddMember}
        showSearchInput
        buttonIcon={<PlusOutlined />}
      />
      <CommonTable
        columns={columns}
        loading={memberAPIResponse.isLoading}
        dataSource={data?.data}
      />
    </div>
  );
};

export default Members;
