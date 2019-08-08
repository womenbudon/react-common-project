/**
 * @flow
 * @author wanglei
 */
import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import * as Validator from 'utils/validator';

const FormItem = Form.Item;
type Props = {
  form: Form,
  role: Object,
}
class RoleForm extends Component<Props> {
  render() {
    const {
      getFieldDecorator, // 用于和表单进行双向数据绑定
    } = this.props.form;
    const {
      rolename, roledesc, status,
    } = this.props.role;
    return (
      <Form>
        <FormItem
          label="姓名"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('rolename', {
          initialValue: rolename || '',
          rules: [
          {
              required: true, message: '请输入角色名',
          }, {
            message: '仅支持中英文，数字和下划线',
            pattern: Validator.REGEXP_CNENNUM,
          }, {
            validator: (rule, value, callback) => {
              if (Validator.getStringByteLength(value) > 20) {
                callback('姓名不能超过10个汉字或20个字符');
              } else {
                callback();
              }
            },
          }],
        })(
          <Input placeholder="请输入角色名" maxLength={20} />,
        )}
        </FormItem>
        <FormItem
          label="描述"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('roledesc', {
          initialValue: roledesc || '',
          rules: [{ required: true, message: '请输入描述' }],
        })(
          <Input placeholder="roledesc" maxLength={128} />,
        )}
        </FormItem>
        <FormItem
          label="状态"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('status', {
          rules: [
            { required: true, message: '请选择状态' },
          ],
        })(
          <Select
            placeholder="请选择状态"
          />,
        )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(RoleForm);
