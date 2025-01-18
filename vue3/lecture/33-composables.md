# Composables


## Composable 이란?

Vue 애플리케이션에서 **“Composable”**은 **Vue Composition API를 활용하여 상태 저장 비즈니스 로직을 캡슐화 하고 재사용하는 기능**을 말합니다.

프론트엔드 애플리케이션을 구축할 때 일반적인 로직을 재사용해야 하는 경우가 종종 있습니다. 예를 들어 여러 곳에서 날짜 형식을 지정해야 한다면 우리는 이러한 로직을 재사용 하기 위해서 함수(모듈)로 추출합니다. 이러한 함수는 **상태 비저장 로직을 캡슐화** 한 것입니다. 간단한 Input/Output만 있는 구조 입니다. 이러한 상태 비저장 로직를 재사용하기 위한 많은 라이브러리가 있으며, 예를 들어 **lodash**, **dayjs**와 같은 것들이 있습니다.

하지만 상태 저장 로직은 사용하면서 변경되는 상태 관리가 포함됩니다. 간단한 예는 페이지에서 마우스의 현재 위치를 추적하는 것입니다.

## 마우스 추적 기능 예시

컴포넌트 안에서 직접 Composition API를 사용하여 마우스 추적 기능을 구현하면 다음과 같이 됩니다.
```
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);

function update(event) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => window.addEventListener('mousemove', update));
onUnmounted(() => window.removeEventListener('mousemove', update));
</script>

<template>마우스 위치: {{ x }}, {{ y }}</template>
```

그러나 여러 컴포넌트에서 동일한 로직을 재사용하려면 어떻게 해야 할까요? Composable 함수로 로직을 외부파일로 추출할 수 있습니다.
```
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue';

// Composable 함수명은 'use'로 시작하는게 규칙입니다.
export function useMouse() {
  // Composable에 의해 캡슐화되고 관리되는 상태입니다.
  const x = ref(0);
  const y = ref(0);

  // 상태를 업데이트합니다.
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // Composable은 사용중인 컴포넌트 hook 또한 사용할 수 있습니다.
  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  // 관리 상태를 반환합니다.
  // 상태값는 ref이며 만약 외부에서 해당값을 변경하면 내부의 값도 동기화되어 변경됩니다.
  return { x, y };
}
```

그리고 이러한 Composable 함수는 컴포넌트에서 아래와 같이 사용될 수 있습니다.
```
<script setup>
import { useMouse } from './composables/mouse.js';

const { x, y } = useMouse();
</script>

<template>마우스 위치: {{ x }}, {{ y }}</template>
```

위 예시에서 볼 수 있듯이 핵심 로직은 그대로 유지됩니다. 우리가 해야 할 일은 **핵심 로직을 외부 함수로 추출**하고 컴포넌트에 **노출되어야 하는 상태를 반환**하는 것입니다.

Composable 함수에서는 컴포넌트에서 내부에서 구현 했던것과 마찬가지로 Composable 함수 전체 범위에서 Composition API 기능을 사용할 수 있습니다. 이제 모든 컴포넌트에서 `useMouse()` 기능을 사용할 수 있습니다.

그리고 Composable의 장점은 이러한 **Composable 함수를 중첩**해서 사용할 수 있다는 것입니다. 하나의 Composable 함수는 하나 이상의 다른 Composable 함수를 호출할 수 있습니다. 이를 통해 우리는 작은 로직의 단위를 사용하여 복잡한 로직을 구성할 수 있습니다. 이것은 마치 컴포넌트를 사용하여 전체 애플리케이션을 구성하는 것과 유사합니다. 이렇게 **재사용 로직 단위로 가능하기 때문에 이름이 Composition API** 입니다.
```
// event.js
import { onMounted, onUnmounted } from 'vue';

// 특정 DOM에 이벤트를 등록하는 기능도 Composable 함수로 만들 수 있습니다.
export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
```

`useMouse()` 를 사용하여 로직을 단순화 할 수 있습니다.
```
import { ref } from 'vue';
import { useEventListener } from './event';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return { x, y };
}
```

<aside>
💡 각 컴포넌트 인스턴스에서 useMouse() 호출하면 컴포넌트는 서로 간섭하지 않도록 x, y 상태를 복사하여 생성됩니다. 만약에 컴포넌트간의 상태를 공유하려면 상태관리 API(Vuex, Pinia)를 사용할 수 있습니다.
</aside>


## 비동기 상태 예

`useMouse()` Composable 함수는 파라미터를 사용하지 않았음으로 파라미터를 사용하는 다른 예를 살펴보겠습니다. 비동기 데이터를 가져올 때 성공, 실패 등 다양한 상태를 처리해야 하는 경우가 많습니다.
```
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const data = ref(null);
const error = ref(null);

onMounted(() => {
  axios
    .get(`https://reqres.in/api/users?page=1`)
    .then((response) => (data.value = response.data.data))
    .catch((err) => (error.value = err));
});
</script>

