import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '../router';

function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (waitingUserData) return;
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }
    if (!isNoNeedUserInfo(pathname)) {
      nav(LOGIN_PATHNAME);
    }
  }, [username, pathname, waitingUserData, nav]);
}

export default useNavPage;
