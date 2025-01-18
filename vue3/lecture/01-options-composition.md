Vue3에서 애플리케이션을 만들 수 있는 방법은 크게 두 가지가 있습니다. 하나는 Vue2에서 사용해왔던 Options API를 사용하는 방법과 다른 하나는 Vue3에서 새롭게 등장한 Composition API 입니다.

결론적으로 말씀 드리면 Vue2에서는 Options API의 단점을 보완하기 위해 Composition API 등장했으며, Vue3에서는 Composition API 권장하고 있기 때문에 제 수업에서는 Composition API를 기준으로 수업을 진행할 예정입니다.

이번 시간에는 Vue 프레임워크를 처음 경험하신 분들을 위하여 Options API가 어떻게 생겼고 또 Composition API와 어떻게 다른지 또 Composition API란 무엇인지 살펴보도록 하겠습니다.

## Options API vs Composition API 비교

OptionsAPI와 Composition API가 코드상으로 어떠게 다른지 간단히 살펴보도록 하겠습니다.

#### Options API

```
<template>
	<div>
		<button @click="increment">Counter: {{ counter }}</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			counter: 0,
		};
	},
	methods: {
		increment() {
			this.counter++;
		},
	},
	mounted() {
		console.log('애플리케이션이 마운트 되었습니다!');
	},
};
</script>

<style lang="scss" scoped></style>
```

#### Composition API

```
<template>
	<div>
		<button>Counter: {{ counter }}</button>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
	setup() {
		const counter = ref(0);

		const increment = () => counter.value++;

		onMounted(() => {
			console.log('애플리케이션이 마운트 되었습니다!');
		});

		return {
			counter,
			increment,
		};
	},
};
</script>

<style lang="scss" scoped></style>
```
- **Options API**는 `data`, `methods`, `mounted` 와 같은 옵션을 사용합니다.
- **Composition API**는 반응형 코드를 작성하는 단일 `setup` 함수가 있습니다.

## Composition API란?

Composition API는 옵션(`data`, `methods`, `...`)을 선언하는 대신 가져온 함수(`ref`, `onMounted`, `...`)를 사용하여 Vue 컴포넌트를 작성할 수 있는 API 세트를 말합니다.

- **Vue3 API Reference**


## [왜 Composition API인가?](https://vuejs.org/guide/extras/composition-api-faq.html#better-logic-reuse)

### Composition API 등장배경

아래 컴포넌트는 **Options API**로 작성되었습니다.

```
export default {
	data() {
		return {
			counter: 0,
			books: [],
		};
	},
	methods: {
		increment() {
			this.counter++;
		},
		addBook(title, author) {
      this.books.push({ title, author });
    },
	},
	computed: {
    firstBook() {
      return this.books[0];
    }
  }
	mounted() {
		console.log('애플리케이션이 마운트 되었습니다!');
	},
};
```

위 Options API 코드를 보면 동일한 논리적 관심사(book, counter)를 처리하는 코드가 파일의 다른 부분에 분산되어 있어 코드를 분석하기가 매우 힘듭니다. 만약 코드가 더 복합하고 길어질 경우 파일을 위아래로 스크롤해야 하기 때문에 더 이해하기 힘든 상황이 옵니다.

또한 특정 논리적 관심사 로직을 유틸로 추출하려는 경우 분산되어 있는 코드조각을 찾아 추출하는 데 상당한 작업이 필요합니다.

다음은 **Composition API**로 작성한 결과입니다.

```
<script setup>
import { onMounted, reactive, ref } from 'vue';

const counter = ref(0);
const increment = () => {
	counter.value++;
};

const books = reactive([]);
const addBook = (title, author) => {
	books.push({ title, author });
};

onMounted(() => {
	console.log('애플리케이션이 마운트 되었습니다!');
});
</script>
```

Composition API를 사용하면 동일한 논리적 관심사 코드가 그룹화 되어 코드를 분석하기도 쉽고 유지보수가 용이해집니다. 또한 논리적 관심사 코드어 외부 유틸 파일로 추출하기가 쉽습니다.

### 코드 재사용성