<template>
  <div v-if="error">에러 발생!: {{ error.messsage }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.email }}
      </li>
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>
```

위에서 언급했던 것처럼 데이터를 가져와야 하는 이러한 로직을 반복해서 사용하는 것은 매우 불편할 것입니다. Composable 함수로 추출해 보겠습니다.
```
// fetch.js
import axios from 'axios';
import { ref } from 'vue';

export const useFetch = (url) => {
  const data = ref(null);
  const error = ref(null);

  axios
    .get(url)
    .then((response) => (data.value = response.data.data))
    .catch((err) => (error.value = err));

  return {
    data,
    error,
  };
};
```

이제 컴포넌트에서 가져올 수 있습니다.
```
<script setup>
import { useFetch } from './composables/fetch';

const { data, error } = useFetch('https://reqres.in/api/users?page=1');
</script>

<template>
  <div v-if="error">에러 발생!: {{ error.messsage }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.email }}
      </li>
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>
```

`useFetch()` Composable 함수는 URL 문자열(string)으로 고정된 데이터를 조회하고 완료됩니다. 다음과 같은 기능을 추가해 보도록 하겠습니다.

- URL이 변경될 때마다 이를 감지(Watch)하여 데이터를 다시 조회함
```
import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

export const useFetch = (url) => {
  const data = ref(null);
  const error = ref(null);

  function doFetch() {
    data.value = null;
    error.value = null;
    axios
      .get(unref(url))
      .then((response) => (data.value = response.data.data))
      .catch((err) => (error.value = err));
  }
  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }

  return {
    data,
    error,
  };
};
```

컴포넌트는 다음과 같이 수정하였습니다.
```
<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useFetch } from './composables/fetch';
const page = ref(1);
const url = computed(() => 'https://reqres.in/api/users?page=' + page.value);
const { data, error } = useFetch(url);
</script>

<template>
  <div v-if="error">에러 발생!: {{ error.messsage }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.email }}
      </li>
    </ul>
    <button @click="page = 1">1</button>
    <button @click="page = 2">2</button>
  </div>
  <div v-else>Loading...</div>
</template>
```

## Conventions & Best Practices

### Naming Rule

Composable 함수는 “use”로 시작하는 cacelCase 이름으로 이름을 지정하는 것이 관례입니다.

### Input Arguments

Composable 함수는 반응성에 의존하지 않더라도 ref 파라미터를 입력값으로 받을 수 있습니다. 그렇기 때문에 다른 개발자와 함께 사용하는 Composable 함수를 개발하는 경우 입력 파라미터가 ref인 경우를 처리하는 것이 좋습니다. Utilities Function인 `unref()`를 사용하면 유용합니다.
```
import { unref } from 'vue'

function useFeature(maybeRef) {
	// 만약 mayRef가 실제로 ref라면, 그것의 .value가 반환될 것입니다.
	// 그렇지 않으면, mayRef는 있는 그대로 반환됩니다.
  const value = unref(maybeRef)
}
```

만약 입력이 ref 일 때 반응성 효과가 있는 Composable 함수를 생성하는 경우 `watch()`로 ref를 명시적으로 감시하는지 확인해야 합니다. 또는 `watchEffect()` 내부에서 `unref()`를 호출하여 제대로 추적되고 있는지 확인해야 합니다.

### Return Values

예시에서 보면 Composable 함수에서 `reactive()` 대신 `ref()`를 독점적으로 사용하고 있다는 것을 눈치채셨을 것입니다. Vue에서 권장되는 컨벤션(규칙)은 컴포넌트에서 구조분해 할당으로 재할당 받을 수 있도록 Composable 함수에서 ref 객체를 반환하는 것입니다.
```
// x와 y는 refs 객체입니다.
const { x, y } = useMouse()
```

Composable에서 `reactive` 객체를 반환하면 구조 분해 할당시 내부 상태에 대한 반응성 연결이 끊어지고 `refs`로 반환하면 해당 연결이 유지됩니다.

Composable에서 반환된 상태를 객체 속성으로 사용하려는 경우 반환된 객체를 reactive 랩핑 합니다.
```
const mouse = reactive(useMouse())
// mouse.x는 원본 참조에 연결되어 있습니다.
console.log(mouse.x)
```

### Other Working

Composable 함수에서 다른 작업(DOM 이벤트 리스너 추가 또는 데이터 가져오기)을 수행하는 것은 괜찮지만 다음 규칙에 주의하십시오.

- [**SSR(Server-Side Rendering)**](https://vuejs.org/guide/scaling-up/ssr.html)을 사용하는 애플리케이션에서 작업하는 경우 라이프사이클 훅이 마운트 이후인 곳에서 DOM관련 작업을 수행해야 합니다. (예: `onMounted()`. 이러한 훅은 브라우저에서만 호출되므로 내부 코드가 DOM에 액세스할 수 있는지 확인할 수 있습니다.)
- `onUnmounted()`에서 이벤트관련 리스터를 제거해야 합니다. (예: `useEventListener()`)

### 사용 제한

Composable 함수는 `<script setup>` 또는 `setup()` 훅 내에서 **동기적**으로 호출해야 합니다. 또는 경우에 따라 `onMounted()`와 같은 라이프사이클 훅에서 호출할 수도 있습니다.

