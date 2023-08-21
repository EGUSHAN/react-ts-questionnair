import { useRequest } from 'ahooks';
import { getQuestionService } from '../services/question';

export default function useLoadQuestionData(qid: string) {
  async function fn() {
    return getQuestionService(qid);
  }

  const { loading, data, error } = useRequest(fn);

  return {
    loading,
    questionData: data,
    error,
  };
}
