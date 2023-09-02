import type { FC } from 'react';

import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';

export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType;
// 统一，组件配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  PropComponent: FC<ComponentPropsType>;
};

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
];

export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
];

export function getComponentConfByType(type: string): ComponentConfType | undefined {
  return componentConfList.find((c) => c.type === type);
}
