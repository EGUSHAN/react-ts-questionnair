import React from 'react';
import { QuestionInter } from '../interface';
import styles from './QuestionCard.module.scss';

interface QuestionCardInter extends QuestionInter {
  del: (id: number) => void;
}

function QuestionCard(prop: QuestionCardInter) {
  const { id, title, createAt, answerCount, isPublished, del } = prop;
  const delHandle = () => {
    del(id);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href="www.baidu.com">{title}</a>
        </div>
        <div className={styles.right}>
          {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
          &nbsp;
          <span>{createAt}</span>
          &nbsp;
          <span>答卷：{answerCount}</span>
        </div>
      </div>
      <div className={styles.button_container}>
        <div className={styles.left}>
          <button type="button">编辑问卷</button>
          <button type="button">数据统计</button>
        </div>
        <div className={styles.right}>
          <button type="button">标星</button>
          <button type="button">复制</button>
          <button type="button" onClick={delHandle}>
            删除
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
