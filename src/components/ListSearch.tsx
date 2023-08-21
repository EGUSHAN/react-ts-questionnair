import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;

function ListSearch() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState('');

  useEffect(() => {
    const curValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curValue);
  }, [searchParams]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const searchHandler = (str: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${str}`,
    });
  };

  return (
    <Search
      placeholder="请输入关键字"
      value={value}
      size="large"
      onChange={handleChange}
      onSearch={searchHandler}
      style={{ width: '260px' }}
    />
  );
}

export default ListSearch;
