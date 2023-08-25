import React from 'react';
import { Typography } from 'antd';
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface';

const { Title } = Typography;

function QuestionTitle(props: QuestionTitlePropsType) {
  const { text = '', isCenter = false, level = 1 } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (levelNo: number) => {
    if (levelNo === 1) return '24px';
    if (levelNo === 2) return '20px';
    if (levelNo === 3) return '16px';
    return '16px';
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
}

export default QuestionTitle;
