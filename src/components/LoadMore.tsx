import React from 'react';
import { Empty, Spin } from 'antd';

type TypeProp = {
  loading: boolean;
  total: number;
  haveMore: boolean;
  started: boolean;
};

function LoadMore(props: TypeProp) {
  const { loading, haveMore, total = 0, started } = props;

  if (!started || loading) return <Spin />;
  if (total === 0) return <Empty description="暂无更多数据" />;
  if (!haveMore) return <span>没有更多了</span>;
  return <span>开始加载下一页</span>;
}

export default LoadMore;
