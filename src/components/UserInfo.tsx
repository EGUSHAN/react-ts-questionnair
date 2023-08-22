import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Button } from 'antd';
import { LOGIN_PATHNAME } from '../router';
import { getUserInfoService } from '../services/user';
import { removeToken } from '../utils/user-token';

function UserInfo() {
  const nav = useNavigate();

  const { data } = useRequest(() => {
    return getUserInfoService();
  });

  const logOut = () => {
    removeToken();
    nav('/login');
  };

  return (
    <>
      <Link to={LOGIN_PATHNAME}>{data ? `${data.username}` : '登陆/注册'} </Link>;
      {data && <Button onClick={logOut}>退出登录</Button>};
    </>
  );
}

export default UserInfo;
