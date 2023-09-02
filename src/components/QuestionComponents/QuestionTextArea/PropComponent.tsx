import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

import { QuestionTextAreaDefaultProps, QuestionTextAreaPropsType } from './interface';

function PropComponent(props: QuestionTextAreaPropsType) {
  const {
    title = '',
    placeholder = '',
    onChange,
    disabled,
  } = { ...QuestionTextAreaDefaultProps, ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    });
  }, [title, placeholder, form]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
