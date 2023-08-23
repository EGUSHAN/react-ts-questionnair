import { useSelector } from 'react-redux';
import { StoreType } from '../store';
import { UserStateType } from '../store/userReducer';

function useGetUserInfo() {
  const { username, nickname } = useSelector<StoreType>((state) => state.user) as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
