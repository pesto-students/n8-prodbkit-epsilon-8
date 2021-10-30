import { Card, Col, Row } from 'antd';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import { getURL } from 'shared/utils/api';
import { VictoryBar, VictoryChart, VictoryLine, VictoryPolarAxis, VictoryTheme } from 'victory';

import {
  IDashboardStatsDatabaseData,
  IDashboardStatsOnboardedTeamData,
  IDashboardStatsTeamData,
} from './dashboard.interface';
import styles from './dashboard.module.scss';

const PAGE_TITLE = 'Dashboard';

const fetchDashboardStats = () => {
  return axios.get(getURL('/auth/dashboard-stats'), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

const Teams: React.FC = () => {
  const dashboardStatsAPIResponse = useQuery('dashboard-stats', fetchDashboardStats);
  const { data } = dashboardStatsAPIResponse;

  function transformDataForBarChart(teamStats: IDashboardStatsTeamData[] = []) {
    return teamStats.map(
      ({ name, members }: IDashboardStatsTeamData): { team: string; members: number } => ({
        team: name,
        members,
      }),
    );
  }

  function transformDataForPolarChart(databaseStats: IDashboardStatsDatabaseData[] = []) {
    return databaseStats.map(
      ({ name, teams }: IDashboardStatsDatabaseData): { x: string; y: number } => ({
        x: name,
        y: teams,
      }),
    );
  }

  function transformDataForLineChart(onboardedTeamStats: IDashboardStatsOnboardedTeamData[] = []) {
    return onboardedTeamStats
      .map(({ month, teams }: IDashboardStatsOnboardedTeamData): { x: string; y: number } => ({
        x: month,
        y: teams,
      }))
      .reverse();
  }

  return (
    <div className={styles.dashboardWrapper}>
      <CommonHelmet title={PAGE_TITLE} />
      <Header
        title={PAGE_TITLE}
        buttonText=""
        buttonCallback={() => {
          console.log('Dashboard');
        }}
      />

      <Row gutter={16}>
        <Col span={9} offset={2}>
          <Card
            title="Teams and database count"
            bordered={false}
            loading={dashboardStatsAPIResponse.isLoading}
          >
            <VictoryChart
              polar
              theme={VictoryTheme.material}
              startAngle={90}
              endAngle={450}
              padding={60}
            >
              <VictoryPolarAxis
                tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
                labelPlacement="vertical"
              />
              <VictoryBar
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                style={{ data: { fill: styles.primaryColor, width: 40 } }}
                data={
                  data?.data?.stats?.databases.length
                    ? transformDataForPolarChart(data.data.stats.databases)
                    : []
                }
              />
            </VictoryChart>
          </Card>
        </Col>
        <Col span={9} offset={2}>
          <Card
            title="Teams and member count"
            bordered={false}
            loading={dashboardStatsAPIResponse.isLoading}
          >
            <VictoryChart domainPadding={20}>
              <VictoryBar
                style={{ data: { fill: styles.primaryColor } }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                data={
                  data?.data?.stats?.teams.length
                    ? transformDataForBarChart(data.data.stats.teams)
                    : []
                }
                x="team"
                y="members"
              />
            </VictoryChart>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={9} offset={8}>
          <Card
            title="Teams onboarded per month"
            bordered={false}
            loading={dashboardStatsAPIResponse.isLoading}
          >
            <VictoryChart>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  domain={{ y: [0, 5] }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                  }}
                  style={{
                    data: { stroke: '#26519e' },
                    parent: { border: '1px solid #ccc' },
                  }}
                  labels={({ datum }) => datum.y}
                  data={
                    data?.data?.stats?.onboardedTeams.length
                      ? transformDataForLineChart(data.data.stats.onboardedTeams)
                      : []
                  }
                />
              </VictoryChart>
            </VictoryChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Teams;
