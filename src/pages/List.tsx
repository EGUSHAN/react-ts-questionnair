import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import styles from './List.module.scss';
import { QuestionInter } from '../interface';

const rawQuestionList: QuestionInter[] = [
  {
    id: 0,
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '4月15日 13:23',
  },
];

function List() {
  const [questionList, setQuestionList] = useState<QuestionInter[]>(rawQuestionList);

  const deleteQuestion = (id: number) => {
    setQuestionList(questionList.filter((i) => i.id !== id));
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <h3 className={styles.left}>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
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
      <div className={styles.footer}>footer</div>
    </>
  );
}

export default List;
