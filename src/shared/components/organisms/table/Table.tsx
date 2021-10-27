import { Table } from 'antd';
import React from 'react';

export interface ITable {
  columns: any[];
  data: any[];
  pagination?: any;
  scroll?: any;
}

const CommonTable: React.FC<ITable> = (props: ITable) => {
  const { columns, data, ...extraProps } = props;
  return (
    <div>
      <Table columns={columns} dataSource={data} showSorterTooltip={false} {...extraProps} />
    </div>
  );
};

export default CommonTable;
