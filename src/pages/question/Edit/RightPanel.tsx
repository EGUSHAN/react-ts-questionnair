import React from 'react';
import { Tabs } from 'antd';
import { SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';

function RightPanel() {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <DatabaseOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ];

  return <Tabs items={tabsItems} defaultActiveKey="prop" />;
}

export default RightPanel;
