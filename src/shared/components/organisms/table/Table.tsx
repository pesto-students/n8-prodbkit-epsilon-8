import { Table, TableProps } from 'antd';
import React from 'react';

export interface ITable extends TableProps<any> {
  columns: any[];
  dataSource: any[];
}

const CommonTable: React.FC<ITable> = (props: ITable) => {
  const { columns, dataSource, ...extraProps } = props;
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        showSorterTooltip={false}
        {...extraProps}
        pagination={{ hideOnSinglePage: true, pageSize: 25, responsive: true }}
      />
    </div>
  );
};

export default CommonTable;
