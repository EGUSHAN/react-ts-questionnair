import React from 'react';
import { Typography, Input } from 'antd';
import { QuestionTextAreaPropsType, QuestionTextAreaDefaultProps } from './interface';

const { Paragraph } = Typography;

function QuestionTextArea(props: QuestionTextAreaPropsType) {
  const { title = '', placeholder = '' } = { ...QuestionTextAreaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Input.TextArea placeholder={placeholder} />
    </div>
  );
}

export default QuestionTextArea;
