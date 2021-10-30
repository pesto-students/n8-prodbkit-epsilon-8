import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Space, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';
import { handleTableData } from 'shared/utils/table';

import { showDrawer } from '../../redux-features/commonDrawer';
import {
  fetchUserCredentialsList,
  handleUserCredentialsDelete,
} from './services/userCredentials.service';
import styles from './userCredentials.module.scss';

const PAGE_TITLE = 'User Credentials';

const UserCredentials: React.FC = () => {
  const dispatch = useDispatch();
  const [searchInputText, setSearchInputText] = useState<string>('');
  const userCredentialsAPIResponse = useQuery('user-credentials', fetchUserCredentialsList, {
    retry: false,
  });
  const userCredentialsDelete = useMutation((id: string) => handleUserCredentialsDelete(id), {
    retry: false,
  });
  const { data } = userCredentialsAPIResponse;

  const handleViewUserCredentials = (id: string) => {
    dispatch(showDrawer({ key: 'viewDatabase', id: id, isReadOnly: true }));
  };

  const handleEditUserCredentials = (id: string) => {
    dispatch(showDrawer({ key: 'editDatabase', id: id }));
  };

  const deleteUserCredentials = (id: string, name: string) => {
    userCredentialsDelete.mutate(id, {
      onSuccess: () => {
        notification.success({ message: `user credentials for ${name} deleted successfully` });
      },
      onError: () => {
        notification.error({
          message: `Couldn't delete this user credentials. Please try again.`,
        });
      },
    });
  };

  const handleDeleteUserCredentials = (id: string, name: string) => {
    confirm({
      title: `Are you sure delete this database: ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteUserCredentials(id, name);
      },
    });
  };

  const handleSearchText = (searchText: string) => {
    setSearchInputText(searchText);
  };

  const columns = [
    {
      title: 'Database name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: any) => record.description || '-',
    },
    {
      title: 'Connection string',
      dataIndex: 'connection_string',
      key: 'connection_string',
    },
    {
      title: 'Environment',
      dataIndex: 'environment',
      key: 'environment',
    },
    {
      title: 'Actions',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size={8}>
          <InfoCircleOutlined onClick={() => handleViewUserCredentials(record.id)} />
          <EditOutlined onClick={() => handleEditUserCredentials(record.id)} />
          <DeleteOutlined onClick={() => handleDeleteUserCredentials(record.id, record.name)} />
        </Space>
      ),
    },
  ];

  const handleAddUserCredentials = () => {
    dispatch(showDrawer({ key: 'addDatabase' }));
  };

  return (
    <div className={styles.userCredentialsWrapper}>
      <CommonHelmet title={PAGE_TITLE} />
      <Header
        title={PAGE_TITLE}
        buttonText="Add user credentials"
        buttonCallback={handleAddUserCredentials}
        showSearchInput
        onSearchTextChange={handleSearchText}
        buttonIcon={<PlusOutlined />}
      />
      <CommonTable
        columns={columns}
        loading={userCredentialsAPIResponse.isLoading}
        rowKey={'id'}
        dataSource={
          userCredentialsAPIResponse === undefined ? [] : handleTableData(data, searchInputText)
        }
      />
    </div>
  );
};

export default UserCredentials;
