<!-- Parent.vue -->
<template>
    <InputEmail
        placeholder="이메일주소"
        v-model:email="email"
        v-model:emailChk="emailChk"
    />
</template>
<script setup>
import InputEmail from '@/component/InputEmail.vue'
const email = ref(''); // 이메일 값
const emailChk = ref(false); // 이메일 유효성 검사 결과
</script>