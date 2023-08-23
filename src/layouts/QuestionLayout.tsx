import React from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

function QuestionLayout() {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <>
      <div>QuestionLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>QuestionLayout footer</div>
    </>
  );
}

export default QuestionLayout;
