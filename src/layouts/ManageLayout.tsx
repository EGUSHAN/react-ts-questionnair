import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ManageLayout.module.scss';

function ManageLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout left</p>
        <button type="button">创建问卷</button>
        <br />
        <a href="www.baidu.com">我的问卷</a>
        <br />
        <a href="ww.baidu.com">星标问卷</a>
        <br />
        <a href="ww.baidu.com">回收站</a>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}

export default ManageLayout;
