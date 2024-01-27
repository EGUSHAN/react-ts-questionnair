import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Home() {
  const nav = useNavigate();

  const goLogin = () => {
    nav({
      pathname: '/test',
    });
  };

  return <Button onClick={goLogin}>nihao</Button>;
}

export default Home;
