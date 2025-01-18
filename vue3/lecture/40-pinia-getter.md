# Getters


Getter는 Store 상태에 대한 computed와 정확히 동일합니다. defineStore()의 getters 속성으로 정의할 수 있습니다. 그들은 화살표 함수의 사용을 장려하기 위해 첫 번째 매개변수로 state를 받습니다.
```
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
})
```

대부분의 경우 `getter`는 `state`에만 의존하지만 `다른 getter`를 사용해야 할 수도 있습니다. 이 때문에 일반 함수를 정의할 때 이를 통해 전체 저장소 인스턴스에 액세스할 수 있지만 리턴 타입의 타입(TypeScript에서)을 정의해야 합니다. 이것은 TypeScript의 알려진 제한으로 인한 것이며 화살표 함수로 정의된 getter나 이것을 사용하지 않는 getter에 영향을 미치지 않습니다.
```
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // // 자동으로 리턴 타입을 숫자로 유추합니다.
    doubleCount(state) {
      return state.counter * 2
    },
		// 리턴 타입은 **반드시** 명시적으로 설정되어야 합니다.
    doublePlusOne(): number {
			// 전체 Store에 대한 자동 완성 및 입력 ✨
      return this.doubleCount + 1
    },
  },
})
```

그런 다음 Store 인스턴스에서 직접 getter에 액세스할 수 있습니다.
```
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useStore()

    return { store }
  },
}
</script>
```

## 다른 getter에 접근

`computed`와 마찬가지로 여러 getters를 결합할 수 있습니다. 이를 통해 다른 getter에 액세스하십시오. TypeScript를 사용하지 않더라도 JSDoc을 사용하여 유형에 대해 IDE에 힌트를 줄 수 있습니다.
```
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
		// `this`를 사용하지 않기 때문에 유형이 자동으로 유추됩니다.
    doubleCount: (state) => state.counter * 2,
    // 여기에 유형을 직접 추가해야 합니다(JS에서 JSDoc 사용). 우리는 또한 할 수 있습니다
		// 이것을 사용하여 getter를 문서화합니다.
		/**
		* 카운터 값 곱하기 2 더하기 1을 반환합니다.
		*
		* @returns {숫자}
		*/
    doubleCountPlusOne() {
			// autocompletion ✨
      return this.doubleCount + 1
    },
  },
})
```

## getter에 매개변수 전달

getter에서 함수를 반환하여 모든 매개변수를 받을 수 있습니다.
```
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

컴포넌트에서 사용
```
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

이 작업을 수행할 때 getter는 더 이상 캐시되지 않으며 단순히 호출하는 함수입니다. 그러나 getter 자체 내부에 일부 결과를 캐시할 수 있습니다. 이는 드물지만 더 성능이 좋을 것입니다.
```
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

## 다른 Store getters에 접근

다른 Store getter를 사용하려면 getter 내부에서 직접 사용할 수 있습니다.
```
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## `setup()` 에서 사용

Store의 속성으로 모든 getter에 직접 접근할 수 있습니다.
```
export default {
  setup() {
    const store = useStore()

    store.counter = 3
    store.doubleCount // 6
  },
}
```

## Options API에서 사용

### setup() 함수와 사용
```
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2
    },
  },
}
```

### setup() 함수 없이 사용

이전 상태 섹션에서 사용한 것과 동일한 `mapState()`함수를 사용하여 getter에 매핑할 수 있습니다.
```
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // gives access to this.doubleCounter inside the component
    // same as reading from store.doubleCounter
    ...mapState(useCounterStore, ['doubleCount'])
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // you can also write a function that gets access to the store
      double: store => store.doubleCount,
    }),
  },
}
```
