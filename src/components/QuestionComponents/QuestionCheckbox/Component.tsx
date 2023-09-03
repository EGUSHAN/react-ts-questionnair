import React from 'react';
import { Typography, Space, Checkbox } from 'antd';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';

const { Paragraph } = Typography;

function Component(props: QuestionCheckboxPropsType) {
  const { title, isVertical, list } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox value={value} key={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
}

export default Component;
