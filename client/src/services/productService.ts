import axios from 'axios';
import {SERVER_URL_FINAL} from '../config';
import type { Product } from '../types';

const instance = axios.create({
  baseURL: SERVER_URL_FINAL, // TODO: add it in env variables
  withCredentials: true,
});

const getAll = async (): Promise<Product[]> => {
  const { data } = await instance.get<Product[]>('/products');
  return data;
};

const getById = async (id: number): Promise<Product> => {
  const { data } = await instance.get<Product>(`/products/${id}`);
  return data;
};

export default { getAll, getById };
