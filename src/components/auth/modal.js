import React, { PropTypes } from 'react'
import {Form, Input, InputNumber, Radio, Modal ,Select} from 'antd'
const FormItem = Form.Item

import styles from './auth.less';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

// 方法
const Modals = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新增规则' : '修改用户'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='规则名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '规则名称未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='规则描述' hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            initialValue: item.nickName,
            rules: [
              {
                required: true,
                message: '规则描述未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='父级节点' hasFeedback {...formItemLayout}>

          <Select placeholder="管理员">
              <Option value="admin">管理员</Option>
              <Option value="users">用户</Option>
              <Option value="service">客服</Option>
            </Select>
        </FormItem>

        <FormItem label='状态' hasFeedback {...formItemLayout}>
          <Select placeholder="正常">
              <Option value="china">正常</Option>
              <Option value="use">禁用</Option>
            </Select>
        </FormItem>

      </Form>
    </Modal>
  );
};

// 参数验证
Modals.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

// 暴露方法
export default Form.create()(Modals);
