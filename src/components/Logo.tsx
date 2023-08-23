import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { HOME_PATHNAME } from '../router';
import useGetUserInfo from '../hooks/useGetUserInfo';

const { Title } = Typography;

function Logo() {
  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    if (username) {
      setPathname(HOME_PATHNAME);
    } else {
      setPathname('/login');
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷demo</Title>
        </Space>
      </Link>
    </div>
  );
}

export default Logo;
