# Composition API

이번 시간에는 우리가 앞으로 배울 컴포지션 API에 대해 큰 틀에서 살펴보도록 하겠습니다.

## Composition API

Composition API는 옵션(`data`, `methos`, `...`)을 선언하는 대신 가져온 함수(`ref`, `onMounted`, `...`)를 사용하여 Vue 컴포넌트를 작성할 수 있는 API 세트를 말합니다.

다음은 Composition API에서 각각의 API(`ref`, `onMounted`, `...`)들을 포괄하는 용어 입니다.

- **반응형 API** (**Reactivity API)**
    
    예를 들어 `ref()`, `reactive()`와 같은 API를 사용하여 `reactive state(반응 상태)`, `computed state(계산된 상태)`, `watchers(감시자)`와 같은 것들을 만들 수 있습니다. 
    
- [**라이프 사이클 훅**](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram) (**Lifecycle Hooks)**
    
    예를 들어 `onMounted()`, `onUnmounted()`와 같은 API를 사용하여 프로그래밍 방식으로 컴포넌트 라이프사이클에 접근할 수 있습니다.
    
    쉽게 말해서 라이프사이클 특정 시점에 이러한 함수로 코드를 삽입할 수 있습니다.
    
- **종속성 주입** (**Dependency Injection)**
    
    예를 들어 `provide()`와 `inject()`는 Reactivity API를 사용하는 동안 Vue의 의존성 주입 시스템을 활용할 수 있게 해줍니다.
    

[API Reference | Vue.js](https://vuejs.org/api/)

## 반응형 API (**Reactivity API)**

반응형 API는 말 그대로 반응하는 데이터와 관련된 API 세트라고 보시면 될 것 같습니다.

예를 들어 `ref()`, `isRef()`

```
<template>
	<div>
		<h2>반응형</h2>
		<p>{{ reactiveMessage }}</p>
		<button v-on:click="addReactiveMesssage">Add message</button>
		<h2>일반</h2>
		<p>{{ normalMessage }}</p>
		<button v-on:click="addNormalMesssage">Add message</button>
	</div>
</template>

<script>
import { isRef, onUpdated, ref } from 'vue';

export default {
	setup() {
		// 반응형 상태 선언
		const reactiveMessage = ref('Reactive Message');
		// 일반 변수 선언
		let normalMessage = 'Normal Message';

		console.log('isRef(reactiveMessage): ', isRef(reactiveMessage)); // true
		console.log('isRef(normalMessage): ', isRef(normalMessage)); // false

		const addReactiveMesssage = () => {
			reactiveMessage.value = reactiveMessage.value + '!';
		};
		const addNormalMesssage = () => {
			normalMessage = normalMessage + '!';
		};

		onUpdated(() => {
			console.log('update component');
		});

		return {
			reactiveMessage,
			normalMessage,
			addReactiveMesssage,
			addNormalMesssage,
		};
	},
};
</script>

<style lang="scss" scoped></style>
```

## 라이프 사이클 훅 (**Lifecycle Hooks)**

### 라이프 사이클

Vue 인스턴스나 컴포넌트가 생성될 때, 미리 사전에 정의된 몇 단계의 과정을 거치게 되는데 이를 **라이프사이클(Lifecycle)**이라 합니다.

쉽게 말해, Vue 인스턴스가 생성된 후 우리 눈에 보여지고, 사라지기까지의 단계를 말합니다.

- 라이프사이클 다이어그램
    
    ![lifecycle.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e313fbe3-c77d-4dfd-a0d1-b96c095eeacc/lifecycle.png)
    

Vue 인스턴스는 크게 생성(create)되고, DOM에 부착(mount)되고, 업데이트(update)되며, 없어지는(destroy) 4가지 과정을 거치게 됩니다.

`create` → `mount` → `update` → `destroy`

[Lifecycle Hooks | Vue.js](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

### 라이프사이클 훅

라이프사이클 단계에서 실행되는 함수를 라이프사이클 훅이라고 부른다.

[Composition API: Lifecycle Hooks | Vue.js](https://vuejs.org/api/composition-api-lifecycle.html)
