# Transition

Vue에서는 Transitions 이나 Animations을 쉽게할 수 있도록 도움을 주는 두 가지 빌드인(내장) 컴포넌트를 제공합니다.

- `<Transition>` : 컴포넌트가 DOM에 나타나고 사라질 때 애니메이션을 적용하기 위해 사용하는 컴포넌트 입니다.
- `<TransitionGroup>` : 컴포넌트가 `v-for` 목록에 삽입, 제거 또는 이동할 때 애니메이션을 적용하기 위해 사용하는 컴포넌트 입니다.

## `<Transition>` 컴포넌트

`<Transition>`은 기본으로 제공되는 컴포넌트 입니다. 즉, 등록하지 않고도 모든 컴포넌트 내 `<template>`안에서 사용할 수 있습니다. `default slot`을 통해 전달된 컴포넌트가 나타나거나(enter) 사라질 때(leave) 애니메이션을 적용하는 데 사용할 수 있습니다. 입장(enter) 또는 퇴장(leave)은 다음 중 하나에 의해 트리거될 수 있습니다.

- `v-if`를 통한 조건부 렌더링
- `v-show`를 통한 조건부 표시
- `<component>` 라는 특수 엘리먼트를 통한 동적 컴포넌트(Dynamic Component) 토글

다음은 가장 기본적인 사용법의 예입니다.
```
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```
