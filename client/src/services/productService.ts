import axios from 'axios';
import { SERVER_URL } from '../config';
import type { Product } from '../types';

const instance = axios.create({
  baseURL: SERVER_URL, // TODO: add it in env variables
  withCredentials: true,
});

const getAll = async (): Promise<Product[]> => {
  const { data } = await instance.get<Product[]>('/products');
  return data;
};

export default { getAll };
