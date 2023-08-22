import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  LIST_PAGE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../constant';

type PropsType = {
  total: number;
};

function ListPage(props: PropsType) {
  const [current, setCurrent] = useState(LIST_PAGE);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) ?? '', 10) || 1;
    setCurrent(page);
    const pageSizeNum = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) ?? '', 10) || 10;
    setPageSize(pageSizeNum);
  }, [searchParams]);
  const { total } = props;

  const nav = useNavigate();
  const { pathname } = useLocation();
  const changeCurrent = (page: number, size: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, size.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={changeCurrent} />
  );
}

export default ListPage;
