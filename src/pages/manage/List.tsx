import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch';
import LoadMore from '../../components/LoadMore';
import { QuestionInter } from '../../interface';
import { getQuestionListService } from '../../services/question';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant';

const { Title } = Typography;

function List() {
  useTitle('列表');

  const [page, setPage] = useState(1);
  const [list, setList] = useState<QuestionInter[]>([]);
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false);

  const handleMore = total > list.length;

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  const load = () => {
    return getQuestionListService({
      page,
      pageSize: LIST_PAGE_SIZE,
      keyword,
    });
  };

  const { run: loadMore, loading } = useRequest(load, {
    manual: true,
    onSuccess(res) {
      const { list: questionList = [], total: totalNum = 0 } = res;
      setList([...list, ...questionList]);
      setTotal(totalNum);
      setPage(page + 1);
      setStarted(false);
    },
  });

  // 触发加载
  const containerRef = useRef<HTMLDivElement>(null);

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        loadMore(); // 加载数据
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );

  // 当页面加载，或者URL 参数变化
  useEffect(() => {
    tryLoadMore();
  }, [searchParams, tryLoadMore]);

  useEffect(() => {
    if (handleMore) {
      window.addEventListener('scroll', tryLoadMore);
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [handleMore, tryLoadMore, searchParams]);

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
        {total > 0 &&
          list?.map((q) => {
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
      <div ref={containerRef} className={styles.footer}>
        <LoadMore loading={loading} total={total} haveMore={handleMore} started={started} />
      </div>
    </>
  );
}

export default List;
