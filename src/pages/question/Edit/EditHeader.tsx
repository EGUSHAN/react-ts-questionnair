import React, { ChangeEvent, useState } from 'react';
import { Button, Typography, Space, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import styles from './EditHeader.module.scss';

import EditToolBar from './EditToolBar';

// eslint-disable-next-line import/extensions
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { resetPageInfo } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { updateQuestionService } from '../../../services/question';

const { Title } = Typography;

function SaveButton() {
  const { id = '' } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  async function updateQuestion() {
    return updateQuestionService(id, {
      componentList,
      ...pageInfo,
    });
  }

  const { run: save, loading } = useRequest(updateQuestion, {
    manual: true,
  });

  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault();
    if (loading) return;
    save();
  });

  useDebounceEffect(
    () => {
      save();
    },
    [componentList, save],
    {
      wait: 10000,
    },
  );

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
}

function PostButton() {
  const nav = useNavigate();
  const { id = '' } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  async function updateQuestion() {
    return updateQuestionService(id, {
      componentList,
      ...pageInfo,
      isPublished: true,
    });
  }

  const { run: pub, loading } = useRequest(updateQuestion, {
    manual: true,
    async onSuccess() {
      await message.success('发布成功');
      nav(`/question/statistics/${id}`);
    },
  });

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  );
}

function TitleElem() {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState<boolean>(false);

  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      resetPageInfo({
        title: e.target.value,
      }),
    );
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onChange={changeTitle}
        onBlur={() => setEditState(false)}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  );
}

function EditHeader() {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PostButton />
          </Space>
        </div>
      </div>
    </div>
  );
}

export default EditHeader;
