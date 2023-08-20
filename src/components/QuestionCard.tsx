import React from 'react';
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
import { QuestionInter } from '../interface';
import styles from './QuestionCard.module.scss';

const { confirm } = Modal;

interface QuestionCardInter extends QuestionInter {
  del: (id: number) => void;
}

function QuestionCard(prop: QuestionCardInter) {
  const { id, title, createAt, answerCount, isPublished, isStar, del } = prop;

  const nav = useNavigate();
  const delHandle = () => {
    confirm({
      title: '确定删除该问卷？ ',
      icon: <ExclamationCircleOutlined />,
      onOk: () => del(id),
    });
  };

  const duplicate = () => {
    message.success('执行复制').then(() => ({}));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/statistics/${id}` : `/question/edit/${id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
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
            <Button icon={<StarOutlined />} type="text" size="small">
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该文卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
            </Popconfirm>

            <Button icon={<DeleteOutlined />} type="text" size="small" onClick={delHandle}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
