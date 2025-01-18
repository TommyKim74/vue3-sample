<template>
    <div class="popup">
      <!-- 상단 헤더 -->
      <header v-if="$slots.header" class="popup-header">
        <slot name="header"></slot>
      </header>
  
      <!-- 검색 필터 -->
      <section v-if="$slots.filter" class="popup-filter">
        <slot name="filter"></slot>
      </section>
  
      <!-- 데이터 조회 영역 -->
      <div class="popup-content">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>나이</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredData" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- 검색 버튼 -->
      <footer class="popup-footer">
        <button @click="fetchData">검색</button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    searchCondition: {
      type: Object,
      required: true
    }
  });
  
  // 검색 결과 데이터
  const data = ref([]);
  
  // 계산된 속성으로 필터링 된 데이터 반환
  const filteredData = computed(() => {
    return data.value.filter(item => {
      return item.name.includes(props.searchCondition.name) &&
             item.age === props.searchCondition.age &&
             item.address.includes(props.searchCondition.address);
    });
  });
  
  // 검색 버튼 클릭 시 데이터 조회 함수
  const fetchData = async () => {
    try {
      // 여기서 API 호출을 하고 data에 결과를 할당합니다.
      const response = await fetch('https://api.example.com/data');
      data.value = await response.json();
    } catch (error) {
      console.error('데이터 조회 중 오류 발생:', error);
    }
  };
  </script>
  
  <style scoped>
  .popup {
    border: 1px solid #ccc;
    padding: 20px;
  }
  
  .popup-header, .popup-filter, .popup-content, .popup-footer {
    margin-bottom: 10px;
  }
  </style>