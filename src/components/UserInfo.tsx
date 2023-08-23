import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { LOGIN_PATHNAME } from '../router';
import { removeToken } from '../utils/user-token';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { logoutReducer } from '../store/userReducer';

function UserInfo() {
  const dispath = useDispatch();
  const nav = useNavigate();

  const data = useGetUserInfo();

  const logOut = () => {
    removeToken();
    dispath(logoutReducer());
    nav('/login');
  };

  return (
    <>
      <Link to={LOGIN_PATHNAME}>{data ? `${data.username}` : '登陆/注册'} </Link>;
      {data.username && <Button onClick={logOut}>退出登录</Button>};
    </>
  );
}

export default UserInfo;
