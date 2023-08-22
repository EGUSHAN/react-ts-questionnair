import React, { useEffect } from 'react';
import { Form, Space, Typography, Input, Button, Checkbox } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import styles from './Login.module.scss';
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router';

import { RegisterInter } from '../interface';

import { USERNAME_KEY, PASSWORD_KEY } from '../constant';
import { loginService } from '../services/user';
import { setToken } from '../utils/user-token';

const { Title } = Typography;

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY) || '',
    password: localStorage.getItem(PASSWORD_KEY) || '',
  };
}

interface LoginInter extends Pick<RegisterInter, 'username' | 'password'> {
  remember: boolean;
}

function Login() {
  const nav = useNavigate();

  const { run: login } = useRequest(
    (value) => {
      return loginService(value);
    },
    {
      manual: true,
      onSuccess(res) {
        setToken(res.token);
        nav(MANAGE_INDEX_PATHNAME);
      },
    },
  );

  const [form] = Form.useForm();

  useEffect(() => {
    const { username, password } = getUserInfoFormStorage();
    form.setFieldsValue({
      username,
      password,
    });
  });

  const onFinish = (values: LoginInter) => {
    const { username, password, remember } = values;
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
    login({
      username,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登陆</Title>
        </Space>
      </div>
      <div className={styles.center}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5 - 20之间' },
              { pattern: /^\w+$/, message: '只能是字母数值下划线' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }} name="remember">
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
