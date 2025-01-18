// src/composables/useApi.js

import { ref } from 'vue';
import axios from 'axios';

const API_URL = 'https://api.example.com'; // 실제 API 주소로 변경

// 토큰 관련 상태 관리
const token = ref(null);
const refreshToken = ref(null);

// 토큰 갱신 함수
async function refreshTokens() {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken: refreshToken.value });
    token.value = response.data.token;
    refreshToken.value = response.data.refreshToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    // 토큰 갱신에 실패하면 로그아웃 등 처리
  }
}

// axios 인터셉터 설정
axios.interceptors.request.use(async config => {
  if (!token.value) {
    await refreshTokens();
  }
  config.headers['Authorization'] = `Bearer ${token.value}`;
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    await refreshTokens();
    originalRequest.headers['Authorization'] = `Bearer ${token.value}`;
    return axios(originalRequest);
  }

  return Promise.reject(error);
});

// 데이터 검색 함수
async function fetchData(query) {
  try {
    const response = await axios.get(`${API_URL}/data`, { params: query });
    return response.data;
  } catch (error) {
    console.error('데이터 검색 실패:', error);
    throw error;
  }
}

// 데이터 저장 함수
async function saveData(data) {
  try {
    const response = await axios.post(`${API_URL}/data`, data);
    return response.data;
  } catch (error) {
    console.error('데이터 저장 실패:', error);
    throw error;
  }
}

export { fetchData, saveData };