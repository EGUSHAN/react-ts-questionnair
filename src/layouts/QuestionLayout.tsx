import React from 'react';
import { Outlet } from 'react-router-dom';

function QuestionLayout() {
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
