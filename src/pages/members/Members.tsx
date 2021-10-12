import { PlusOutlined } from '@ant-design/icons';
import { Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import { showModal } from '../../redux-features/common';
import Header from '../../shared/components/atoms/header/Header';
import AntDSkeleton from '../../shared/components/atoms/skeleton/Skeleton';
import CommonTable from '../../shared/components/organisms/table/Table';
import { modalTitleMap } from '../../shared/constants';
import { ITableData } from './member.interface';
import styles from './members.module.scss';

const PAGE_TITLE = 'Members';

const tableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: ITableData, b: ITableData) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: ITableData, b: ITableData) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const tableData: ITableData[] = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '3',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '5',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '6',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '7',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '8',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '9',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '10',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '11',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '12',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '13',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '14',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const Members: React.FC = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddMember = () => {
    dispatch(
      showModal({
        key: modalTitleMap.deleteMember,
        text: 'Are you sure you want to delete member DEMO123?',
      }),
    );
  };

  // const handleDeleteMember = (id: number) => {};

  return (
    <div className={styles.memberWrapper}>
      <Helmet>
        <meta name="Pro-DB Kit" content="Ninja 8 demo app" charSet="utf-8" />
        <title>{PAGE_TITLE}</title>
      </Helmet>
      {isLoading ? (
        <AntDSkeleton />
      ) : (
        <Header
          title={PAGE_TITLE}
          buttonText="Add Member"
          buttonCallback={handleAddMember}
          buttonIcon={<PlusOutlined />}
        />
      )}
    </div>
  );
};

export default Members;
