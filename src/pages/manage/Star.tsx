import React, { useState } from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import { QuestionInter } from '../../interface';

const { Title } = Typography;

const rawQuestionList: QuestionInter[] = [
  {
    id: 0,
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '4月15日 13:23',
  },
];

function Star() {
  useTitle('星标问卷');

  const [questionList, setQuestionList] = useState<QuestionInter[]>(rawQuestionList);

  const deleteQuestion = (id: number) => {
    setQuestionList(questionList.filter((i) => i.id !== id));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { id, title, isPublished, isStar, answerCount, createAt } = q;
            return (
              <QuestionCard
                key={q.id}
                id={id}
                title={title}
                isPublished={isPublished}
                isStar={isStar}
                answerCount={answerCount}
                createAt={createAt}
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
