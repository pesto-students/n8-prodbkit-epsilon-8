import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Space } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { routes } from 'routes';
import ErrorUI from 'shared/components/atoms/errorUI/ErrorUI';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';

import { showDrawer } from '../../redux-features/commonDrawer';
import styles from './members.module.scss';
import { fetchMemberList, handleMemberDelete } from './services/members.service';

const PAGE_TITLE = 'Members';

const Members: React.FC = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const memberAPIResponse = useQuery(`member${id}`, () => fetchMemberList(id));
  const memberDelete = useMutation((id: string) => handleMemberDelete(id), {
    retry: false,
  });
  const history = useHistory();

  const { data, refetch } = memberAPIResponse;

  const handleViewMember = (memberId: string) => {
    dispatch(showDrawer({ key: 'viewMember', urlId: id, id: memberId, isReadOnly: true }));
  };

  const successCallback = () => {
    notification.success({
      message: `Member deleted successfully`,
    });
    refetch();
  };

  const handleFailedToDelete = () => {
    notification.error({
      message: 'Something went wrong. Please try again',
    });
  };

  const deleteMember = (id: string) => {
    memberDelete.mutate(id, {
      onSuccess: successCallback,
      onError: handleFailedToDelete,
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
      <ErrorBoundary
        FallbackComponent={ErrorUI}
        onReset={() => {
          history.push(routes.dashboard);
        }}
      >
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
      </ErrorBoundary>
    </div>
  );
};

export default Members;
