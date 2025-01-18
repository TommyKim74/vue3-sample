# VueRouter-2


## 동적 라우트 매칭

주어진 패턴을 가진 라우트를 동일한 컴포넌트에 매핑해야하는 경우가 자주 있습니다. 예를 들어 **사용자 목록(User List)**은 `/users`와 같은 경로에 매핑되면 되지만 **사용자 상세(User Detail)**는 **사용자 식별자 별로 같은 컴포넌트에 매핑** 되어야 합니다. (예:  `/users/alice`, `/users/emma`, `...` → `UserComponent.vue`)

이럴때 Vue Router에서는 경로에서 동적 세그먼트를 사용하여 해결할 수 있습니다. 이를 `param`이라고 합니다.
```
const User = {
  template: '<div>User</div>',
}

const routes = [
  { path: '/users/:id', component: User },
]
```

이제 `/users/alice`, `/users/emma` URL은 모두 같은 경로(`’/users/:id’`)에 매핑됩니다.

- 동적 세그먼트는 콜론(`:`)으로 표시합니다.
- 그리고 컴포넌트에서 동적 세그먼트의 값은 `$route.params` 필드로 접근할 수 있습니다.
```
const User = {
  template: '<div>User {{ $route.params.id }}</div>',
}
```
동일한 라우트에 여러 동적 세그먼트를 가질 수 있으며, `$route.params` 필드에 매핑됩니다.

| **path** | URL example | $route.params |
| --- | --- | --- |
| /users/:username | /users/alice | `{ username: ‘alice’ }` |
| /users/:username/posts/:postId | /users/alice/posts/123 | `{ username: ‘alice’, postId: ‘123’ }` |

### `query`, `hash`

`$route.params` 외에도 `$route` 객체는 `$route.query(쿼리스트링)`, `$route.hash(해시태그)` 등과 같은 다른 유용한 정보도 노출합니다.

| **URL example** | $route |
| --- | --- |
| /users?searchText=love | `{ params: {...}, hash: '...', query: { searchText: love } }` |
| /users/alice#profile | `{ params: {...}, hash: 'profile', query: { ... } }` |

