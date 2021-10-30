import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Space, Table, Tag } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';
import { handleTableData } from 'shared/utils/table';

import { showDrawer } from '../../redux-features/commonDrawer';
import { fetchTeamsList, handleTeamDelete } from './services/teams.service';
import styles from './teams.module.scss';

const PAGE_TITLE = 'Teams';

const Teams: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const teamsAPIResponse = useQuery('teams', fetchTeamsList, {
    retry: false,
  });
  const teamDelete = useMutation((id: string) => handleTeamDelete(id), { retry: false });
  const { data, refetch } = teamsAPIResponse;
  const [searchInputText, setSearchInputText] = useState<string>('');

  const handleViewTeam = (id: string) => {
    dispatch(showDrawer({ key: 'viewTeam', id: id, isReadOnly: true }));
  };

  const handleEditTeam = (id: string) => {
    dispatch(showDrawer({ key: 'editTeam', id: id }));
  };

  const deleteTeam = (id: string, email: string) => {
    teamDelete.mutate(id, {
      onSuccess: () => {
        notification.success({ message: `Team ${email} deleted successfully` });
        refetch();
      },
      onError: () => {
        notification.error({
          message: `Couldn't delete this Team. Please try again.`,
        });
      },
    });
  };

  const handleDeleteTeam = (id: string, name: string) => {
    confirm({
      title: `Are you sure you want to delete this team: ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteTeam(id, name);
      },
    });
  };

  const handleTeamClick = (teamId: string) => {
    history.push(`/members/${teamId}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <span onClick={() => handleTeamClick(record.team_id)} className={styles.teamName}>
          {record.name}
        </span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tech Lead',
      dataIndex: 'tech_lead',
      key: 'tech_lead',
    },
    {
      title: 'Actions',
      key: 'team_id',
      render: (text: string, record: any) => (
        <Space size={8}>
          <InfoCircleOutlined onClick={() => handleViewTeam(record.team_id)} />
          <EditOutlined onClick={() => handleEditTeam(record.team_id)} />
          <DeleteOutlined onClick={() => handleDeleteTeam(record.team_id, record.name)} />
        </Space>
      ),
    },
  ];

  const handleAddTeam = () => {
    dispatch(showDrawer({ key: 'addTeam' }));
  };

  const handleTeamSearch = (searchtext: string) => {
    setSearchInputText(searchtext);
  };

  return (
    <>
      <CommonHelmet title={PAGE_TITLE} />
      <div className={styles.teamWrapper}>
        <Header
          title={PAGE_TITLE}
          buttonText="Add Team"
          buttonCallback={handleAddTeam}
          showSearchInput
          onSearchTextChange={handleTeamSearch}
          buttonIcon={<PlusOutlined />}
        />
        <CommonTable
          columns={columns}
          loading={teamsAPIResponse.isLoading}
          rowKey={'team_id'}
          dataSource={teamsAPIResponse === undefined ? [] : handleTableData(data, searchInputText)}
        />
      </div>
    </>
  );
};

export default Teams;
