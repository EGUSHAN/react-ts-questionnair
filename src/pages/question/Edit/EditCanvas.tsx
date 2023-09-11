import React, { MouseEvent } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './EditCanvas.module.scss';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import { ComponentInfoType, changeSelectedId, moveComponent } from '@/store/componentsReducer';

import { getComponentConfByType } from '@/components/QuestionComponents';

import useBindCanvasBeyPress from '@/hooks/useBindCanvasBeyPress';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';

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

  function onDragEnd(oldIndex: number, newIndex: number) {
    dispatch(
      moveComponent({
        oldIndex,
        newIndex,
      }),
    );
  }

  const componentListWithId = componentList.map((i) => ({ ...i, id: i.fe_id }));

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
    <SortableContainer onDragEnd={onDragEnd} items={componentListWithId}>
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
              <SortableItem id={id} key={id}>
                <div className={wrapperClassName} onClick={(e) => handleClick(e, id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
}

export default EditCanvas;
