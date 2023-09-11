import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';

import styles from './MainLayout.module.scss';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;

function MainLayout() {
  const { waitingUserData } = useLoadUserData();

  useNavPage(waitingUserData);

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {!waitingUserData ? (
          <Outlet />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '60px',
              justifyContent: 'center',
            }}
          >
            <Spin />
          </div>
        )}
      </Content>
      <Footer className={styles.footer}>问卷demo &copy; 2023-08-16</Footer>
    </Layout>
  );
}

export default MainLayout;