Composition API의 가장 큰 장점은 [**Composable 함수**](https://vuejs.org/guide/reusability/composables.html)의 형태로 로직의 재사용이 가능하다는 것입니다. Options API의 기본 로직 재사용 메커니즘인 Mixins의 모든 단점을 해결합니다.

Composition API의 재사용 기능은 계속해서 증가하는 구성 가능한 유틸리티 모음인 [**VueUse**](https://vueuse.org/)와 같은 인상적인 커뮤니티 프로젝트를 탄생시켰습니다. 또한 [**immutable data**](https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data), [**state machines**](https://vuejs.org/guide/extras/reactivity-in-depth.html#state-machines), [**RxJS**](https://vueuse.org/rxjs/readme.html#vueuse-rxjs)와 같은 상태 저장 타사 서비스 또는 라이브러리를 Vue의 **반응성 시스템(Reactivity system)**에 쉽게 통합하기 위한 깨끗한 메커니즘 역할을 합니다.

- **Compositions API는 Options API가 가지고 있던 2가지 주요 제한 사항을 해결합니다.**
    - **hook**를 사용하여 관련 **코드 조각을 함께 그룹화**합니다.
    - **Composables**을 사용하면 애플리케이션 전체에서 **코드를 매우 쉽게 재사용**할 수 있습니다.

### TypeScript

### **Smaller Production Bundle and Less Overhead**

## [Options API와 관계](https://vuejs.org/guide/extras/composition-api-faq.html#does-composition-api-cover-all-use-cases)

2022. 4. 19

### **Composition API로 기존 모든 사용 사례를 커버 가능?**

Composition API를 사용할 때 여전히 필요할 수 있는 몇 가지 옵션(`props`, `emits`, `name` 및 `inheritAttrs`)만 있습니다. `<script setup>`을 사용하는 경우 `inheritAttrs` 옵션만 필요할 수 있는 유일한 옵션입니다.

### 두 API를 함께 사용할 수 있습니까?

네. Options API 구성 요소의 `setup()` 옵션을 통해 Composition API를 사용할 수 있습니다.

그러나 기존 옵션 API 코드베이스가 있는 경우에만 그렇게 하는 것이 좋습니다. (예를 들어 Composition API로 작성된 외부 라이브러리와 통합해야 하는 경우)

### Options API가 deprecated 될 예정인가요?

아니요, 그렇게 할 계획이 없습니다. Options API는 Vue의 필수적인 부분이며 많은 개발자들이 Vue를 좋아하는 이유입니다. 또한 합성 API의 많은 이점은 대규모 프로젝트에서만 나타나고 옵션 API는 복잡도가 낮거나 중간인 많은 시나리오에 대한 확실한 선택으로 남아 있습니다.

## 참고

- Composition API FAQ
    
    [Composition API FAQ | Vue.js](https://vuejs.org/guide/extras/composition-api-faq.html#why-composition-api)
    
- Playground
    
    [Vue SFC Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2V0dXAoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHJlZignSGVsbG8gV29ybGQhJylcbiAgICBmdW5jdGlvbiByZXZlcnNlTWVzc2FnZSgpIHtcbiAgICAgIG1lc3NhZ2UudmFsdWUgPSBtZXNzYWdlLnZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJylcbiAgICB9XG4gICAgZnVuY3Rpb24gbm90aWZ5KCkge1xuICAgICAgYWxlcnQoJ25hdmlnYXRpb24gd2FzIHByZXZlbnRlZC4nKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbm90aWZ5LFxuICAgICAgcmV2ZXJzZU1lc3NhZ2UsXG4gICAgICBtZXNzYWdlXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDE+e3sgbWVzc2FnZSB9fTwvaDE+XG4gIDxidXR0b24gQGNsaWNrPVwicmV2ZXJzZU1lc3NhZ2VcIj5SZXZlcnNlIE1lc3NhZ2U8L2J1dHRvbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJtZXNzYWdlICs9ICchJ1wiPkFwcGVuZCBcIiFcIjwvYnV0dG9uPlxuICA8YSBocmVmPVwiaHR0cHM6Ly92dWVqcy5vcmdcIiBAY2xpY2sucHJldmVudD1cIm5vdGlmeVwiPlxuICAgIEEgbGluayB3aXRoIGUucHJldmVudERlZmF1bHQoKVxuICA8L2E+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG5idXR0b24sIGEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQXBwT3B0aW9uc0FQSS52dWUiOiIifQ==)
    
- API Examples
    
[Examples | Vue.js](https://vuejs.org/examples/#hello-world)
    
