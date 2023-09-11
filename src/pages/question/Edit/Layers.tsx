import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message, Input, Button, Space } from 'antd';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';

import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';

import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '@/store/componentsReducer';
import styles from './Layers.module.scss';

function Layers() {
  const { componentList, selectedId, selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();

  const [changeTitleId, setChangeTitleId] = useState('');

  async function handleTitleClick(id: string) {
    const curComp = componentList.find((c) => c.fe_id === id);
    if (!curComp) return;
    if (curComp.isHidden) {
      await message.info('不能选中隐藏的组件');
      return;
    }
    if (curComp?.fe_id !== selectedId) {
      dispatch(changeSelectedId(id));
      setChangeTitleId('');
      return;
    }
    setChangeTitleId(id);
  }

  function modifyTitle(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return;
    if (!selectedId) return;
    dispatch(
      changeComponentTitle({
        fe_id: selectedId,
        title: e.target.value.trim(),
      }),
    );
  }

  function changeHidden(id: string, isHidden: boolean) {
    if (!selectedComponent) return;
    dispatch(
      changeComponentHidden({
        fe_id: id,
        isHidden,
      }),
    );
  }

  function changeLock(id: string) {
    if (!selectedComponent) return;
    dispatch(
      toggleComponentLocked({
        fe_id: id,
      }),
    );
  }

  const componentListWithId = componentList.map((i) => ({ ...i, id: i.fe_id }));

  function onDragEnd(oldIndex: number, newIndex: number) {
    dispatch(
      moveComponent({
        newIndex,
        oldIndex,
      }),
    );
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={onDragEnd}>
      {componentList.map((c) => {
        const { fe_id: id, title, isHidden = false, isLocked = false } = c;

        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;

        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: id === selectedId,
        });

        return (
          <SortableItem id={id} key={id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(id)}>
                {changeTitleId === id ? (
                  <Input
                    value={title}
                    onPressEnter={() => setChangeTitleId('')}
                    onBlur={() => setChangeTitleId('')}
                    onChange={modifyTitle}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLock(id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
}

export default Layers;
