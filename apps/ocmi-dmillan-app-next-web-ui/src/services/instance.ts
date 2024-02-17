import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { RequestBodys } from '../types/RequestBodys';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let token: string;

instance.interceptors.request.use(
  //@ts-ignore
  function (config) {
    if (Cookies.get('token')) {
      token = String(Cookies.get('token'));
    }
    return {
      ...config,
      headers: {
        authorization: token && token !== '' ? `Bearer ${token}` : null,
      },
    };
  },
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove('token');
    }
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) =>
  response ? response.data : response;

const fetch = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: RequestBodys) =>
    instance.post(url, body.data).then(responseBody),
  put: (url: string, body: RequestBodys) =>
    instance.put(url, body.data).then(responseBody),
  patch: (url: string, body: RequestBodys) =>
    instance.patch(url, body.data).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export default fetch;
