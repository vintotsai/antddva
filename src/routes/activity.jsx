// 引入 React，组件，参数
import React, {Component, PropTypes} from 'react'

// 引入 容器组件
import {connect} from 'dva'

// 引入 路由链接组件
import {Link} from 'dva/router'

// 引入 头管理组件
import Helmet from "react-helmet"

// 引入 自定义模块
import Modal from '../components/activity/modal'
import Search from '../components/activity/search'
import List from '../components/activity/list'

// 引入 视觉组件
import {Table, Icon} from 'antd'

// 引入 样式
import styles from './activity.less'

// 方法
function Activity({location, dispatch, activity}) {

  const {
    loading,
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType
  } = activity

  const {field, keyword} = location.query

  // 弹窗属性
  const modalProps = {
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `activity/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'activity/hideModal'})
    }
  }

  // 搜索属性
  const searchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: '/activity',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword
          }
        }))
        : dispatch(routerRedux.push({pathname: '/activity'}))
    },
    onAdd() {
      dispatch({
        type: 'activity/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  return (
    <div>
      <Helmet title="活动管理"/>
      <Search {...searchProps}/>
      <List/>
      <Modal {...modalProps}/>
    </div>
  );
};

// 参数验证
Activity.propTypes = {
  activity: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

// 模型状态转到属性
function mapStateToProps({activity}) {
  return {activity}
}

// 暴露方法
export default connect(mapStateToProps)(Activity)