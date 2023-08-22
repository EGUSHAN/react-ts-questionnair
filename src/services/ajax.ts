import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../utils/user-token';

const instance = axios.create({
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  async (err) => {
    await Promise.reject(err);
  },
);
// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(async (res) => {
  const resData = res?.data || {};
  const { errno = '', data = {}, msg = '' } = resData;

  if (errno !== 0) {
    await message.error(msg);
    throw new Error(msg);
  }
  return data;
});

export default instance;

export type ResType<T> = {
  errno: number;
  data: T;
  msg: string;
};
