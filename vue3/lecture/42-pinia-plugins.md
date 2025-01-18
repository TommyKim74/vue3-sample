# Plugins


낮은 수준의 API 덕분에 Pinia Store를 완전히 확장할 수 있습니다.

- Store에 새 속성 추가
- Store을 정의할 때 새로운 옵션 추가
- Store에 새로운 방법 추가
- 기존 메서드 래핑
- actions 변경 또는 취소
- [로컬 스토리지](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 와 같은 부작용 구현
- 특정 Store**에만** 적용

플러그인은 `pinia.use()`를 사용하여 pinia 인스턴스에 추가됩니다. 가장 간단한 예는 객체를 반환하여 모든 저장소에 정적 속성을 추가하는 것입니다.
    
```
import { createPinia } from 'pinia'

// 이 플러그인이 설치된 후 생성되는 모든 저장소에 `secret`이라는 속성을 추가합니다.
// 이것은 다른 파일에 있을 수 있습니다.
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 플러그인을 pinia에 제공
pinia.use(SecretPiniaPlugin)

// 다른 파일에서
const store = useStore()
store.secret // 'the cake is a lie' 출력
```

이것은 router, modal, toast manager와 같은 전역 객체를 추가하는 데 유용합니다.

## 소개

Pinia 플러그인은 Store 추가할 속성을 선택적으로 반환하는 기능입니다. 그리고 context 매개변수를 받습니다.
```
export function myPiniaPlugin(context) {
	context.pinia // `createPinia()`로 생성된 pinia
	context.app // `createApp()`으로 생성된 현재 앱(Vue 3만 해당)
	context.store // 플러그인이 확장 중인 저장소
	context.options // `defineStore()`에 전달된 저장소를 정의하는 옵션 객체
}
```

이 함수를 pinia.use() 를 사용하여 파라미터로 전달합니다.
```
pinia.use(myPiniaPlugin)
```

플러그인은 `pinia`가 `app`에 전달된 후에 생성된 Store에만 적용됩니다.

## Store 확장

플러그인에서 객체를 반환하기만 하면 모든 Store에 속성을 추가할 수 있습니다.
```
pinia.use(() => ({ hello: 'world' }))
```

`store`에서 직접 속성을 설정할 수도 있지만, 가능한 경우 객체를 리턴하여 `devtools`에서 자동으로 추적할 수 있도록 합니다.
```
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

플러그인에 의해 반환된 모든 속성은 devtools에 의해 자동으로 추적되므로 devtools에서 `hello`를 표시하려면 devtools에서 디버그하려는 경우에만 dev 모드의 `store._customProperties`에 추가해야 합니다.
```
// 위의 예에서
pinia.use(({ store }) => {
  store.hello = 'world'
	// 번들러가 이것을 처리하는지 확인하십시오. webpack 및 vite는 기본적으로 수행해야 합니다.
  if (process.env.NODE_ENV === 'development') {
		// 스토어에서 설정한 키를 추가합니다.
    store._customProperties.add('hello')
  }
})
```

## 새로운 `state` 추가

Store에 새로운 `state` 속성을 추가하거나 hydration 중에 사용할 속성을 추가하려면 두 위치에 추가해야 합니다.

- Store에서 `store.myState`로 액세스할 수 있습니다.
- `store.$state`에서 devtools에서 사용할 수 있고 SSR 동안 직렬화할 수 있습니다.

이렇게 하면 ref 또는 계산된 속성을 공유할 수 있습니다.