다른 유용한 정보를 더 확인하시려면 [**API Reference**](https://router.vuejs.org/api/#routelocationnormalized)를 참고하세요.

### 404 Not Found Route

일반 파라미터(`:id`)는 슬래쉬(`/`)로 구분된 URL 사이의 문자만 일치시킵니다. 무엇이든 일치시키려면 param 바로 뒤에 괄호 안에 정규식(`regexp`)을 사용할 수 있습니다.
```
const routes = [
  // will match everything and put it under `$route.params.pathMatch`
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // will match anything starting with `/user-` and put it under `$route.params.afterUser`
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

프로그래밍 방식 네비게이션
<RouterLink>를 사용하여 선언적 네비게이션용 anchor 태그를 사용하는 것 외에도 라우터 인스턴스 메소드를 사용하여 프로그래밍 방식으로 이를 수행 할 수 있습니다.
router.push
다른 URL로 이동하려면 router.push를 사용할 수 있습니다. 이 메소드는 새로운 항목을 히스토리 스택에 넣기 때문에 사용자가 브라우저의 뒤로 가기 버튼을 클릭하면 이전 URL로 이동하게 됩니다.
이 메소드는 <RouterLink>를 클릭 할 때 내부적으로 호출되는 메소드이므로 <RouterLink :to=”...”>를 클릭하면 router.push(...)를 호출하는 것과 같습니다

| **선언적 방식** | **프로그래밍 방식** |
| --- | --- |
| `<RouterLink :to=”...”>` | `router.push(...)` |

```
<RouterLink :to="..."></RouterLink>
```

`router.push` 파라미터는 문자열 경로 또는 객체가 될 수 있습니다.
```
// 리터럴 문자열 경로
router.push('/users/eduardo')

// 경로가 있는 개체
router.push({ path: '/users/eduardo' })

// 이름을 가지는 라우트
router.push({ name: 'user', params: { username: 'eduardo' } })

// 쿼리와 함께 사용, 결과적으로 /register?plan=private가 됩니다.
router.push({ path: '/register', query: { plan: 'private' } })

// 해시와 함께 사용, 결과적으로 /about#team가 됩니다.
router.push({ path: '/about', hash: '#team' })
```

```
const username = 'eduardo'
// URL을 수동으로 작성할 수 있지만 인코딩을 직접 처리해야 합니다.
router.push(`/user/${username}`) // -> /user/eduardo
// 위와 동일
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 가능하면 `name`과 `params`를 사용하여 자동 URL 인코딩의 이점을 얻습니다.
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params`는 `path`와 함께 사용할 수 없습니다.
router.push({ path: '/user', params: { username } }) // -> /user
```

### `router.replace`

`router.push`와 같은 역할을 하지만 유일한 차이는 새로운 히스토리 항목에 추가하지 않고 탐색한다는 것입니다. 이름에서 알 수 있듯이 현재 항목을 대체합니다.

| **선언적 방식** | **프로그래밍 방식** |
| --- | --- |
| `<router-link :to=”...” replace>` | `router.replace(...)` |

`router.push` 메소드에 `replace: true`속성을 추가하여 동일하게 동작시킬 수 있습니다.
```
router.push({ path: '/home', replace: true })
// equivalent to
router.replace({ path: '/home' })
```

### `router.go(n)`

이 메소드는 `window.history.go(n)`와 비슷하게 히스토리 스택에서 앞으로 또는 뒤로 이동하는 단계를 나타내는 하나의 정수를 매개 변수로 사용합니다.
```
// 한 단계 앞으로 갑니다. history.forward()와 같습니다. history.forward()와 같습니다.
router.go(1)

// 한 단계 뒤로 갑니다. history.back()와 같습니다.
router.go(-1)

// 3 단계 앞으로 갑니다.
router.go(3)

// 지정한 만큼의 기록이 없으면 자동으로 실패 합니다.
router.go(-100)
router.go(100)
```

## **Params 변경 사항에 반응하기**

매개 변수와 함께 라우트를 사용할 때 주의 해야할 점은 사용자가 `/users/alice`에서 `/users/emma`로 이동할 때 **동일한 컴포넌트 인스턴스가 재사용된다는 것입니다.** 왜냐하면 두 라우트 모두 동일한 컴포넌트를 렌더링하므로 이전 인스턴스를 삭제 한 다음 새 인스턴스를 만드는 것보다 효율적입니다. **그러나 이는 또한 컴포넌트의 라이프 사이클 훅이 호출되지 않음을 의미합니다.**

이렇게 동일한 컴포넌트를 재사용할 때 URL이 변경되게 되면 라이프사이클 훅이 호출되지 않기 때문에 훅에서 하던 일을 할 수 없습니다.

이럴 때는 `Watcher(watch, watchEfffect)` 또는 `beforeRouteUpdate` [**navigation guard**](https://router.vuejs.org/guide/advanced/navigation-guards.html)를 사용하여 `params`와 같은 URL 변경사항에 반응할 수 있습니다.

### watch를 통한 params 반응하기
```
// <script setup>
import { useRoute, watch } from 'vue-router';

const route = useRoute();

watch(
  () => route.params,
  (toParams, previousParams) => {
		// working
  }
);
```

### beforeRouteUpdate

동일한 컴포넌트를 재사용할 때 URL이 변경되는 경우 호출됩니다. 

**Options API**
```
export default {
	beforeRouteUpdate(to, from) {
		// working
		this.userData = await fetchUser(to.params.id)
	}
}
```

Composition API
```
// <script setup>
import { onBeforeRouteUpdate } from 'vue-router';
onBeforeRouteUpdate((to, from) => {
  console.log('onBeforeRouteUpdate');
});
```

## 이름을 가지는 라우트 (Named Routes)

Router 인스턴스를 생성할 때 `path`와 함께 `name`을 지정할 수 있습니다.
```
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

이름을 가진 라우트에 링크하려면, 객체를 router-link 컴포넌트의 to prop로 전달할 수 있습니다.
```
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

이것은 router.push()와 프로그램적으로 사용되는 것과 정확히 같은 객체입니다.
```
router.push({ name: 'user', params: { username: 'erina' } })
```
두 경우 모두 라우터는 `/user/erina` 경로로 이동합니다.

## 이름을 가지는 뷰 (Named Views)

때로는 여러 개의 뷰(`router-view`)를 중첩하지 않고 동시에 표시해야 하는 경우가 있습니다. 이때 `router-view`에 이름을 지정하여 여러개의 `router-view`를 사용할 수 있습니다. 그리고 이름이 없는 `router-view`는 `default`가 이름으로 주어집니다.
```
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

뷰는 컴포넌트를 사용하여 렌더링 되므로 여러 뷰에는 동일한 라우트에 대해 여러 컴포넌트가 필요합니다. components(s를 붙입니다) 옵션을 사용해야합니다.
```
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
    },
  ],
})
```

## 중첩된 라우트(Nested Routes)

실제 앱 UI는 일반적으로 여러 단계로 중첩 된 컴포넌트로 이루어져 있습니다. URL의 세그먼트가 중첩 된 컴포넌트의 특정 구조와 일치한다는 것은 매우 일반적입니다. 예를 들면 다음과 같습니다.
```
/user/johnny/profile                  /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

