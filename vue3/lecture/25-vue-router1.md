# VueRouter_1 란?


## 뷰 라우터 (Vue Router)

뷰 라우터는 Vue.js를 이용하여 싱글 페이지 애플리케이션(SPA)을 구현할 때 사용하는 Vue.js의 공식 라우터 입니다.

[Getting Started | Vue Router](https://router.vuejs.org/guide/)

### **라우터란? (Router)**

라우터라고 하면 일반적으로 네트워크간에 데이터를 전송하는 장치를 말합니다. 뷰에서 말하는 라우터는 쉽게 말해서 URL에 따라 어떤 페이지를 보여줄지 매핑해주는 라이브러리라고 보시면 될 것 같습니다.

예를 들어 “`‘/home’` 경로로 요청이 들어왔을때 `‘Home.vue’` 컴포넌트를 화면에 렌더링 해라!” 라는 역할을 수행하는 라이브러리라고 보시면 될 것 같습니다. 그리고 이때 `‘/home’` → `‘Home.vue’` 이러한 매핑정보를 라우트(Route)라고도 합니다.

### 라우트란? (Route)

어떤 URL에 대해 어떤 페이지를 표시해야 하는지에 대한 정보

## 설치
```
npm install vue-router
```

## 시작하기

`HomeView.vue`와 `AboutView.vue`라는 **페이지용 컴포넌트**를 만든후 `‘/’` 경로로 들어왔을 경우 `HomeView.vue` 페이지(컴포넌트)를 렌더링 하고 `‘/about’` 경로로 들어왔을 경우 `AboutView.vue` 페이지(컴포넌트)를 렌더링 하는 실습을 진행해 보도록 하겠습니다.

- `‘/’` → `HomeView.vue`
- `‘/about’` → `AboutView.vue`

### 페이지 컴포넌트 생성

`HomeView.vue`와 `AboutView.vue` 페이지(컴포넌트)를 생성해보도록 하겠습니다.
```
// src/views/HomeView.vue
<script setup></script>
<template>
  <h1>Home Page</h1>
</template>
```

```
// src/views/AboutView.vue
<script setup></script>
<template>
  <h1>About Page</h1>
</template>
```

### 라우트(routes) 정의

먼저 URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의해보도록 하겠습니다.
```
// src/router/index.js
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];
```

### 라우터(router) 설정

라우터를 설정해보도록 하겠습니다.
```
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
```

설정한 라우터 객체를 Vue 인스턴스에 추가해보도록 하겠습니다.
```
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

`app.use(router)`를 호출 함으로써 컴포넌트 내부에서 `$router`, `$route` 객체에 접근할 수 있습니다.

## 네이게이션

뷰 라우터를 HTML과 JavaScript로 사용하는 방법에 대해 알아보도록 하겠습니다.

### HTML
```
// src/App.vue
<script setup></script>

<template>
  <nav>
    <Routerlink to="/">Home</Routerlink>
    <span> | </span>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <main>
    <RouterView></RouterView>
  </main>
</template>
```
- `<RouterLink>`
    
    Vue Router 에서는 페이지를 이동할 때는 일반 `a`태그를 사용하는 대신 **커스텀 컴포넌트인** `<RouterLink>`를 사용하여 다른 페이지 링크를 만들어야 합니다.
    
    이를 통해 **Vue Router는 페이지를 리로딩 하지 않고 URL에 매핑된 페이지를 렌더링**할 수 있습니다.
    
- `<RouterView>`
    
    `<RouterView>`는 URL에 매핑된 컴포넌트를 화면에 표시합니다.
    

### JavaScript

위에서 `router`를 설정할 때 `app.use(router)`를 호출했습니다. 이렇게 호출 함으로써 모든 자식 컴포넌트에 `router`, `route` 같은 객체를 사용할 수 있습니다. 그리고 이러한 객체는 페이지 이동 또는 현재 활성 라우트(경로 매핑)정보 에 접근하는 데 사용할 수 있습니다.

- `router`
    
    라우터 인스턴스로 JavaScript에서 다른 페이지(컴포넌트)로 이동할 수 있다.
    
    - Options API : **this.$router**
    - Composition API : [**useRouter()**](https://router.vuejs.org/api/#userouter)
    - template : $router
- `route`
    
    현재 활성 라우트 정보에 접근할 수 있다. (이 속성은 읽기 전용 입니다.)
    
    - Options API : **this.$route**
    - Composition API : [**useRoute()**](https://router.vuejs.org/api/#useroute)
    - template : $route
```
<!-- HomeView.vue -->
<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
console.log('route.name: ', route.name);
console.log('route.path: ', route.path);
const goAboutPage = () => router.push('/about');
</script>
<template>
  <h1>Home Page</h1>
  <button @click="goAboutPage">About 페이지로 이동</button>
</template>
```

```
<!-- AboutView.vue -->
<script setup></script>
<template>
  <h1>About Page</h1>
  <ul>
    <li>$route.name: {{ $route.name }}</li>
    <li>$route.path: {{ $route.path }}</li>
  </ul>
  <button @click="$router.push('/')">Home 페이지로 이동</button>
</template>
```

## components.d.ts

로컬 컴포넌트, 내장 컴포넌트, 기본 HTML 요소 구성 없이 Type-Checking을 사용할 수 있습니다.

전역 컴포넌트의 경우 GlobalComponents 인터페이스를 정의해야 합니다. 예를 들면 다음과 같습니다.
```
// components.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
  }
}

export {};
```
