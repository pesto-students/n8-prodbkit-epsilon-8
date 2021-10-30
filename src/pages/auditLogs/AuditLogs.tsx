import { Table } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Header from 'shared/components/atoms/header/Header';
import CommonHelmet from 'shared/components/atoms/helmet/Helmet';
import CommonTable from 'shared/components/organisms/table/Table';
import { handleTableData } from 'shared/utils/table';

import styles from './auditLogs.module.scss';
import { fetchAuditLogsList } from './services/AuditLogs.service';

const PAGE_TITLE = 'Audit Logs';

const AuditLogs: React.FC = () => {
  const auditLogsAPIResponse = useQuery('audit-logs', fetchAuditLogsList, { retry: false });
  const { data } = auditLogsAPIResponse;
  const [searchInputText, setSearchInputText] = useState<string>('');

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

  const handleTeamSearch = (searchtext: string) => {
    setSearchInputText(searchtext);
  };

  return (
    <div className={styles.auditLogsWrapper}>
      <CommonHelmet title={PAGE_TITLE} />
      <Header title={PAGE_TITLE} showSearchInput={true} onSearchTextChange={handleTeamSearch} />
      <CommonTable
        columns={columns}
        loading={auditLogsAPIResponse.isLoading}
        rowKey={'id'}
        dataSource={
          auditLogsAPIResponse === undefined ? [] : handleTableData(data, searchInputText)
        }
      />
    </div>
  );
};

export default AuditLogs;
