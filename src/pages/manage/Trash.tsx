import React, { useState } from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty, Table, Space, Button, Tag, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import { QuestionInter } from '../../interface';

const { Title } = Typography;
const { confirm } = Modal;

const rawQuestionList: QuestionInter[] = [
  {
    id: 0,
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '4月15日 13:23',
  },
];

function Trash() {
  useTitle('回收站');

  const [questionList, setQuestionList] = useState<QuestionInter[]>(rawQuestionList);

  const deleteQuestion = (id: number) => {
    setQuestionList(questionList.filter((i) => i.id !== id));
  };

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const columns: ColumnsType<QuestionInter> = [
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
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button disabled={selectedIds.length === 0}>恢复</Button>
          <Button type="text" size="small" onClick={() => deleteQuestion(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const batchDeleteQuestion = () => {
    confirm({
      title: '确定批量删除',
      content: '删除以后无法找回',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        setQuestionList(questionList.filter((i) => !selectedIds.includes(i.id)));
        setSelectedIds([]);
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && (
          <>
            <Table
              dataSource={questionList}
              columns={columns}
              pagination={false}
              rowKey={(q) => q.id}
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys: React.Key[], selectedRows: QuestionInter[]) => {
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
      <div className={styles.footer}>分页</div>
    </>
  );
}

export default Trash;
