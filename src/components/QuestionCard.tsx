import React, { useState } from 'react';
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { QuestionInter } from '../interface';
import styles from './QuestionCard.module.scss';
import { duplicateQuestionService, updateQuestionService } from '../services/question';

const { confirm } = Modal;

interface QuestionCardInter extends QuestionInter {}

function QuestionCard(prop: QuestionCardInter) {
  const { id, title, createdAt, answerCount, isPublished, isStar, isDeleted } = prop;

  const [isStarState, setIsStarState] = useState(isStar);
  const [isDeletedState, setIsDeletedState] = useState(isDeleted);

  const nav = useNavigate();

  const { run: duplicate, loading: duplicateLoading } = useRequest(
    () => {
      return duplicateQuestionService(id);
    },
    {
      manual: true,
      async onSuccess(res) {
        await message.success('复制成功');
        nav(`/question/edit/${res.id}`);
      },
    },
  );

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    () => {
      return updateQuestionService(id, {
        isStar: !isStar,
      });
    },
    {
      manual: true,
      async onSuccess() {
        setIsStarState(!isStarState);
        await message.success('已更新');
      },
    },
  );

  const { loading: delLoading, run: delById } = useRequest(
    () => {
      return updateQuestionService(id, { isDeleted: true });
    },
    {
      manual: true,
      async onSuccess() {
        await message.success('删除成功');
      },
    },
  );

  const delHandle = () => {
    confirm({
      title: '确定删除该问卷？ ',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        delById();
        setIsDeletedState(!isDeletedState);
      },
    });
  };

  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/statistics/${id}` : `/question/edit/${id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/statistics/${id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={() => changeStar()}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该文卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                disabled={duplicateLoading}
                onClick={duplicate}
              >
                复制
              </Button>
            </Popconfirm>

            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              disabled={delLoading}
              onClick={delHandle}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
