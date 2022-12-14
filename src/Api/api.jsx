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

export const postCreateTodoApi = async (body, access_token) => {
  const response = await api.post(`/todos`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

export const getTodosApi = async (access_token) => {
  const response = await api.get(`/todos`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

export const updateTodoApi = async (id, body, access_token) => {
  const response = await api.put(`/todos/${id}`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

export const deleteTodoApi = async (id, access_token) => {
  const response = await api.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

export default api;
