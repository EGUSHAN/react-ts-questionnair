import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../services/question';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
import { ListInter, QuestionInter, FilterInter } from '../interface';

export default function useLoadQuestionListData(opt?: Omit<FilterInter, 'keyword'>) {
  const [searchParams] = useSearchParams();

  const { isStar, isDeleted } = opt || {};

  function load(): Promise<ListInter<QuestionInter>> {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) ?? '';
    return getQuestionListService({ keyword, isDeleted, isStar });
  }

  const { loading, data } = useRequest(load, {
    refreshDeps: [searchParams], // 刷新的依赖项
  });
  return {
    loading,
    data,
  };
}
