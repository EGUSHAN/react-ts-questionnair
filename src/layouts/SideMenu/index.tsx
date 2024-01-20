import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Sider } = Layout;

type PropsType = {
  collapsed: boolean;
};

function SideMenu(props: Readonly<PropsType>) {
  const { collapsed } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </Sider>
  );
}

export default SideMenu;
