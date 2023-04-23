import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:${process.env.PORT}/`,
  });

export const getUser = async (userId: string) => {
    try {
      const response = await instance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

