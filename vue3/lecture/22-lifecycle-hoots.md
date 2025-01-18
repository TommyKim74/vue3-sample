# Lifecycle hooks

각각의 Vue 컴포넌트 인스턴스는 생성되고 소멸될 때 사전에 정의된 몇 단계의 과정을 거치게 되는데 이를 **라이프사이클(lifecycle)**이라 합니다.

**라이프사이클 훅(Lifecycle hooks)은** 라이프사이클 단계에서 사용자가 자신의 코드를 추가할 수 있는 단계별 기능(function)입니다. 

## Lifecycle 다이어그램

다음은 인스턴스 수명 주기에 대한 다이어그램입니다. 지금 진행 중인 모든 것을 완전히 이해할 필요는 없지만 더 많이 배우고 구축함에 따라 유용한 참고 자료가 될 것입니다.

![Lifecycle](https://gymcoding.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F01477c09-fa39-4293-bd51-c73e97ebdfd0%2Flifecycle.16e4c08e.png?table=block&id=9f1213e2-89f7-40a9-b7fd-f81143580d45&spaceId=34c3bb9a-fd4a-4827-a490-5a2912b6a1ed&width=1060&userId=&cache=v2)


## Lifecycle hooks 등록

컴포넌트가 렌더링을 완료하고 DOM 노드를 만든 후 `onMounted` hooks를 사용하여 코드를 실행할 수 있습니다.
```
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('컴포넌트 mounted');
    });
  },
};
```

## Lifecycle Hooks

컴포넌트 라이프 사이클의 각 단계에서 실행되는 함수들을 라이프사이클 훅이라고 합니다.

라이프사이클 훅에 접두사 `“on”`을 붙여 컴포넌트의 라이프사이클 훅에서 코드를 실행할 수 있습니다. 아래 표에있는 라이프사이클 훅은 `setup()` 함수 내에서 동기적으로 호출해야 합니다.

다음 표에서 여러 라이프사이클 훅 단계와 `setup()` 함수 내에서 호출하는 방법을 확인할 수 있습니다.

| **Options API** | **setup 내부에서 사용** |
| --- | --- |
| `beforeCreate` | 필요하지 않음* |
| `created` | 필요하지 않음* |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeUnmount` | `onBeforeUnmount` |
| `unmounted` | `onUnmounted` |
| `errorCaptured` | `onErrorCaptured` |
| `renderTracked` | `onRenderTracked` |
| `renderTriggered` | `onRenderTriggered` |
| [**`activated`**](https://vuejs.org/api/options-lifecycle.html#activated) | [**`onActivated`**](https://vuejs.org/api/composition-api-lifecycle.html#onactivated) |
| [**`deactivated`**](https://vuejs.org/api/options-lifecycle.html#deactivated) | [**`onDeactivated`**](https://vuejs.org/api/composition-api-lifecycle.html#ondeactivated) |
| [**`serverPrefetch`**](https://vuejs.org/api/options-lifecycle.html#serverprefetch) | [**`onServerPrefetch`**](https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch) |

### 라이프사이클 훅

**`Creation(생성)`** → **`Mounting(장착)`** → **`Updating(수정)`** → **`Destruction(소멸)`**

## Creation

컴포넌트 초기화 단계이며 `Creation Hooks`은 라이프사이클 단계에서 가장 먼저 실행된다. 

- 아직 컴포넌트가 DOM에 추가되기 전이므로 DOM에 접근할 수 없다.
- 서버렌더링에서 지원되는 단계
- 클라이언트나 서버 렌더 단에서 처리해야 할 일이 있으면 이 단계에서 진행

### beforeCreate

컴포넌트 인스턴스가 초기화 될 때 실행됩니다. `data()` 또는 `computed`와 같은 다른 옵션을 처리하기 전에 즉시 호출됩니다.

### created

컴포넌트 인스턴스가 초기화를 완료한 후 호출되는 훅 입니다.

### setup

Composition API의 `setup()` 훅은 Options API 훅 보다 먼저 호출됩니다.

`beforeCreate`와 `created` 라이프사이클 훅은 Options API에서 사용하는 라이프사이클 훅으로 Vue3 Composition API를 활용하여 개발을 진행할 때는 `setup()`함수로 대체할 수 있습니다.
```
export default {
  beforeCreate() {
  },
  created() {
  },
  setup() {
		// coding...
	}
}
```

## Mounting

DOM에 컴포넌트를 삽입하는 단계이다. `onBeforeMount`와 `onMounted`가 있다.

- 서버렌더링에서 지원되지 않는다
- 초기 렌더링 직전에 돔을 변경하고자 한다면 이 단계에서 활용할 수 있다

### onBeforeMount

컴포넌트가 마운트되기 직전에 호출됩니다.

- 대부분의 경우 사용을 권장하지 않는다

### onMounted

컴포넌트가 마운트된 후에 호출됩니다. DOM에 접근할 수 있습니다.

- 모든 자식 컴포넌트가 마운트되었음을 의미합니다.
- 자체 DOM 트리가 생성되어 상위 컴포넌트에 삽입되었음을 의미합니다.

## Updating

반응형 상태 변경으로 컴포넌트의 DOM 트리가 업데이트된 후 호출될 콜백을 등록합니다.

- 디버깅이나 프로파일링 등을 위해 컴포넌트 재 렌더링 시점을 알고 싶을 때 사용하면 된다.

### onBeforeUpdate

반응형 상태 변경으로 컴포넌트의 DOM 트리를 업데이트하기 직전에 호출될 콜백을 등록합니다.

컴포넌트에서 사용되는 반응형 상태 값이 변해서, DOM에도 그 변화를 적용시켜야 할 때가 있습니다. 이 때, 변화 직전에 호출되는 것이 바로 onBeforeUpdate 훅입니다.

### onUpdated

반응 상태 변경으로 인해 컴포넌트가 DOM 트리를 업데이트한 후에 호출됩니다.

상위 컴포넌트의 `onUpdated`훅은 하위 컴포넌트의 훅 이후에 호출됩니다. (`Child` → `Parent`)

이 훅은 다른 상태 변경으로 인해 발생할 수 있는 컴포넌트의 DOM 업데이트 후에 호출됩니다. 특정 상태 변경 후에 업데이트된 DOM에 액세스해야 하는 경우 대신 `nextTick()`을 사용하십시오.

> **WARNING**
`onUpdated` 훅에서 컴포넌트 상태를 변경하지 마십시오. 그러면 무한 업데이트 루프가 발생할 수 있습니다!
> 

## **Destruction**

해체(소멸)단계 이며 `onBeforeUnmount`와 `onUnmounted`가 있습니다.

### onBeforeUnmount

컴포넌트가 마운트 해제되기 직전에 호출됩니다.

### onUnmounted

컴포넌트가 마운트 해제된 후 호출됩니다.

### ETC

- [**`onErrorCaptured()`**](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)
- [**`onRenderTracked()`**](https://vuejs.org/api/composition-api-lifecycle.html#onrendertracked)
- [**`onRenderTriggered()`**](https://vuejs.org/api/composition-api-lifecycle.html#onrendertriggered)
- [**`onActivated()`**](https://vuejs.org/api/composition-api-lifecycle.html#onactivated)
- [**`onDeactivated()`**](https://vuejs.org/api/composition-api-lifecycle.html#ondeactivated)
- [**`onServerPrefetch()`**](https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch)

### Composition API Lifecycle
[Composition API Lifecycle](https://vuejs.org/api/composition-api-lifecycle.html)