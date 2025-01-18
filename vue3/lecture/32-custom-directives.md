# Custom Directives


## Custom Directives

---

Vue 코어에서 기본으로 제공하는 디렉티브(`v-if` 또는 `v-for`와 같은) 외에도 Vue를 사용하면 직접 커스텀 지렉티브를 만들 수 있습니다.

Vue에서는 [Component](https://vuejs.org/guide/essentials/component-basics.html)와 [Composables](https://vuejs.org/guide/reusability/composables.html) 두 가지 형태의 코드 재사용을 도입했습니다. 컴포넌트는 주요 **빌딩블록을 재사용** 하는 반면 컴포저블은 **stateful logic을 재사용**하는 데 중점을 둡니다. 반면에 커스텀 디렉티브는 주로 일반 요소에 대한 **low-level(저수준) DOM 접근과 관련된 로직을 재사용**하기 위한 것입니다.

## <script setup> Directives

---

`<script setup>`에서 `v`접두사로 시작하는 모든 camelCase 변수를 커스텀 디렉티브로 사용할 수 있습니다. 아래 예에서 `vFocus`는 `<template>`에서 `v-focus`로 사용될 수 있습니다.
```
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

`v-focus` 디렉티브는 페이지 로드 시에만 작동하는 것이 아니라 Vue에서 동적으로 요소를 삽입할 때도 작동하기 때문에 `autofocus` 속성보다 더 유용합니다.

## <script> Directives

---

일반 `<script>`를 사용하는 경우 `directives` 옵션을 사용하여 커스텀 디렉티브를 등록할 수 있습니다.
```
export default {
  setup() {
    /*...*/
  },
  directives: {
    // enables v-focus in template
    focus: {
      /* ... */
    }
  }
}
```

## Global Directives

---

앱 수준에서 커스텀 디렉티브를 전역적으로 등록하는 것도 일반적입니다.
```
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

## Directives Hooks

---

디렉티브 정의 객체는 다음과 같은 여러 훅을 사용할 수 있습니다. (모든 훅은 필수가 아닌 선택사항)
```
const myDirective = {
	// 바인딩된 요소의 속성 전에 호출됨
	// 또는 이벤트 리스너가 적용됨
	created(el, binding, vnode, prevVnode) {
	// 인수에 대한 자세한 내용은 아래를 참조하십시오.
	},
	// 요소가 DOM에 삽입되기 직전에 호출됩니다.
	beforeMount() {},
	// 바인딩된 요소의 부모 구성 요소가 있을 때 호출됩니다.
	// 모든 자식이 마운트됩니다.
	mounted() {},
	// 상위 컴포넌트가 업데이트되기 전에 호출됨
	beforeUpdate() {},
	// 상위 컴포넌트 다음에 호출되고
	// 모든 자식이 업데이트되었습니다.
	updated() {},
	// 상위 컴포넌트가 마운트 해제되기 전에 호출됨
	beforeUnmount() {},
	// 상위 컴포넌트가 마운트 해제될 때 호출됩니다.
	unmounted() {}
	}
}
```

### Directives Hooks의 매개변수

디렉티브 훅에는 다음과 같은 매개변수가 전달됩니다.

- `el`: 디렉티브가 바인딩된 요소입니다. DOM을 직접 조작하는 데 사용할 수 있습니다.
- `binding`: 다음 속성을 포함하는 개체입니다.
    - `value`: 지시문에 전달된 값입니다. 예를 들어 `v-my-directive="1 + 1"`에서 값은 `2`입니다.
    - `oldValue`: `beforeUpdate` 및 업데이트에서만 사용할 수 있는 이전 값입니다. 값이 변경되었는지 여부에 관계없이 사용 가능합니다.
    - `arg`: 지시문에 전달된 인수(있는 경우). 예를 들어 `v-my-directive:foo`에서 인수는 `foo`입니다.
    - `modifiers`: 수정자가 있는 경우 수정자를 포함하는 개체입니다. 예를 들어 `v-my-directive.foo.bar`에서 수정자 객체는 `{ foo: true, bar: true }`입니다.
    - `instance`: 지시문이 사용되는 구성 요소의 인스턴스입니다.
    - `dir`: 지시문 정의 개체.
- `vnode`: 바인딩된 요소를 나타내는 기본 VNode.
- `prevNode`: 이전 렌더링에서 바인딩된 요소를 나타내는 VNode. `beforeUpdate` 및 `updated` 후크에서만 사용할 수 있습니다.

예를 들어 다음 디렉티브가 있다고 가정해 보겠습니다.
```
<div v-example:foo.bar="baz">
```

`binding` 매개변수는 다음과 같은 형태의 객체입니다.
```
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* value of `baz` */,
  oldValue: /* value of `baz` from previous update */
}
```

## 함수로 단축 표현

---

다른 훅(Hook)이 필요 없이 커스텀 디렉티브가 `mounted`와 `updated` 대해 동일한 동작을 갖는 것이 일반적입니다. 이러한 경우 디렉티브를 함수로 정의할 수 있습니다.
```
<div v-color="color"></div>
```

```
app.directive('color', (el, binding) = {
	// 이것은 `mounted`와 `updated` 모두에 대해 호출됩니다.
	el.style.color = binding.value
})
```

## 객체 리터럴

---

디렉티브에 여러 값이 필요한 경우 JavaScript 객체를 전달할 수도 있습니다. 디렉티브는 모든 JavaScript 표현식을 사용할 수 있음을 기억하십시오.
```
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## 컴포넌트에서 커스텀 디렉티브 사용

---

커스텀 디렉티브가 컴포넌트에서 사용되면 Non-Props 속성과 유사하게 항상 컴포넌트의 루트 노드에 적용됩니다.
```
<MyComponent v-demo="test" />
```

```
<!-- template of MyComponent -->

<div> <!-- v-demo 디렉티브가 여기에 적용됩니다 -->
  <span>My component content</span>
</div>
```

컴포넌트에는 잠재적으로 둘 이상의 루트 노드가 있을 수 있습니다. 다중 루트 컴포넌트에 커스텀 디렉티브를 적용하면 디렉티브가 무시되고 경고가 발생합니다. **속성과 달리 디렉티브은 `v-bind='$attrs'`를 사용하여 다른 요소에 전달할 수 없습니다.** **일반적으로 컴포넌트에 사용자 지정 지시문을 사용하는 것은 권장되지 않습니다.**

## Vue3 Custom Directives
[custom-directives](https://vuejs.org/guide/reusability/custom-directives.html)
