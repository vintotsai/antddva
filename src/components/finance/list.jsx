// 引入 React
import React from 'react';
// 引入布局样式
import styles from './finance.less';
// 引入阿里的antd视觉组件
import { Table, Icon } from 'antd';

//列表字段
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '客户名/类型',
    dataIndex: 'user_id',
    key: 'user_id',
  },{
    title: '充值途径',
    dataIndex: 'topupway',
    key: 'topupway',
  },{
    title: '充值金额',
    dataIndex: 'recharge',
    key: 'recharge',
  },{
    title: '账户余额',
    dataIndex: 'balance',
    key: 'balance',
  },{
    title: '创建时间',
    dataIndex: 'creationtime',
    key: 'creationtime',
  },{
    title: '支出',
    dataIndex: 'expenditure',
    key: 'expenditure',
  },{
    title: '状态',
    dataIndex: 'condition',
    key: 'condition',
  },{
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    className:styles['right'],
    render: (text, record) => (
      <span>
        <a href="#" className="ant-dropdown-link">账户明细</a>
      </span>
    ),
  }];


// 方法
const List = (props) => {
  return (
    <div>
      <Table columns={columns} dataSource={props.dataSource} loading={props.loading} rowKey={record => record.id} pagination={true}/>
    </div>
  );
};

// 参数验证
List.propTypes = {
};

// 暴露方法
export default List;
