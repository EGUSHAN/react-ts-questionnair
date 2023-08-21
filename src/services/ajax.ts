import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  timeout: 10 * 1000,
});

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
