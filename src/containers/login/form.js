/**
 * @flow
 */
import React from 'react';
import { Button, Checkbox, Form, Input, Icon } from 'antd';
import * as Validator from 'utils/validator';

const FormItem = Form.Item;

type Props = {
  form: any,
  onChangeUserName: Function,
  onChangePassWord: Function,
  logOn: Function,
}

const InputForm = (props: Props) => {
  const { getFieldDecorator } = props.form;
  const { onChangeUserName, onChangePassWord, logOn } = props;
  return (
    <Form className="login-form">
      <FormItem>
        {getFieldDecorator('username', {
        rules: [
          { required: true, message: '请输入用户名' },
          {
            message: '仅支持中英文，数字和下划线',
            pattern: Validator.REGEXP_CNENNUM,
          }, {
            validator: (rule, value, callback) => {
              if (Validator.getStringByteLength(value) > 20) {
                callback('名称不能超过10个汉字或20个字符');
              } else {
                callback();
              }
            },
          },
        ],
        initialValue: '',
      })(
        <Input
          autoComplete="new-username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={onChangeUserName}
          placeholder="请输入用户名"
          maxLength={50}
        />,
      )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
        rules: [
          { required: true, message: '请输入密码' },
          {
            message: '请输入至少六位正确格式的密码',
            pattern: Validator.REGEXP_PWD,
          },
        ],
        initialValue: '',
      })(
        <Input
          autoComplete="new-password"
          placeholder="请输入密码"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={onChangePassWord}
          maxLength={20}
          type="password"
        />,
      )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>,
          )}
        <a className="login-form-forgot" href="">忘记密码</a>
        <Button type="primary" onClick={logOn} className="login-form-button">
            登录
        </Button>
        <a href="">马上注册</a>
      </FormItem>
    </Form>
  )
}

export const LoginForm = Form.create()(InputForm);
