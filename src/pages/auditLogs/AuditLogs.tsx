import { Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Header from 'shared/components/atoms/header/Header';
import { getURL } from 'shared/utils/api';

import styles from './auditLogs.module.scss';

const PAGE_TITLE = 'Audit Logs';

const fetchAuditLogsList = () => {
  return axios.get(getURL('/audit-logs'), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

const AuditLogs: React.FC = () => {
  const auditLogsAPIResponse = useQuery('audit-logs', fetchAuditLogsList);
  const { data } = auditLogsAPIResponse;

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'By',
      dataIndex: 'actor',
      key: 'actor',
    },
    {
      title: 'When',
      dataIndex: 'created',
      key: 'created',
    },
  ];

  return (
    <div className={styles.teamWrapper}>
      <Helmet>
        <meta name="Pro-DB Kit" content="Ninja 8 demo app" charSet="utf-8" />
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <Header
        title={PAGE_TITLE}
        buttonText={''}
        buttonCallback={() => {
          console.log('audit logs');
        }}
      />
      <Table
        columns={columns}
        loading={auditLogsAPIResponse.isLoading}
        rowKey={'id'}
        dataSource={auditLogsAPIResponse === undefined ? [] : (data?.data as any)}
      />
    </div>
  );
};

export default AuditLogs;
