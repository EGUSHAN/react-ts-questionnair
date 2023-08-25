import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getQuestionService } from '../services/question';
import { changeSelectedId, resetComponents } from '../store/componentsReducer';

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
    const { componentList = [] } = data;
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
      dispatch(changeSelectedId(selectedId));
    }
    dispatch(resetComponents({ componentList }));
  }, [data, dispatch]);

  useEffect(() => {
    run();
  }, [qid, run]);

  return {
    loading,
    error,
  };
}
