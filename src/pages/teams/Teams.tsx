import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Space, Table, Tag } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Header from 'shared/components/atoms/header/Header';
import { getURL } from 'shared/utils/api';

import { showDrawer } from '../../redux-features/common';
import { updateTeamList } from './redux/teams';
import { removeTeam } from './services/teams.service';
import styles from './teams.module.scss';

const PAGE_TITLE = 'Teams';

const fetchTeamsList = () => {
  return axios.get(getURL('/team'), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

const Teams: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const teamsAPIResponse = useQuery('teams', fetchTeamsList);
  const { data } = teamsAPIResponse;

  const handleViewTeam = (id: string) => {
    dispatch(showDrawer({ key: 'viewMember', id: id }));
  };

  const handleEditTeam = (id: string) => {
    dispatch(showDrawer({ key: 'editMember', id: id }));
  };

  const deleteTeam = (id: string) => {
    removeTeam(id).then((res: any) => {
      if (res.status === 204) {
        dispatch(updateTeamList(res.data));
        notification.success({
          message: 'Team successfully deleted.',
        });
      } else {
        notification.error({
          message: "Couldn't delete this team. Please try again.",
        });
      }
    });
  };

  const handleDeleteTeam = (id: string, email: string) => {
    confirm({
      title: `Are you sure delete this team: ${email}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteTeam(id);
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
        <Tag onClick={() => handleTeamClick(record.team_id)} color="#108ee9">
          {record.name}
        </Tag>
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
          <InfoCircleOutlined onClick={() => handleViewTeam(record.id)} />
          <EditOutlined onClick={() => handleEditTeam(record.id)} />
          <DeleteOutlined onClick={() => handleDeleteTeam(record.id, record.email)} />
        </Space>
      ),
    },
  ];

  const handleAddTeam = () => {
    dispatch(showDrawer({ key: 'addMember' }));
  };

  return (
    <div className={styles.teamWrapper}>
      <Helmet>
        <meta name="Pro-DB Kit" content="Ninja 8 demo app" charSet="utf-8" />
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <Header
        title={PAGE_TITLE}
        buttonText="Add Team"
        buttonCallback={handleAddTeam}
        buttonIcon={<PlusOutlined />}
      />
      <Table
        columns={columns}
        loading={teamsAPIResponse.isLoading}
        rowKey={'team_id'}
        dataSource={teamsAPIResponse === undefined ? [] : (data?.data as any)}
      />
    </div>
  );
};

export default Teams;
