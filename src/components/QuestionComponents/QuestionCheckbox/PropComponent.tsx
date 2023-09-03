import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { QuestionCheckboxPropsType, OptionType } from './interface';

function PropComponent(props: QuestionCheckboxPropsType) {
  const { title = '', isVertical = false, list = [], disabled = false, onChange } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;
      const { list: opsList = [] } = newValues;
      opsList.forEach((opt: OptionType) => {
        if (opt.value) return;
        opt.value = nanoid(5);
      });
      onChange({
        ...newValues,
        list: opsList.filter((opt) => opt.text !== null),
      });
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      list,
    });
  }, [title, isVertical, list, form]);

  return (
    <Form
      layout="vertical"
      form={form}
      disabled={disabled}
      initialValues={{
        title,
        isVertical,
        list,
      }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { list: optionList = [] } = form.getFieldsValue();
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
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', text: '', checked: false })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
