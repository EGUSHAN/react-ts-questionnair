import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { resetPageInfo } from '../../../store/pageInfoReducer';

function PageSetting() {
  const dispatch = useDispatch();

  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [form, pageInfo]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input.TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <Input.TextArea placeholder="请输入样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <Input.TextArea placeholder="请输入脚本代码" />
      </Form.Item>
    </Form>
  );
}

export default PageSetting;
