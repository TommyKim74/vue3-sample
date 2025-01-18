# Template refs

Vue의 선언적 렌더링 모델은 대부분의 직접적인 DOM의 작업을 대신 수행합니다. 하지만 때론 기본 DOM요소에 직접 접근해야 하는 경우가 있을 수 있습니다. 이때 ref 특수 속성을 사용해서 쉽게 접근할 수 있습니다.
```
<input type="text" ref="input" />
```
`ref`는 특수 속성입니다. **이 `ref` 특수 속성을 통해 마운트된 DOM 요소 또는 자식 컴포넌트에 대한 참조를 얻을 수 있습니다.** 

## Refs 접근하기

Composition API로 참조를 얻으려면 동일한 이름의 참조를 선언해야 합니다.

- 컴포넌트가 마운트된 후에 접근할 수 있습니다.
- `<template>` 안에서 `input`으로 `Refs`참조에 접근하려는 경우 렌더링되기 전에는 참조가 `null`일 수 있습니다.
- `<template>` 안에서 `$refs` 내장 객체로 `Refs` 참조에 접근할 수 있습니다.
```
<template>
  <input ref="input" type="text" />
	<div>{{ input }}</div>
  <div>{{ $refs.input }}</div>
	<div>{{ input === $refs.input }}</div>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  components: {},
  setup() {
    const input = ref(null);

    onMounted(() => {
      input.value.value = 'Hello World!';
      input.value.focus();
    });
    return {
      input,
    };
  },
};
</script>
```

## `v-for` 내부 참조

> v3.2.25 이상에서 동작합니다.
> 

`v-for`내부에서 `ref`가 사용될 때 `ref`는 마운트 후 요소 배열로 채워집니다.
```
<script>
import { ref, onMounted } from 'vue'

export default {
	setup() {
		const list = ref([1, 2, 3])
		
		const itemRefs = ref([])
		
		onMounted(() => console.log(itemRefs.value))
		
		return {
			list,
			itemRefs
		}
	}
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

> ~~현재 v3.2.25 버전에서 버그가 확인됨.~~
> 
> 
> Template Refs는 v-for내부에서 동작하지 않음 [**vuejs/core#5525**](https://github.com/vuejs/core/issues/5525)
> 
> 해결방법 [demo1](https://stackblitz.com/edit/vue3-template-refs-with-function?file=src%2Fcomponents%2FMyList.vue) [demo2](https://stackblitz.com/edit/vue3-template-refs-with-ref-array?file=src/components/MyList.vue)
> 
> **현재 v3.2.31 버전에서 정상작동 확인함.**
> 

## Function Refs

`ref`속성에 문자열 키 대신 함수를 바인딩할 수도 있습니다.
```
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

## 컴포넌트 Refs

`ref`를 자식 컴포넌트에도 사용할 수 있습니다. `ref`로 자식 컴포넌트에 참조값을 얻게 되면 자식 컴포넌트의 모든 속성과 메서드에 대한 전체를 접근할 수 있습니다.

이러한 경우 부모/자식 컴포넌트간 의존도가 생기기 때문에 이러한 방법은 반드시 필요한 경우에만 사용해야 합니다. 그리고 일반적으로 `ref` 보다 표준 props를 사용하여 부모/자식간 상호작용을 구현해야 합니다.

자식 컴포넌트를 정의해 보겠습니다.
```
// Child.vue
<template>
  <div>Child Component</div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const message = ref('Hello Child!');
    const sayHello = () => {
      alert(message.value);
    };
    return {
      message,
      sayHello,
    };
  },
};
</script>
```

부모 컴포넌트에서 자식 컴포넌트의 상태나 메서드에 접근할 수 있습니다.
```
// Child.vue
<template>
  <button @click="child.sayHello()">child.sayHello()</button>
  <Child ref="child"></Child>
</template>

<script>
import { onMounted, ref } from 'vue';
import Child from './components/templateRefs/Child.vue';
export default {
  components: {
    Child,
  },
  setup() {
    const child = ref(null);
    onMounted(() => {
      console.log(child.value.message);
    });
    return { child };
  },
};
</script>
```

## $parent

자식 컴포넌트에서 상위 컴포넌트 참조하기 위해서는 `$parent` 내장객체를 사용할 수 있습니다.
```
<template>
  <div>Child Component</div>
  <div>{{ $parent.message }}</div>
</template>
```
