import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants/index';

/**
 *
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

/**
 *
 * @param response
 * @returns
 */
const responseBody = (response: AxiosResponse) => response.data;

/**
 *
 */
export const request = {
  get: (url: string) => axiosInstance.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    axiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};
