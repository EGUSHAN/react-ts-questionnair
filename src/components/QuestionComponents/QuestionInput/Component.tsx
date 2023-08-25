import React from 'react';
import { Typography, Input } from 'antd';
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface';

const { Paragraph } = Typography;

function QuestionInput(props: QuestionInputPropsType) {
  const { title = '', placeholder = '' } = { ...QuestionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Input placeholder={placeholder} />
    </div>
  );
}

export default QuestionInput;
