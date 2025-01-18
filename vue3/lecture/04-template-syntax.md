# 템플릿 문법 (Template Syntax)

Vue는 템플릿 문법을 사용하여 렌더링된 DOM을 컴포넌트의 인스턴스 데이터에 선언적으로 바인딩할 수 있습니다.

## 텍스트 보간법

---

데이터 바인딩의 가장 기본형태는 `{{ data }}`(이중 중괄호, 콧수염 괄호)를 사용하는 것입니다. 

- 이중 중괄호를 사용하면 해당 문법은 컴포넌트 인스턴스의 `message` 값으로 대체됩니다.
- `message` 속성이 변경될 때 마다 갱신(반응)됩니다.

```
<template>
	<div>
		<p>문자열 : {{ message }}</p>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const message = ref('안녕하세요');
		return {
			message,
		};
	},
};
</script>

<style lang="scss" scoped></style>
```

`v-once` 디렉티브를 사용하여 데이터가 변경되어도 갱신(반응)되지 않는 일회성 보간을 수행할 수 있습니다.
```
<p v-once>문자열: {{ message }} </p>
```


## HTML (v-html)

---

이중 중괄호는 데이터를 HTML이 아닌 일반 텍스트로 해석합니다. 실제 HTML을 출력하려면 `v-html` 디렉티브를 사용해야 합니다.
```
<h2>텍스트: {{ rawHtml }}</h2>
<h2>v-html: <span v-html="rawHtml"></span></h2>
```

> TIP

>웹사이트에서 임의의 HTML을 동적으로 렌더링하면 XSS 취약점 (opens new window)
>(https://en.wikipedia.org/wiki/Cross-site_scripting)으로 쉽게 이어질 수 있고 이는 매우 위험할 소지가 있습니다. HTML >보간법은 반드시 신뢰할 수 있는 콘텐츠에서만 사용하고 사용자가 제공한 콘텐츠에서는 절대 사용하면 안 됩니다.


## 속성 바인딩 (v-bind)

---

이중 중괄호는 HTML 속성에 사용할 수 없습니다. 대신 [**`v-bind` 디렉티브**](https://v3.ko.vuejs.org/api/#v-bind)를 사용하세요.
```
<div v-bind:title="dynamicTitle">마우스를 올려보세요.</div>
```

`Boolean` 속성 은 속성 존재 자체가 참(true), 거짓(false)을 의미하는 속성입니다.
```
<input type="text" v-bind:disabled="isInputDisabled" />
```

### 단축 표현

`v-bind`는 매우 자주 사용하기 때문에 단축 문법이 있습니다.
```
<div :title="dynamicTitle">마우스를 올려보세요.</div>
<input type="text" :disabled="isInputDisabled" />
```

`:` 을 사용하여 속성을 바인딩할 수 있습니다. 

### 다중 속성 바인딩

객여러 여러 속성을 한번에 바인딩할 수 있습니다.
```
const attrs = {
	id: 'password-id',
	type: 'password',
	placeholder: '비밀번호를 입력해주세요'
}
```

`v-bind`를 인수 없이 사용하여 단일 요소에 바인딩할 수 있습니다.
```
<input v-bind="attrs" />
```

## JavaScript 표현식 사용

Vue에서는 모든 데이터 바인딩 내에서 JavaScript 표현식이 가능합니다.
```
{{ isInputDisabled ? '예' : '아니오' }}
{{ message.split('').reverse().join('') }}
<input type="text" :placeholder="`입력해주세요 ${isInputDisabled}`" />
```

함수도 호출할 수 있습니다.
```
<div>{{ toDay() }}</div>
```