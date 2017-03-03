// 引入 React
import React from 'react';
// 引入布局样式
import styles from './brands.less';
// 引入阿里的antd视觉组件
import { Table, Icon } from 'antd';

//列表字段
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '品牌名',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '品牌分类',
    dataIndex: 'classification',
    key: 'classification',
  },{
    title: '品牌系列',
    dataIndex: 'brandseries',
    key: 'brandseries',
  },{
    title: '商品数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    className:styles['right'],
    render: (text, record) => (
      <span>
        <a href="#" className="ant-dropdown-link">查看</a>
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
