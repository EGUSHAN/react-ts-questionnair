import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

enum TabKeysEnum {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

function RightPanel() {
  const { selectedId } = useGetComponentInfo();

  const [activeKey, setActiveKey] = useState<TabKeysEnum>(TabKeysEnum.PROP_KEY);

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TabKeysEnum.PROP_KEY);
    } else {
      setActiveKey(TabKeysEnum.SETTING_KEY);
    }
  }, [selectedId]);

  const tabsItems = [
    {
      key: TabKeysEnum.PROP_KEY,
      label: (
        <span>
          <DatabaseOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TabKeysEnum.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs items={tabsItems} activeKey={activeKey} />;
}

export default RightPanel;