`vue-router`를 사용하면 중첩 된 라우트 구성을 사용하여이 관계를 표현하는 것이 매우 간단합니다.
```
<!-- App.vue -->
<div id="app">
	<router-view></router-view>
</div>
```

```
<!-- User.vue -->
<div class="user">
	<h2>User {{ $route.params.id }}</h2>
</div>
```

```
// router/index.js
const routes = [
  {
    path: '/user/:id',
    component: User,
  },
]
```

`App.vue`에 있는 `<router-view>`는 최상위 `router-view`입니다. 이 `router-view`는 `routes`의 최상위 `path`와 일치하는 컴포넌트(`User.vue`)가 렌더링 됩니다.

그리고 `User.vue` 컴포넌트 내부에 중첩된 `<router-view>`를 선언할 수 있습니다.
```
<!-- User.vue -->
<div class="user">
	<h2>User {{ $route.params.id }}</h2>
	<router-view></router-view>
</div>
```

그리고 컴포넌트를 이 중첩된 <router-view>로 렌더링하려면 routes 안의 children 옵션을 사용해야 합니다.
```
// router/index.js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: 'profile',
        component: UserProfile,
      },
      {
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

```
<!-- UserProfile.vue -->
<div class="user-profile">
	User Profile
</div>
```

```
<!-- UserPosts.vue -->
<div class="user-posts">
	User Posts
</div>
```

### 참고

- **`/`로 시작하는 중첩 경로는 루트 경로로 처리됩니다. 이를 통해 중첩 URL을 사용하지 않고도 컴포넌트 중첩을 활용할 수 있습니다.**
- 위 routes 설정으로 보면 `/users/alice`로 방문 했을 때 `User 컴포넌트`에 있는 중첩된 `<router-view>`에는 아무것도 렌더링 되지 않습니다.  이러한 경우 빈 중첩 경로를 제공할 수 있습니다.
```
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      { path: '', component: UserHome },

      // ...other sub routes
    ],
  },
]
```

## 라우트 컴포넌트에 속성 전달

컴포넌트에서 `$route`객체를 사용하면 특정 URL에서만 사용할 수 있게되어 라우트와 강한 결합을 만듭니다. 즉 컴포넌트의 유연성이 제한됩니다. 이러한 결합이 꼭 나쁜 것은 아니지만 `props`옵션으로 이 동작을 분리할 수 있습니다.

컴포넌트와 라우터 속성을 분리하려면 다음과 같이 하십시오.

**라우트에 의존된 컴포넌트**
```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const routes = [{ path: '/user/:id', component: User }]
```

라우트 의존도 해제
```
const User = {
  // make sure to add a prop named exactly like the route param
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]
```

이를 통해 어디서나 컴포넌트를 사용할 수 있으므로 컴포넌트 재사용 및 테스트하기가 더 쉽습니다.

### **Boolean 모드**

`props`를 `true`로 설정하면 `route.params`가 컴포넌트 `props`로 설정됩니다.

### Named views

이름을 가지는 뷰(Named Views)가 있는 경우 각 Named Views에 대한 `props` 옵션 을 정의해야 합니다 .
```
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

