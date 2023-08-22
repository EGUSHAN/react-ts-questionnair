import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../services/question';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from '../constant';
import { ListInter, QuestionInter, FilterInter } from '../interface';

export default function useLoadQuestionListData(opt?: Partial<Omit<FilterInter, 'keyword'>>) {
  const [searchParams] = useSearchParams();

  const { isStar, isDeleted } = opt || {};

  function load(): Promise<ListInter<QuestionInter>> {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) ?? '';
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) ?? '', 10) || 1;
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) ?? '', 10) || 10;
    return getQuestionListService({ keyword, isDeleted, isStar, page, pageSize });
  }

  const { loading, data, refresh } = useRequest(load, {
    refreshDeps: [searchParams], // 刷新的依赖项
  });
  return {
    loading,
    data,
    refresh,
  };
}
