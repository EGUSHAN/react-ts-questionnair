import { useSelector } from 'react-redux';
import { StoreType } from '../store';
import { PageInfoType } from '../store/pageInfoReducer';

function useGetPageInfo() {
  return useSelector<StoreType>((state) => state.pageInfo) as PageInfoType;
}

export default useGetPageInfo;
