import axios from './ajax';
import { UserInfoInter } from '../interface';

export function getUserInfoService(): Promise<UserInfoInter> {
  return axios.get('/api/user/info');
}

export function registerService(info: UserInfoInter) {
  return axios.post('/api/user/register', {
    ...info,
  });
}

export function loginService(
  info: Pick<UserInfoInter, 'username' | 'password'>,
): Promise<{ token: string }> {
  return axios.post('/api/user/login', {
    ...info,
  });
}

export default { getUserInfoService, registerService, loginService };
