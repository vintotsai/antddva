// 引入 React，组件，参数
import React, {Component, PropTypes} from 'react';
// 引入 dva链接模型组件
import {connect} from 'dva';
// 引入 路由链接组件
import {Link} from 'dva/router';
// 引入 头管理组件
import Helmet from "react-helmet";
// 引入 布局视图
import Layouts from '../components/layouts';
// 引入 自定义模块
import Modal from '../components/auth/modal';
import Search from '../components/auth/search';
import List from '../components/auth/list';
// 引入 阿里的antd视觉组件
import {Table, Icon} from 'antd';
// 引入 样式
import styles from './auth.less';

// 方法
function Auth({location, dispatch, auth}) {

  const {
    loading,
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType
  } = auth;
  const {field, keyword} = location.query;

  const userModalProps = {
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `auth/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'auth/hideModal'})
    }
  }

  const userSearchProps = {
    field,
    keyword,
    // onSearch (fieldsValue) {
    //   fieldsValue.keyword.length ? dispatch(routerRedux.push({
    //     pathname: '/users',
    //     query: {
    //       field: fieldsValue.field,
    //       keyword: fieldsValue.keyword
    //     }
    //   })) : dispatch(routerRedux.push({
    //     pathname: '/users'
    //   }))
    // },
    onAdd() {
      dispatch({
        type: 'auth/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  return (
    <div>
      <Helmet title="权限"/>
      <Layouts>
        <Search {...userSearchProps}/>
        <List/>
        <Modal {...userModalProps}/>
      </Layouts>
    </div>
  );
};

// 参数验证
Auth.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ auth }) {
  return { auth }
}

// 暴露方法
export default connect(mapStateToProps)(Auth)
