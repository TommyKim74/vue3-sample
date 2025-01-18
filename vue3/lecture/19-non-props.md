# Non-Prop 속성

## Non-Prop 속성 (fallthrough 속성)

**Non-Prop 속성**은 `props` 또는 `event` 에 명시적으로 선언되지 않은 속성 또는 이벤트 입니다. 예를 들어 `class`, `style`, `id`와 같은 것들이 있습니다.

## 속성 상속

컴포넌트가 단일 루트 요소로 구성되어 있으면 Non-Prop **속성**은 루트 요소의 속성에 자동으로 추가됩니다. 예를 들어 `<MyButton>` 이라는 컴포넌트가 있다고 가정해보겠습니다.
```
<!-- template of <MyButton> -->
<button>click me</button>
```

그리고 이 컴포넌트를 사용하는 부모 컴포넌트는 다음과 같습니다.
```
<MyButton class="large" />
```

최종 렌더링된 DOM은 다음과 같습니다.
```
<button class="large">click me</button>
```

## `class`, `style` 속성 병합

만약 자식 컴포넌트 루트요소에 이미 `class`와 `style`속성이 정의되어 있으면, 부모로 받은 `class`와 `style`속성과 병합 합니다.
```
<!-- template of <MyButton> -->
<button class="btn">click me</button>
```

최종 병합된 DOM은 다음과 같습니다.
```
<button class="btn large">click me</button>
```

## `v-on` 이벤트 리스너 상속

`v-on` 이벤트 리스너도 동일하게 상속됩니다.
```
<MyButton @click="onClick" />
```
- `@click` 리스너는 `<MyButton>`의 컴포넌트 루트요소인 `<button>`요소에 추가됩니다.
- 만약 `<button>`요소에 이미 바인딩된 이벤트가 있다면 이벤트가 추가되어 두 리스너 모두 트리거 됩니다.

## 속성 상속 비활성화

컴포넌트가 자동으로 Non-Prop **속성**을 상속하지 않도록 하려면 컴포넌트의 `inheritAttrs: false` 옵션을 설정할 수 있습니다.
```
<template>
  <button class="btn" data-link="hello">click me</button>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
```

컴포넌트에 Non-Prop **속성**을 비활성화 하는 일반적인 경우는 자식 컴포넌트의 루트요소에 이외의 다른 요소에 Non-Prop **속성**을 적용하고 싶을 때 입니다.

그리고 적용해야 하는 요소에 `<template>`에서 Non-Prop속성에 접근할 수 있는 내장 객체 `$attrs`로 직접 접근할 수 있습니다.
```
<template>
  <p>Non-Prop 속성: {{ $attrs }}</p>
</template>
```
`$attrs` 객체에는 컴포넌트에 선언되지 않은 모든 속성 `props`, `emits` (예: `class`, `style`, `v-on` 등)을 포함하고 있습니다.

몇 가지 참고 사항:

- `props`와 달리 **Non-Prop 속성**은 JavaScript에서 원래 대소문자를 유지하므로 `foo-bar`와 같은 속성은 `$attrs[’foo-bar’]`로 접근해야 합니다.
- `@click`과 같은 `v-on`리스너는 `$attrs.onClick`과 같이 함수로 접근할 수 있습니다.

### Non-Prop 속성을 특정 요소에 모두 적용하기

`inheritAttrs: false`와 `$attrs`를 이용하면 **Non-Prop 속성**을 특정 요소에 모두 적용할 수 있습니다.
```
<template>
  <label>
    이름:
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
```

부모 컴포넌트
```
<MyInput
  class="my-input"
  placeholder="didj"
  @keyup="onKeyup"
  data-message="Hello World!"
/>
```

<aside>
💡 Vue 3에서 $listeners 객체가 제거되었습니다. 모든 리스너는 이제 $attrs의 일부가 되었습니다.
</aside>


## Fragments

Vue3에서 컴포넌트는 다중 루트 노드 컴포넌트인 fragments를 공식 지원합니다.

### Vue2.x 문법

2.x에서는 다중 루트 컴포넌트가 지원되지 않았고, 사용자가 실수로 다중 루트 컴포넌트를 만들었을 경우 경고 메세지를 내보냈습니다. 그리고 이 오류를 해결하기 위해 많은 컴포넌트가 단일 `<div>`로 감싸게 됐습니다.
```
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

### Vue3.x 문법

3.x 에서 컴포넌트는 다중 루트 노드(multiple root node)를 가질 수 있습니다! 하지만, 개발자가 속성을 배포(상속)해야 하는 위치를 명시적으로 정의해야 합니다.
```
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

## 여러 루트노드의 속성 상속

**단일 루트 요소**가 있는 컴포넌트와 달리 **여러 루트 요소**가 있는 컴포넌트에는 자동으로 **Non-Prop 속성**이 상속되지 않습니다. 만약 명시적으로 `$attrs`를 바인딩 하지 않을 경우 런타입 경고가 발생됩니다.

**자식 컴포넌트**
```
<!-- CustomLayout.vue -->
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

부모 컴포넌트
```
<CustomLayout id="custom-layout"></CustomLayout>
```

$attrs이 명시적으로 바인딩된 경우 경고가 표시되지 않습니다.
```
<!-- CustomLayout.vue -->
<template>
  <header></header>
  <main v-bind="$attrs"></main>
  <footer></footer>
</template>
```

## JavaScript에서 Non-Prop 속성 접근

`setup()` 함수의 `context.attrs` 속성으로 노출됩니다 .
```
export default {
  setup(props, context) {
    console.log(context.attrs)
  }
}
```
