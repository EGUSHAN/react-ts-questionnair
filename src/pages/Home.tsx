import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const nav = useNavigate();

  const clickHandler = () => {
    // nav('/login');
    nav({
      pathname: '/login',
      search: 'b=21',
    });
  };

  return (
    <div>
      home
      <p>home</p>
      <button type="button" onClick={clickHandler}>
        登陆
      </button>
    </div>
  );
}

export default Home;
