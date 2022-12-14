import axios from 'axios';

const BASE_URL = 'https://pre-onboarding-selection-task.shop';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postSignUpApi = async (body) => {
  const response = await api.post(`/auth/signup`, body);
  return response;
};

export const postLoginApi = async (body) => {
  const response = await api.post(`/auth/signin`, body);
  return response;
};

export default api;
