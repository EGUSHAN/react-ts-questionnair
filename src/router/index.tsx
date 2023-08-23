import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Edit from '../pages/question/Edit';
import Statistics from '../pages/question/Statistics';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';

export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);
}

export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);
}

const router = createBrowserRouter([
  {
    path: HOME_PATHNAME,
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: LOGIN_PATHNAME,
        element: <Login />,
      },
      {
        path: REGISTER_PATHNAME,
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: MANAGE_INDEX_PATHNAME,
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'statistics/:id',
        element: <Statistics />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
