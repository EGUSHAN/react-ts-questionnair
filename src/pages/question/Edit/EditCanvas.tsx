import React, { MouseEvent } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './EditCanvas.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer';

import { getComponentConfByType } from '../../../components/QuestionComponents';

import useBindCanvasBeyPress from '../../../hooks/useBindCanvasBeyPress';

type PropsType = {
  loading: boolean;
};

function EditCanvas(props: PropsType) {
  const dispatch = useDispatch();
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentInfo();

  function genComponent(componentInfo: ComponentInfoType) {
    const { type, props: attr = {} } = componentInfo ?? {};
    const ComponentConf = getComponentConfByType(type);
    return (ComponentConf?.Component && <ComponentConf.Component {...attr} />) || null;
  }

  function handleClick(e: MouseEvent<HTMLDivElement>, id: string) {
    e.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  useBindCanvasBeyPress();

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '24px',
        }}
      >
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id: id, isLocked } = c;
          const wrapperDefaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: id === selectedId,
            [lockedClassName]: isLocked,
          });
          return (
            <div key={id} className={wrapperClassName} onClick={(e) => handleClick(e, id)}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
}

export default EditCanvas;
