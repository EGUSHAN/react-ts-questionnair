import React from 'react';
import { useTitle } from 'ahooks';
import { Spin, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

const { Title } = Typography;

function List() {
  useTitle('列表');

  const { loading, data } = useLoadQuestionListData();
  const { list = [], total = 0 } = data ?? {};

  const deleteQuestion = (id: number) => {
    console.log(list?.filter((i) => i.id !== id));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {!loading &&
          total > 0 &&
          list?.map((q) => {
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
      <div className={styles.footer}>loadMore...上划加载更多</div>
    </>
  );
}

export default List;
