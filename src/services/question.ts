import axios from './ajax';
import { FilterInter, ListInter, QuestionInter } from '../interface';

// 获取单个问卷信息
export function getQuestionService(id: number | string): Promise<QuestionInter> {
  const url = `/api/question/${id}`;
  return axios.get(url);
}

// 创建问卷
export function createQuestionService(): Promise<Pick<QuestionInter, 'id'>> {
  const url = '/api/question';
  return axios.post(url);
}

export function getQuestionListService(
  params?: Partial<FilterInter>,
): Promise<ListInter<QuestionInter>> {
  return axios.get('/api/question', {
    params,
  });
}

export function updateQuestionService(
  id: number | string,
  data: Partial<QuestionInter>,
): Promise<QuestionInter> {
  return axios.patch(`/api/question/${id}`, data);
}

export function duplicateQuestionService(id: string | number): Promise<QuestionInter> {
  return axios.post(`/api/question/duplicate/${id}`);
}

export function deleteQuestionsService(ids: string[] | number[]): Promise<string[]> {
  return axios.delete('/api/question', {
    data: {
      ids,
    },
  });
}

export default {
  getQuestionService,
  createQuestionService,
  getQuestionListService,
  updateQuestionService,
};
