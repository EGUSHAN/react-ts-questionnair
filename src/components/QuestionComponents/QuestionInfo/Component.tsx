import React from 'react';

import { Typography } from 'antd';

import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface';

const { Title, Paragraph } = Typography;

function Component(props: QuestionInfoPropsType) {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props };

  const descList = desc.split('\n');

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descList.map((str, index) => {
          return (
            <span key={str}>
              {index > 0 && <br />} {str}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
}

export default Component;
