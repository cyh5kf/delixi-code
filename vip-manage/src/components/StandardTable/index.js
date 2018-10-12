import React, { PureComponent } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
  }


  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  render() {
    const { data: { list, pagination }, loading, columns } = this.props;

    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
