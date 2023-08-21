import React from 'react';

import { Typography, Space, Form, Input, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import { LOGIN_PATHNAME } from '../router';

import { RegisterInter } from '../interface';

const { Title } = Typography;

function Register() {
  const onFinish = (values: RegisterInter) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Space align="center">
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div className={styles.center}>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
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
          <Form.Item
            label="确认密码"
            name="confirm"
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickName"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户,请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
