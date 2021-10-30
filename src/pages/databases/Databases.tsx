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
import { ErrorBoundary } from 'react-error-boundary';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { routes } from 'routes';
import ErrorUI from 'shared/components/atoms/errorUI/ErrorUI';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';
import { handleTableData } from 'shared/utils/table';

import { showDrawer } from '../../redux-features/commonDrawer';
import styles from './databases.module.scss';
import { fetchDatabaseList, handleDatabaseDelete } from './services/databases.service';

const PAGE_TITLE = 'Databases';

const Databases: React.FC = () => {
  const dispatch = useDispatch();
  const [searchInputText, setSearchInputText] = useState<string>('');
  const databaseAPIResponse = useQuery('databases', fetchDatabaseList, { retry: false });
  const databaseDelete = useMutation((id: string) => handleDatabaseDelete(id), { retry: false });
  const { data, refetch } = databaseAPIResponse;

  const history = useHistory();
  const handleViewDatabase = (id: string) => {
    dispatch(showDrawer({ key: 'viewDatabase', id: id, isReadOnly: true }));
  };

  const handleEditDatabase = (id: string) => {
    dispatch(showDrawer({ key: 'editDatabase', id: id }));
  };

  const deleteDatabase = (id: string, name: string) => {
    databaseDelete.mutate(id, {
      onSuccess: () => {
        notification.success({ message: `Database ${name} deleted successfully` });
        refetch();
      },
      onError: () => {
        notification.error({
          message: `Couldn't delete this database. Please try again.`,
        });
      },
    });
  };

  const handleDeleteDatabase = (id: string, name: string) => {
    confirm({
      title: `Are you sure delete this database: ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteDatabase(id, name);
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
          <InfoCircleOutlined onClick={() => handleViewDatabase(record.id)} />
          <EditOutlined onClick={() => handleEditDatabase(record.id)} />
          <DeleteOutlined onClick={() => handleDeleteDatabase(record.id, record.name)} />
        </Space>
      ),
    },
  ];

  const handleAddDatabase = () => {
    dispatch(showDrawer({ key: 'addDatabase' }));
  };

  return (
    <div className={styles.databasesWrapper}>
      <CommonHelmet title={PAGE_TITLE} />
      <ErrorBoundary
        FallbackComponent={ErrorUI}
        onReset={() => {
          history.push(routes.dashboard);
        }}
      >
        <Header
          title={PAGE_TITLE}
          buttonText="Add Database"
          buttonCallback={handleAddDatabase}
          showSearchInput
          onSearchTextChange={handleSearchText}
          buttonIcon={<PlusOutlined />}
        />
        <CommonTable
          columns={columns}
          loading={databaseAPIResponse.isLoading}
          rowKey={'id'}
          dataSource={
            databaseAPIResponse === undefined ? [] : handleTableData(data, searchInputText)
          }
        />
      </ErrorBoundary>
    </div>
  );
};

export default Databases;
