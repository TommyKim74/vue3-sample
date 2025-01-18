<template>
    <div>
      <h1>사용자 정보</h1>
      <p v-if="userInfo">이름: {{ userInfo.name }}</p>
      <p v-else>사용자가 없습니다.</p>
      <button @click="logout">로그아웃</button>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '../stores/user';
  
  const userStore = useUserStore();
  
  const logout = () => {
    userStore.clearUserInfo();
  };
  </script>
  
  <style scoped>
  /* 여기에 스타일을 추가할 수 있습니다. */
  </style>