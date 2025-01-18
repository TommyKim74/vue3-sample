# Pinia란?


## 왜 Pinia를 사용해야 하나요?

Pinia는 Vue의 저장소 라이브러리로 컴포너트/페이지 간에 상태를 공유할 수 있습니다. Composition API에 익숙하다면 이미 `export const state = reactive({})` API를 활용하여 Global State를 간단히 만들 수 있을 것입니다. 하지만 이러한 방법은 Single Page Application에 해당하는 방법이며 서버 사이드 렌더링이 되는 경우 애플리케이션이 보안 취약성에 노출시킵니다. 또한 작은 Single Page Application에서도 Pinia를 사용하면 많은 것을 얻을 수 있습니다.

- Devtools 지원
    - mutations, actions를 추적하는 타임라인
    - Store는 사용되는 컴포넌트에 나타납니다.
    - Time travel과 더 쉬운 디버깅
- Hot module replacement
    - 페이지 리로딩 없지 store 수정
    - 개발하는 동안 기존 state 유지
- 플러그인: 플러그인으로 Pinia 기능 확장
- JS 사용자를 위한 적절한 TypeScript 지원 또는 **자동 완성**
- 서버 사이드 렌더링 지원

## Vuex와 비교???

- mutations는 더이상 존재하지 않습니다. 왜냐하면 mutatinos는 필요 이상으로 **장황하게 인식**되었기 때문입니다.
- TypeScript를 지원하기 위해 복잡한 사용자 지정 래퍼를 만들 필요가 없으며 모든 것이 입력되며 API는 TS 타입 추론을 최대한 활용하는 방식으로 설계되었습니다.
- 강력한 autocompletion
- 

## 설치

원하는 패키지 관리자로 설치합니다.

```
yarn add pinia
# or with npm
npm install pinia
```

> **Tip**
> 앱이 Vue 2를 사용하는 경우 구성 `@vue/composition-api`도 설치해야 합니다 . Nuxt를 사용하는 경우 [다음 지침](https://pinia.vuejs.org/ssr/nuxt.html) 을 따라야 합니다 .
> 

만약 Vue CLI를 사용하는 경우 이 [**비공식 플러그인**](https://github.com/wobsoriano/vue-cli-plugin-pinia) 을 대신 사용해 볼 수 있습니다.

pinia를 생성한 후 앱에 전달합니다.
```
import { createPinia } from 'pinia'

app.use(createPinia())
```

## Store란?

Store는 컴포넌트에 포함되지 않은 state 및 비즈니스 로직을 보유하고 있는 엔터티입니다. 즉 전역 상태를 호스팅 합니다. 언제 어디서든 사용 가능한 전역 컴포넌트와 비슷합니다. `state`, `getter`, `action`의 세 가지 개념이 있으며 이러한 개념이 `data`, `computed`, `methods`와 동일하다고 생각할 수 있습니다.

## 언제 Store를 이용해야 하나요?

Store에는 애플리케이션 전체에서 접근할 수 있는 데이터가 포함되어야 합니다. 예를 들어 네비게이션에 표시되는 사용자 정보와 같이 여러 곳에서 사용되는 데이터가 포함됩니다.

반면에 컴포넌트에서 관리될 수 있는 로컬 데이터를 Store에 포함하는 것은 피해야 합니다.
