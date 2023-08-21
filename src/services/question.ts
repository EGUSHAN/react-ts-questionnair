import axios from './ajax';
import { FilterInter, ListInter, QuestionInter } from '../interface';

// 获取单个问卷信息
export function getQuestionService(id: string): Promise<QuestionInter> {
  const url = `/api/question/${id}`;
  return axios.get(url);
}

// 创建问卷
export function createQuestionService(): Promise<Pick<QuestionInter, 'id'>> {
  const url = '/api/question';
  return axios.post(url);
}

export function getQuestionListService(params?: FilterInter): Promise<ListInter<QuestionInter>> {
  return axios.get('/api/question', {
    params,
  });
}

export default {
  getQuestionService,
  createQuestionService,
  getQuestionListService,
};
