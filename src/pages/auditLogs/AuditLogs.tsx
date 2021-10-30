import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { routes } from 'routes';
import ErrorUI from 'shared/components/atoms/errorUI/ErrorUI';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';

import styles from './auditLogs.module.scss';
import { fetchAuditLogsList } from './services/AuditLogs.service';

const PAGE_TITLE = 'Audit Logs';

const AuditLogs: React.FC = () => {
  const auditLogsAPIResponse = useQuery('audit-logs', fetchAuditLogsList, { retry: false });
  const { data } = auditLogsAPIResponse;
  const history = useHistory();

  const columns = [
    {
      title: 'Action performed',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => <span>{record.action.type}</span>,
    },
    {
      title: 'Performed by',
      dataIndex: 'actor',
      key: 'actor',
      render: (text: any, record: any) => <span>{record.actor.member.name}</span>,
    },
    {
      title: 'Performed at',
      dataIndex: 'created',
      key: 'created',
    },
  ];

  return (
    <div className={styles.auditLogsWrapper}>
      <CommonHelmet title={PAGE_TITLE} />
      <ErrorBoundary
        FallbackComponent={ErrorUI}
        onReset={() => {
          history.push(routes.dashboard);
        }}
      >
        <Header title={PAGE_TITLE} />
        <CommonTable
          columns={columns}
          loading={auditLogsAPIResponse.isLoading}
          rowKey={'id'}
          dataSource={auditLogsAPIResponse === undefined ? [] : data?.data}
        />
      </ErrorBoundary>
    </div>
  );
};

export default AuditLogs;
