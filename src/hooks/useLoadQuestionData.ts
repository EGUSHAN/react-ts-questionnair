import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getQuestionService } from '../services/question';
import { changeSelectedId, resetComponents } from '../store/componentsReducer';
import { resetPageInfo } from '../store/pageInfoReducer';

export default function useLoadQuestionData(qid: string) {
  const dispatch = useDispatch();

  async function fn() {
    if (!qid) throw new Error('没有问卷id');
    return getQuestionService(qid);
  }

  const { loading, data, error, run } = useRequest(fn, {
    manual: true,
  });

  useEffect(() => {
    if (!data) return;
    const { title, desc = '', css = '', js = '', componentList = [] } = data;
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
      dispatch(changeSelectedId(selectedId));
    }
    dispatch(resetComponents({ componentList }));

    dispatch(
      resetPageInfo({
        title,
        desc,
        css,
        js,
      }),
    );
  }, [data, dispatch]);

  useEffect(() => {
    run();
  }, [qid, run]);

  return {
    loading,
    error,
  };
}
