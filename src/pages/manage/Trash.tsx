import React, { useState } from 'react';
import { useRequest, useTitle } from 'ahooks';
import { Typography, Empty, Table, Space, Button, Tag, Modal, Spin, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import { QuestionType } from '../../interface';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { deleteQuestionsService, updateQuestionService } from '../../services/question';

const { Title } = Typography;
const { confirm } = Modal;

function Trash() {
  useTitle('回收站');

  const { loading, data, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { total = 0, list = [] } = data ?? {};

  const { run: deleteQuestion } = useRequest(
    (id) => {
      return updateQuestionService(id, { isDeleted: true });
    },
    {
      manual: true,
      async onSuccess() {
        refresh();
        await message.success('删除成功');
      },
    },
  );

  const { run: recover } = useRequest(
    (id) => {
      return updateQuestionService(id, { isDeleted: false });
    },
    {
      manual: true,
      async onSuccess() {
        refresh();
        await message.success('恢复成功');
      },
    },
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const columns: ColumnsType<QuestionType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => recover(record.id)}>恢复</Button>
          <Button type="text" size="small" onClick={() => deleteQuestion(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const { run: batchDel } = useRequest(
    () => {
      return deleteQuestionsService(selectedIds);
    },
    {
      manual: true,
      onSuccess() {
        setSelectedIds([]);
        message.success('删除成功');
        refresh();
      },
    },
  );

  const batchDeleteQuestion = () => {
    confirm({
      title: '确定批量删除',
      content: '删除以后无法找回',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        batchDel();
      },
    });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && total === 0 && <Empty description="暂无数据" />}
        {!loading && total > 0 && (
          <>
            <Table
              dataSource={list}
              columns={columns}
              pagination={false}
              rowKey={(q) => q.id}
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys: React.Key[], selectedRows: QuestionType[]) => {
                  setSelectedIds(selectedRows.map((i) => i.id));
                },
              }}
            />
            {/* 底部操作按钮 */}
            <Space style={{ marginTop: '20px' }}>
              <Button disabled={selectedIds.length === 0}>恢复</Button>
              <Button onClick={() => batchDeleteQuestion()} disabled={selectedIds.length === 0}>
                批量删除
              </Button>
            </Space>
          </>
        )}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
}

export default Trash;
