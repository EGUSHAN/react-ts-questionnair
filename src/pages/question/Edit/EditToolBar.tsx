import React from 'react';

import { useDispatch } from 'react-redux';

import { Button, Space, Tooltip } from 'antd';

import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {
  changeComponentHidden,
  removeSelectedComponent,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/componentsReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

function EditToolBar() {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked = false } = selectedComponent || {};

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
    </Space>
  );
}

export default EditToolBar;
