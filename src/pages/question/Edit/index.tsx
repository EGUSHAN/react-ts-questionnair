import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';

import { changeSelectedId } from '../../../store/componentsReducer';

import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditHeader from './EditHeader';
import LeftPlane from './LeftPlane';
import RightPanel from './RightPanel';

function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();

  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }

  const { loading } = useLoadQuestionData(id as string);
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff' }}>
        <EditHeader />
      </div>
      <div className={styles['content-wrap']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPlane />
          </div>
          <div className={styles.main} onClick={() => clearSelectedId()}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
