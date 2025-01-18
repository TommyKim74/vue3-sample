// useDataHandler.js

import { ref } from 'vue';
import axios from 'axios';

export function useDataHandler() {
  const searchResults = ref([]);
  const errorMessage = ref('');

  async function fetchData(query) {
    try {
      searchResults.value = [];
      errorMessage.value = '';
      const response = await axios.get('https://api.example.com/data', { params: { query } });
      searchResults.value = response.data;
    } catch (error) {
      errorMessage.value = error.message || '데이터 검색에 실패했습니다.';
    }
  }

  async function storeData(data) {
    try {
      const response = await axios.post('https://api.example.com/data', data);
      // Handle the response if necessary
      console.log('Data stored successfully:', response.data);
    } catch (error) {
      errorMessage.value = error.message || '데이터 저장에 실패했습니다.';
    }
  }

  return {
    searchResults,
    errorMessage,
    fetchData,
    storeData,
  };
}