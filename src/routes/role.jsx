// 引入 React，组件，参数
import React, {Component, PropTypes} from 'react';

// 引入 容器组件
import {connect} from 'dva';

// 引入 路由链接组件
import {Link} from 'dva/router';

// 引入 头管理组件
import Helmet from "react-helmet";

// 引入 自定义模块
import Modal from '../components/role/modal';
import Search from '../components/role/search';
import List from '../components/role/list';

// 引入 视觉组件
import {Table, Icon} from 'antd';

// 引入 样式
import styles from './role.less';

// 方法
const Role = ({location, dispatch, role}) => {

  const {
    loading,
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType
  } = role;

  const {field, keyword} = location.query;

  const modalProps = {
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `role/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'role/hideModal'})
    }
  }

  const searchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: '/role',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword
          }
        }))
        : dispatch(routerRedux.push({pathname: '/role'}))
    },
    onAdd() {
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  return (
    <div>
      <Helmet title="角色管理"/>
      <Search {...searchProps}/>
      <List/>
      <Modal {...modalProps}/>
    </div>
  )
}

// 参数验证
Role.propTypes = {
  role: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({role}) {
  return {role}
}

// 暴露方法
export default connect(mapStateToProps)(Role)