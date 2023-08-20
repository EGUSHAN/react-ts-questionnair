import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';

function UserInfo() {
  return <Link to={LOGIN_PATHNAME}>登陆/注册</Link>;
}

export default UserInfo;