### 객체 모드

`props`가 객체일때 컴포넌트 `props`가 있는 그대로 설정됩니다. `props`가 정적일 때 유용합니다.
```
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

### 함수 모드

`props`를 반환하는 함수를 만들 수 있습니다. 이를 통해 전달인자를 다른 타입으로 캐스팅하고 적정인 값을 라우트 기반 값과 결합됩니다.
```
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

## 다양한 history 모드

Router 인스턴스를 생성할 때 [`history`](https://router.vuejs.org/api/#history) 옵션을 사용하면 다양한 history mode 중에서 선택할 수 있습니다.

- Hash - [**createWebHashHistory()](https://router.vuejs.org/api/#createwebhashhistory)**
- History - [**createWebHistory()**](https://router.vuejs.org/api/#createwebhistory)
- Memory - [**createMemoryHistory()**](https://router.vuejs.org/api/#creatememoryhistory)

### Hash 모드

Vue Router를 통해 URL로 페이지를 전환할 때 히스토리 관리 기법를 해시(`#`)형으로 쓸 수 있게 해줍니다.

해시모드는 [`createWebHashHistory()`](https://router.vuejs.org/api/#createwebhashhistory)를 사용하여 생성됩니다.
```
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```
내부적으로 전달되는 실제 URL 앞에 해시 문자(`#`)를 사용합니다. URL의 이 섹션은 서버로 전송되지 않으므로 서버 수준에서 특별한 처리가 필요하지 않습니다. **그러나 그것은 SEO에 나쁜 영향을 미칩니다** . 그게 걱정된다면 HTML5 모드(`createWebHistory()`**)**를 사용하세요.

### History 모드 (HTML5 모드)

Vue Router를 통해 URL로 페이지를 전환할 때 히스토리 관리 기법를 해시(`#`)없이 쓸 수 있게 해줍니다. Web API인 `history.pushState()`를 활용하여 페이지를 다시 로드하지 않고도 URL 탐색을 할 수 있습니다.

HTML5 모드는 [`createWebHistory()`](https://router.vuejs.org/api/#createwebhistory)로 생성되며 권장 모드입니다.
```
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

`createWebHistory()`를 사용하면 URL은 “정상"으로 보입니다. 

하지만 여기에 문제가 있습니다. 우리의 앱이 적절한 서버 설정이 없는 단일 페이지 클라이언트 앱이기 때문에 사용자가 직접 `http://oursite.com/user/id`에 접속하면 404 오류가 발생합니다.

걱정하지 않아도됩니다. 문제를 해결하려면 서버에 간단하게 포괄적인 대체 경로를 추가하기만 하면됩니다. URL이 정적 에셋과 일치하지 않으면 앱이 있는 동일한 `index.html`
페이지를 제공해야 합니다.

### 서버 설정 및 주의 사항

서버설정 및 주의 사항은 공식홈페이지를 참고하시는 것을 권장드립니다.

[HTML5 히스토리 모드 | Vue Router](https://v3.router.vuejs.org/kr/guide/essentials/history-mode.html#%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC-%E1%84%8B%E1%85%A8%E1%84%8C%E1%85%A6)

## 참고

- Vue Router v4
    
    [Programmatic Navigation | Vue Router](https://router.vuejs.org/guide/essentials/navigation.html)
    
- Vue Router v3 KR
    
    [중첩된 라우트 | Vue Router](https://v3.router.vuejs.org/kr/guide/essentials/nested-routes.html)
    
- ref vs reactive
    
    [Vue 3 Composition API: ref() vs. reactive()](https://markus.oberlehner.net/blog/vue-3-composition-api-ref-vs-reactive/)

