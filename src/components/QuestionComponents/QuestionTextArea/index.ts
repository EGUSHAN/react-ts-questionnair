import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTextAreaDefaultProps } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextAreaDefaultProps,
};
