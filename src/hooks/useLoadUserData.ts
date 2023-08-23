import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import useGetUserInfo from './useGetUserInfo';
import { getUserInfoService } from '../services/user';
import { loginReducer } from '../store/userReducer';

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);

  const { username } = useGetUserInfo();

  const dispatch = useDispatch();

  const { run } = useRequest(
    () => {
      return getUserInfoService();
    },
    {
      manual: true,
      onSuccess(res) {
        const { username: userName, nickname: nickName } = res;
        dispatch(loginReducer({ username: userName, nickname: nickName ?? '' }));
      },
      onFinally() {
        setWaitingUserData(false);
      },
    },
  );

  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
    } else {
      run();
    }
  }, [username, run]);

  return {
    waitingUserData,
  };
}

export default useLoadUserData;
