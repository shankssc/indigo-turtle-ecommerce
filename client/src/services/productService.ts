import axios from 'axios';
import urls from '../config';
import type { Product } from '../types';

const instance = axios.create({
  baseURL: urls.SERVER_URL_FINAL, // TODO: add it in env variables
  withCredentials: true,
});

const getAll = async (): Promise<Product[]> => {
  const { data } = await instance.get<Product[]>('/products');
  return data;
};

export default { getAll };
