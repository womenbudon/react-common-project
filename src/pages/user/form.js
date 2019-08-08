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
  user: Object,
}
class UserForm extends Component<Props> {
  render() {
    const {
      getFieldDecorator, // 用于和表单进行双向数据绑定
    } = this.props.form;
    const {
      name, email, phnoe, address, role, job,
    } = this.props.user;
    return (
      <Form>
        <FormItem
          label="姓名"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('name', {
          initialValue: name || '',
          rules: [
          {
              required: true, message: '请输入姓名!',
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
          <Input placeholder="请输入姓名!" maxLength={20} />,
        )}
        </FormItem>
        <FormItem
          label="角色"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('role', {
          rules: [
            { required: true, message: '请选择角色' },
          ],
        })(
          <Select
            placeholder="请选择角色"
          />,
        )}
        </FormItem>
        <FormItem
          label="联系电话"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('phnoe', {
          initialValue: phnoe || '',
        rules: [
          { required: true, message: '请输入联系电话' },
          {
            message: '输入的电话不正确',
            pattern: Validator.REGEXP_PHONE,
          },
        ],
      })(
        <Input placeholder="请输入联系电话" maxLength={20} />,
      )}
        </FormItem>
        <FormItem
          label="电子邮箱"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('email', {
          initialValue: email || '',
          rules: [
            { required: true, message: '请输入电子邮箱' },
            {
              message: '输入的电子邮箱不正确',
              pattern: Validator.REGEXP_MAIL,
            },
          ],
        })(
          <Input placeholder="请输入电子邮箱" maxLength={20} />,
        )}
        </FormItem>
        <FormItem
          label="详细地址"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('address', {
          initialValue: address || '',
          rules: [{ required: true, message: '请输入详细地址' }],
        })(
          <Input placeholder="请输入详细地址" maxLength={40} />,
        )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(UserForm);
