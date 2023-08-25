import React from 'react';
import { Button, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { LeftOutlined } from '@ant-design/icons';
import styles from './EditHeader.module.scss';

const { Title } = Typography;

function EditHeader() {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>中</div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default EditHeader;
