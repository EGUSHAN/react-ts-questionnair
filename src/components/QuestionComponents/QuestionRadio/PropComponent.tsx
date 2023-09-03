import React, { useEffect } from 'react';
import { Checkbox, Form, Input, Select, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { QuestionRadioPropsType, OptionType } from './interface';

function PropComponent(props: QuestionRadioPropsType) {
  const { title, isVertical, value, options, onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionRadioPropsType;
      const { options: opsList = [] } = newValues;
      opsList.forEach((opt: OptionType) => {
        if (opt.value) return;
        opt.value = nanoid(5);
      });
      onChange({
        ...newValues,
        options: opsList.filter((opt) => opt.text !== null),
      });
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    });
  }, [title, isVertical, options, value, form]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { options: optionList = [] } = form.getFieldsValue();
                            let num = 0;
                            optionList.forEach((opt: OptionType) => {
                              if (opt.text === text) {
                                num += 1;
                              }
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('和其他选项重复'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字" />
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', text: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ text, value: val }) => ({ value: val, label: text || '' }))}
        />
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
