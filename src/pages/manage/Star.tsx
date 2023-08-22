import React from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty, Spin } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import ListPage from '../../components/ListPage';
import styles from './common.module.scss';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

const { Title } = Typography;

function Star() {
  useTitle('星标问卷');

  const { loading, data } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data ?? {};

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && total === 0 && <Empty description="暂无数据" />}
        {!loading &&
          total > 0 &&
          list.map((q) => {
            const { id, title, isPublished, isStar, answerCount, createdAt, isDeleted } = q;
            return (
              <QuestionCard
                key={q.id}
                id={id}
                title={title}
                isPublished={isPublished}
                isStar={isStar}
                answerCount={answerCount}
                createdAt={createdAt}
                isDeleted={isDeleted}
              />
            );
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
}

export default Star;
