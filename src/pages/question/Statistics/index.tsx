import React from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import useLoadQuestionData from '@/hooks/useLoadQuestionData';

function Statistics() {
  const { id } = useParams();

  const { loading } = useLoadQuestionData(id as string);
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin />
      </div>
    );
  }

  return <div>Statistics</div>;
}

export default Statistics;
