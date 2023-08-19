import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const nav = useNavigate();

  const clickHandler = () => {
    nav(-1);
  };

  return (
    <div>
      <p>Login</p>
      <button type="button" onClick={clickHandler}>
        返回
      </button>
      <Link to="/register">注册</Link>
    </div>
  );
}

export default Login;
