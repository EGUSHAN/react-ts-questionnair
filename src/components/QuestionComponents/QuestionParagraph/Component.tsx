import React from 'react';
import { Typography } from 'antd';
import { QuestionParagraphPropsType, QuestionParagrapDefaulthProps } from './interface';

const { Paragraph } = Typography;

function Component(props: QuestionParagraphPropsType) {
  const { text = '', isCenter = false } = { ...QuestionParagrapDefaulthProps, ...props };
  const textList = text.split('\n');

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {textList.map((str, index) => {
        return (
          <span key={str}>
            {index > 0 && <br />} {str}
          </span>
        );
      })}
    </Paragraph>
  );
}

export default Component;
