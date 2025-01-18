# 상태관리 란?


## 상태 관리 패턴이란?

모든 Vue 컴포넌트 인스턴스는 자체적으로 상태를 관리합니다. 간단한 카운터 컴포넌트를 예로 들어 보겠습니다.
```
<script setup>
import { ref } from 'vue'

// state
const count = ref(0)

// actions
function increment() {
  count.value++
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

이 컴포넌트는 다음과 같은 부분으로 구성된 하나의 독립된 단위 입니다.

- **state** - 컴포넌트내에 선언된 상태
- **view** - 상태가 선언적으로 매핑된 템플릿
- **actions** - **view**에서 사용자의 입력에 대한 반응으로 **state**를 변경할 수 있음

컴포넌트의 단방향 데이터 흐름을 간단히 표현해보면 이렇습니다.


![상태관리](https://gymcoding.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdecc723d-eb72-4c98-a20c-bb4609905a44%2Fstate-flow.a8bc738e.png?table=block&id=5001b49f-5511-46b6-97e2-5dea351510cb&spaceId=34c3bb9a-fd4a-4827-a490-5a2912b6a1ed&width=580&userId=&cache=v2)


하지만 컴포넌트간에 공통된 상태를 공유하려면 어떻게 해야 할까요?

1. 공유하고자 하는 상태를 같은 부모 컴포넌트로 두고 **Props**로 전달하는 것입니다.
→ 그러나 이것은 깊은 계층구조를 가진 컴포넌트에서 [**Prop Dralling** 이라는 문제](https://vuejs.org/guide/components/provide-inject.html#prop-drilling)로 이어질 수 있습니다.
2. Template Refs를 사용해서 부모/자식 인스턴스에 직접 접근하거나 Emits 이벤트를 통해 여러 복사본의 상태를 동기화 하는 것입니다.
→ 이러한 패턴은 유지 관리할 수 없는 코드로 이어집니다. 

더 간단한 해결책은 컴포넌트에서 공유 상태를 추출하여 글로벌 싱글톤으로 관리하는 것입니다. 이러한 글로벌 공통 상태에 대해 모든 컴포넌트는 **“View”** 역할을 하며 컴포넌트 위치에 관계없이 상태에 접근하거나 변경할 수 있습니다.

## Reactivity API를 통한 상태 관리

여러 컴포넌트에서 공유해야 하는 상태가 있는 경우 `reactive()`를 사용하여 반응형 객체를 만든 다음 여러 컴포넌트에서 가져올 수 있습니다.
```
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

```
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>
	<div>From A: {{ store.count }}</div>
</template>
```

```
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>
	<div>From B: {{ store.count }}</div>
</template>
```

이제 `store` 객체가 변경 될 때마다 `<ComponentA>`와 `<ComponentB>`의 View가 자동으로 업데이트됩니다. 하지만 이러한 코드는 `store`를 가져오는 모든 컴포넌트가 원하는 대로 변경할 수 있음을 의미합니다.
```
<template>
  <button @click="store.count++">
    Component B: {{ store.count }}
  </button>
</template>
```

이러한 방법은 로직이 간단하다면 문제없지만 **컴포넌트에 의해 임의로 변경될 수 있는 전역 상태 관리**는 장기적으로 유지하기가 쉽지 않습니다. 상태를 변경하는 로직이 상태 자체 처럼 중앙 집중화 되도록 하려면 작업의 의도를 나태내는 이름으로 `store` 객체에 메서드를 정의하는 것이 좋습니다.
```
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```
<button @click="store.increment()">
	Component B: {{ store.count }}
</button>
```

<aside>
💡 `@click` 핸들러는 괄호와 함께 메서드를 호출합니다. 왜냐하면 inceament 메서드는 컴포넌트 메서드가 아니기 때문에 적절한 `this`컨텍스트로 메소드를 호출하는 데 필요합니다.

</aside>

위 예제에서는 단일 `reactive()` 객체를 저장소로 사용하고 있지만 `ref()` 또는 `computed()`와 같은 다른 [Reactivity APIs](https://vuejs.org/api/reactivity-core.html)를 사용하여 생선된 반응형 `state`를 공유하거나 Composable 함수에서 전역 상태를 반환 할 수도 있습니다.

```
import { ref } from 'vue'

// 모듈 범위에서 생성된 전역 상태
const globalCount = ref(1)

export function useCount() {
  // 컴포넌트 별로 생성된 로컬 상태
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

이처럼 반응형 상태 관리 시스템이 컴포넌트 모델과 분리되어 있기 때문에 Vue를 매우 유연하게 사용할 수 있습니다.

## Pinia

간단한 애플리케이션에서는 위 예시처럼 우리가 수동으로 만든 상태 관리 시스템으로 충분 하지만 대규모 애플리케이션에서는 고려해야 할 사항이 더 많습니다.

- 팀과 협업을 위한 강력한 규칙
- TImeline, in-component, inspection, time-travel debugging을 포함하는 Vue Devtools와 통합
- HMR(Hot Module Replacement)
- 서버사이드 렌더링 지원

Pinia는 위의 모든 것을 구현하는 상태 관리 라이브러리입니다. Vue 핵심 팀에서 유지 관리하며 Vue2, Vue3에서 모두 동작합니다.

기존 사용자들은 Vue의 공식 상태 관리 라이브러리였던 Vuex에 익숙할 수 있습니다. 하지만 이제 Vuex는 이제 유지 관리 모드에 있으며, 동작은 하지만 더 이상 새로운 기능을 개발하지 않습니다. 대신 Pinia가 생태계에서 동일한 역할을 수행하며 새로운 애플리케이션 개발시에는 Pinia를 사용하는 것이 좋습니다.

Pinia는 Vuex5에 대한 핵심 팀의 토론에서 많은 아이디어를 얻어 Vuex의 다음은 어떤 모습일지 연구하는 것으로 시작했습니다. 결국 Pinia는 Vuex5에서 우리가 원하는 대부분을 이미 구현하고 있었고 Pinia를 만들기로 결정했습니다.

Vuex와 비교하여 Pinia는 더 간단한 API를 제공하고 Composition API 스타일의 API를 제공하며 가장 중요한 것은 TypeScript와 함께 사용할 때 견고한 타입 추론을 지원합니다.


