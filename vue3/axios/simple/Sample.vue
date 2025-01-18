<template>
    <div>
      <input v-model="searchQuery" @keyup.enter="fetchData" placeholder="검색어를 입력하세요." />
      <button @click="fetchData">검색</button>
      <ul v-if="searchResults.length">
        <li v-for="item in searchResults" :key="item.id">{{ item.name }}</li>
      </ul>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
      <div>
        <input v-model="newData.name" placeholder="이름을 입력하세요." />
        <button @click="storeData">저장</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useDataHandler } from './useDataHandler';
  
  const searchQuery = ref('');
  const { searchResults, errorMessage, fetchData, storeData } = useDataHandler();
  
  const newData = ref({
    name: '',
  });
  
  async function handleSave() {
    await storeData(newData.value);
    newData.value.name = '';
  }
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>