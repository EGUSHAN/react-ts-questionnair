import React from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty, Spin } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

const { Title } = Typography;

function Star() {
  useTitle('星标问卷');

  const { loading, data } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data ?? {};

  const deleteQuestion = (id: number) => {
    console.log(list.filter((i) => i.id !== id));
  };

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
            const { id, title, isPublished, isStar, answerCount, createdAt } = q;
            return (
              <QuestionCard
                key={q.id}
                id={id}
                title={title}
                isPublished={isPublished}
                isStar={isStar}
                answerCount={answerCount}
                createdAt={createdAt}
                del={() => deleteQuestion(q.id)}
              />
            );
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
}

export default Star;
