import React from 'react';
import { Link } from 'react-router-dom';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { HOME_PATHNAME } from '../router';

const { Title } = Typography;

function Logo() {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
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
