import Component from './Component';

import { QuestionParagrapDefaulthProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagrapDefaulthProps,
};
