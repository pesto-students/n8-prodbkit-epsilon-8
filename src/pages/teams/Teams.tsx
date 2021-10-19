import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { notification, Space, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'shared/components/atoms/header/Header';
import AntDSkeleton from 'shared/components/atoms/skeleton/Skeleton';
import { IGlobalState } from 'shared/interfaces/globalState';

import { showDrawer } from '../../redux-features/common';
import { updateTeamList } from './redux/teams';
import { getAllTeams, removeTeam } from './services/teams.service';
import { ITeamsData } from './teams.interface';
import styles from './teams.module.scss';

const PAGE_TITLE = 'Teams';

const Teams: React.FC = () => {
  const dispatch = useDispatch();
  const globalStoreData = useSelector((state: IGlobalState) => state.member);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<ITeamsData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllTeams().then((res: any) => {
      setTeamList(res.data);
      setIsLoading(false);
    });
  }, [globalStoreData.memberList]);

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Databases',
      dataIndex: 'databases',
      key: 'databases',
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
    },
    // {
    //   title: 'Actions',
    //   key: 'id',
    //   render: (text: string, record: any) => (
    //     <Space size={8}>
    //       <InfoCircleOutlined onClick={() => handleViewTeam(record.id)} />
    //       <EditOutlined onClick={() => handleEditTeam(record.id)} />
    //       <DeleteOutlined onClick={() => handleDeleteTeam(record.id, record.email)} />
    //     </Space>
    //   ),
    // },
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
      {isLoading ? (
        <AntDSkeleton />
      ) : (
        <>
          {/* <Header
            title={PAGE_TITLE}
            buttonText="Add Team"
            buttonCallback={handleAddTeam}
            buttonIcon={<PlusOutlined />}
          /> */}
          <Table columns={columns} dataSource={teamList} />
        </>
      )}
    </div>
  );
};

export default Teams;
