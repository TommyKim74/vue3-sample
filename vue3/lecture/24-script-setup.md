# <script setup>


## **<script setup>**

`<script setup>`은 Single-File Component 내에서 Composition API를 사용하기 위한 **syntactic sugar(문법적 설탕)** 입니다.

SFC와 Composition API를 사용하는 경우 `<script setup>`을 [사용하는 것을 권장](https://vuejs.org/api/sfc-script-setup.html#basic-syntax)드립니다. 왜냐하면 일반 `<script>`구문보다 많은 장점을 제공합니다.

- 간결한 문법으로 상용구(boilerplate)를 줄일 수 있음
- 타입스크립트를 사용한 props와 emits 선언 가능 ([공식문서](https://vuejs.org/api/sfc-script-setup.html#typescript-only-features))
- 런타임 성능의 향상(템플릿이 setup 스크립트와 같은 스코프(scope)에 있는 [render 함수](https://v3.vuejs.org/guide/render-function.html)로 컴파일되므로 프록시가 필요없음)
- 더 뛰어난 IDE 타입 추론 성능 (language 서버가 코드로부터 타입을 추론해내는 데 비용이 덜 든다)

<aside>
💡 syntactic sugar는 기능은 그대로인데 읽는 사람을 위해 직관적으로 쉽게 코드를 읽을 수 있게 만든다는 것입니다.
</aside>


## 기본 문법

`<script>` 블록에 `setup` 속성을 추가해서 시작할 수 있습니다.
```
<script setup>
</script>
```
내부 코드는 컴포넌트의 `setup()` 함수 안의 코드로 컴파일 됩니다.

컴포넌트를 처음 가져올 때 한 번만 실행되는 `일반 <script>`와 달리, `<script setup>`는 컴포넌트의 인스턴스가 생성될 때마다 `<script setup>`내부 코드가 실행됩니다.

### Top-level에 선언

`<script setup>` 내부 최 상위에 선언된 변수, 함수, import 는 `<template>`에서 직접 사용할 수 있습니다.
```
<script setup>
const msg = 'Hello!'

function log() {
  console.log(msg)
}
</script>

<template>
  <div @click="log">{{ msg }}</div>
	<HelloComponent></HelloComponent>
</template>
```

import 된 자원(Component, Utils 등)도 동일한 방식으로 <template>에서 직접 사용할 수 있습니다.
```
<script setup>
import HelloComponent from './components/HelloComponent.vue'

</script>

<template>
	<HelloComponent></HelloComponent>
</template>
```

## Reactivity

[Reactivity APIs](https://vuejs.org/api/reactivity-core.html)(ref, reactive, computed, watch 등) 를 `<script setup>` 안에서 생성하면 `<template>`에서 직접적으로 사용가능 합니다.
```
<template>
	<p>{{ message }}</p>
</template>
<script setup>
import { ref } from 'vue';

const message = ref('Hello World!');
</script>
```

## defineProps() & defineEmits()

`defineProps()`와 `defineEmits()` APIs를 `<script setup>` 내에 선언하여 `props`와 `emits`을 사용할 수 있습니다.
```
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
</script>
```
- `defineProps`와 `defineEmits`는 `<script setup>`내부에서만 사용할 수 있는 컴파일러 매크로 입니다. 그렇기 때문에 `import`할 필요가 없으면 `<script setup>`이 처리될 때 컴파일 됩니다.
- `defineProps`는 `props`옵션과 동일한 값을 허용합니다. 그리고 `defineEmits`는 `emits`옵션과 동일한 값을 허용합니다.
- `defineProps`와 `defineEmits`는 전달된 옵션을 기반으로 타입 추론을 제공합니다.
- `defineProps`와 `defineEmits`에 전달된 옵션은 `setup()`에서 `모듈 영역(module scope)`으로 호이스트됩니다. 따라서 옵션은 `setup()` 영역에 선언된 지역 변수를 참조할 수 없습니다. 만약 그렇게 하면 컴파일 오류가 발생합니다.
하지만 `import` 된 옵션은 사용할 수 있습니다. 왜냐하면 `import`도 모듈 영역으로 호이스트 되기 때문입니다.

## **defineExpose()**

`<script setup>`을 사용하는 컴포넌트는 기본적으로 **Template Refs**나 **$parent**와 같이 컴포넌트간 통신이 닫혀 있습니다.

`<script setup>`을 사용하는 컴포넌트의 내부 데이터나 메서드를 명시적으로 노출하려면 `defineExpose()` 컴파일러 매크로를 사용할 수 있습니다.
```
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

expose는 일반 <script>에서도 사용할 수 있습니다.
```
export default {
  setup(props, context) {
    // Expose public properties (Function)
    console.log(context.expose)
  }
}
```

## useSlots() & useAttrs()

---

`slots`과 `attrs`는 `<template>` 내부에서 `$slots`와 `$attrs`로 직접 접근해서 사용할 수 있습니다. 만약 `<script setup>` 내부에서 slots과 attrs를 사용하고 싶다면 각각 `useSlots()`, `useAttrs()` helper 메서드를 사용할 수 있습니다.
```
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs() // fallthrough 속성 접근하기
</script>
```

`slots`과 `attrs` 는 일반 `<script>`에서도 사용할 수 있습니다.
```
export default {
  setup(props, context) {
    // Attributes (Non-reactive object, equivalent to $attrs)
    console.log(context.attrs)

    // Slots (Non-reactive object, equivalent to $slots)
    console.log(context.slots)
  }
}
```

## `<script>`와 `<script setup>` 함께 사용

---

`<script setup>` 은 `normal <script>` 와 함께 사용할 수 있습니다. 예를 들면 다음과 같은 경우에 `normal <script>`가 필요할 수 있습니다.

- 예를 들어 `<script setup>`에서 표현할 수 없는 inheritAttrs옵션이나 Plugin을 통해 활성화된 Custom 옵션을 사용하고자 할때 `normal <script>`를 함께 선언합니다.
- `named export`를 선언 했을 때 (예: `export const data`)
- 한 번만 실행되어야 하는 로직이 있을 때
```
<script>
// 일반 스크립트, 모듈 범위에서 한 번만 실행
runSideEffectOnce()

// 옵션 선언
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// 각 인스턴스 생성시 setup() 범위에서 실행
</script>
```

## Top-level `await`

---

`<script setup>` 내의 Top-level에서 `await`을 사용할 수 있습니다. 그리고 코드는 `async setup()` 이렇게 컴파일 됩니다.
```
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

## `vue/setup-compiler-macros`

---

`defineProps` 및 `defineEmits`와 같은 컴파일러 매크로는 `un-undef` 경고를 생성합니다.

ESLint config 파일에서 컴파일러 매크로 환경을 활성화해야 합니다. 이러한 변수를 전역적으로 노출하지 않으려면 /* 전역 defineProps, defineEmits */를 대신 사용할 수 있습니다.
