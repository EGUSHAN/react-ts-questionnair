import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';

import 'antd/dist/reset.css';
import sorter from '@/utils/sort';

function App() {
  const arr: { value: number }[] = [{ value: 1 }, { value: 3 }, { value: 5 }];
  console.log(arr.sort(sorter<{ value: number }>((item) => [item.value], ['asc'])));
  return <RouterProvider router={router} />;
}

export default App;
