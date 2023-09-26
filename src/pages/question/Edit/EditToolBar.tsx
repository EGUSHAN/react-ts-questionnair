import React from 'react';

import { useDispatch } from 'react-redux';

import { Button, Space, Tooltip } from 'antd';

import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { ActionCreators } from 'redux-undo';
import {
  changeComponentHidden,
  removeSelectedComponent,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '@/store/componentsReducer';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';

function EditToolBar() {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();
  const { isLocked = false } = selectedComponent ?? {};

  const { length } = componentList;
  const selectedIndex = componentList.findIndex((i) => i.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex + 1 >= length;

  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  function copy() {
    dispatch(copySelectedComponent({ fe_id: selectedId }));
  }

  function paste() {
    dispatch(pasteCopiedComponent());
  }

  function up() {
    if (isFirst) return;
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex - 1,
      }),
    );
  }

  function down() {
    if (isLast) return;
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex + 1,
      }),
    );
  }

  function undo() {
    dispatch(ActionCreators.undo());
  }

  function redo() {
    dispatch(ActionCreators.redo());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent === null}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={up} disabled={isFirst} />
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined />} onClick={down} disabled={isLast} />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
    </Space>
  );
}

export default EditToolBar;
