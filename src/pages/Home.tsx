import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';

const { Title, Paragraph } = Typography;

function Home() {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <Title className={styles.info}>问卷调查 | 在线投票</Title>
      <Paragraph style={{ textAlign: 'center' }}>
        已累计创建问卷 0 份，发布问卷 0 份， 收到答卷 0 份
      </Paragraph>
      <div style={{ margin: '0 auto' }}>
        <Button
          type="primary"
          size="large"
          onClick={() =>
            nav({
              pathname: MANAGE_INDEX_PATHNAME,
            })
          }
        >
          开始使用
        </Button>
      </div>
    </div>
  );
}

export default Home;
