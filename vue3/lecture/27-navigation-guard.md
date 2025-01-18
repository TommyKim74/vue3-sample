# 네비게이션 가드

## 네비게이션 가드(navigation guard)

이름에서 알 수 있듯이 Vue Router에서 제공하는 네비게이션 가드는 주로 페이지 이동을 리다이렉션 하거나 취소하여 특정 페이지 진입을 보호하는 데 사용됩니다.

라우트 탐색 프로세스에 연결하는 방법에는 **전역**, **라우트별** 또는 **컴포넌트**가 있습니다.

## 전역가드

### Global Before Guards

`router.beforeEach`를 사용하여 전역 가드를 등록할 수 있습니다.    
```
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 네비게이션을 취소하려면 명시적으로 false를 반환합니다.
  return false
})
```
네비게이션이 트리거될 때마다 가드가 작성 순서에 따라 호출되기 전의 모든 경우에 발생합니다. 가드는 비동기식으로 실행 될 수 있으며 네비게이션은 모든 훅이 해결되기 전까지 **보류 중** 으로 간주됩니다.

모든 가드 함수는 두 개의 인수를 받습니다.

- `to`: 라우팅 되는 [**RouteLocationNormalized](https://router.vuejs.org/api/#routelocationnormalized)** 객체 (라우트 위치 정보를 담고 있는 객체)
- `from`: 라우팅 되기 전의 [**RouteLocationNormalized](https://router.vuejs.org/api/#routelocationnormalized)** 객체 (라우트 위치 정보를 담고 있는 객체)

그리고 선택적으로 다음 값 중 하나를 반환할 수 있습니다.

- `false`: 현재 라우팅(네비게이션)을 취소합니다.
- A [Route Location](https://router.vuejs.org/api/#routelocationraw): 경로 위치를 반환하여 다른 위치로 리다이렉션할 수 있습니다. 이때 전달될 값은 `router.push()`를 호출할 때와 같은 값을 내보내면 됩니다.

만약 `undefined` 또는 `true`가 반환되면 해당 네비게이션 가드가 검증이 된것으로 판단되어 다음 네비게이션 가드를 수행합니다.

**Optional third argument `next`**

Vue Router의 이전 버전에서는 세 번째 인수 `next`를 사용할 수도 있었는데 이는 일반적인 실수의 원인이었으며 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation) 를 통해 제거했습니다.
```
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // if the user is not authenticated, `next` is called twice
  next()
})
```

```
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### Global Resolve Guards

`router.beforeResolve`로 글로벌 가드를 등록할 수 있습니다. 이는 `router.beforeEach`와 유사합니다. 모든 컴포넌트 가드와 비동기 라우트 컴포넌트를 불러온 후 네비게이션 가드를 확인하기 전에 호출된다는 차이가 있습니다.
```
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 오류를 처리한 다음 탐색을 취소합니다.
        return false
      } else {
        // 예기치 않은 오류, 탐색을 취소하고 오류를 전역 처리기에 전달
        throw error
      }
    }
  }
})
```
데이터를 가져오거나 사용자가 페이지에 들어갈 수 없는 경우 피하고 싶은 다른 작업을 수행하기에 이상적인 장소입니다.

### **Global After Hooks**

전역 훅을 등록 할 수도 있지만, 가드와 달리 이 훅은 `next` 함수를 얻지 못하며 네비게이션에 영향을 줄 수 없습니다.
```
router.afterEach((to, from) => {
  // ...
})
```

## 라우트 가드

`beforeEnter` 가드를 라우트의 설정 객체에 직접 정의 할 수 있습니다.
```
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

`beforeEnter`가드는 해당 라우트에 진입할 때만 트리거 됩니다. 그리고 같은 URL이면서 `params`, `query`, `hash`의 변경이 일어났을 때는 트리거 되지 않습니다. 가드는 오직 다른 라우트로 네비게이션 할때만 트리거 됩니다.

`beforeEnter`가드에 함수의 배열을 전달할 수 있습니다. 이것은 다른 라우트에 설정한 가드를 재사용할 때 유용합니다.
```
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```
[**route meta fields**](https://router.vuejs.org/guide/advanced/meta.html)와 [**global navigation guards**](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)를 사용하여 유사한 동작을 달성할 수 있습니다.

## 컴포넌트 내 가드

마지막으로 라우트 컴포넌트(라우터 구성에 전달되는 컴포넌트) 내부에 라우트 네비게이션 가드를 직접 정의할 수 있습니다.

### Options API 사용

컴포넌트를 라우팅하기 위해 다음 옵션을 추가할 수 있습니다.

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`
```
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 네비게이션 이동이 확정된 후 컴포넌트가 만들어 지기 전에 실행되는 가드입니다.
		// `this` 구성 요소 인스턴스에 대한 액세스 권한이 없습니다.
		// 이 가드가 호출될 때 아직 생성되지 않았기 때문입니다!
  },
  beforeRouteUpdate(to, from) {
		// 이 컴포넌트를 렌더링하는 경로가 변경되면 호출됩니다.
		// 하지만 이 구성 요소는 새 경로에서 재사용됩니다.
		// 예를 들어 `/users/:id` 매개변수가 있는 경로가 주어지면
		// `/users/1`과 `/users/2` 사이를 탐색합니다. 동일한 `UserDetails` 구성요소 인스턴스입니다.
		// 재사용되며, 이 경우 이 후크가 호출됩니다.
		// 이 과정에서 구성 요소가 마운트되기 때문에 탐색 가드는 `this` 구성 요소 인스턴스에 액세스할 수 있습니다.
  },
  beforeRouteLeave(to, from) {
		// 라우트를 떠날 떄 실행되는 가드입니다.
		// 멀리 탐색합니다.
		// `beforeRouteUpdate`와 마찬가지로 `this` 구성 요소 인스턴스에 액세스할 수 있습니다.
  },
}
```

`beforeRouteEnter`가드는 `this`에 대한 액세스 권한이 **없습니다** . 네비게이션이 확인되기 전에 가드가 호출되어 새 입력 구성 요소가 아직 생성되지 않았기 때문입니다.

그러나 콜백을 `next`에 전달하여 인스턴스에 액세스할 수 있습니다. 네비게이션이 확인되면 콜백이 호출되고 컴포넌트 인스턴스가 매개변수로 콜백에 전달됩니다.
```
beforeRouteEnter (to, from, next) {
  next(vm => {
    // access to component public instance via `vm`
  })
}
```

`beforeRouteLeave` 가드는 일반적으로 사용자가 저장하지 않은 편집으로 경로를 실수로 떠나는 것을 방지하는 데 사용됩니다 . `false`를 반환하여 탐색을 취소할 수 있습니다.
```
beforeRouteLeave (to, from) {
  const answer = window.confirm('정말 떠나시겠습니까? 저장되지 않은 변경 사항이 있습니다!')
  if (!answer) return false
}
```

### Composition API 사용

Composition API에서는 `onBeforeRouteUpdate`와 `onBeforeRouteLeave`를 사용할 수 있습니다.

- `beforeRouteUpdate` → `onBeforeRouteUpdate`
- `beforeRouteLeave` → `onBeforeRouteLeave`
```
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // same as beforeRouteLeave option with no access to `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // cancel the navigation and stay on the same page
      if (!answer) return false
    })

    const userData = ref()

    // same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```

## 참고

- Vue Router v4
    
    [Programmatic Navigation | Vue Router](https://router.vuejs.org/guide/essentials/navigation.html)
    
- Vue Router v3 KR
    
    [중첩된 라우트 | Vue Router](https://v3.router.vuejs.org/kr/guide/essentials/nested-routes.html)

