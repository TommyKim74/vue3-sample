<!-- InputEmail.vue -->
<template>
	<div class="input-wrapper">
		<input
			type="text"
			class="input-email"
			:class="{ error: !emailChk && validChkBox }"
			:placeholder="placeholder"
			v-model="email"
		/>
	</div>
</template>
<script setup>
import { ref, defineModel } from 'vue';
const email = defineModel('email', {
	default: '',
});
const emailChk = defineModel('emailChk', {
	default: true,
});

defineProps({
	placeholder: {
		type: String,
		default: '이메일 주소 입력',
	},
	// ...생략
});
// 이하 생략
</script>

