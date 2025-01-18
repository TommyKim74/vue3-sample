# Setup hook

## Setup

`setup()` 함수(hook)는 Composition API 사용을 위한 진입점 역할을 합니다.

그리고 `setup` 함수는 컴포넌트 인스턴스가 생성되기 전에 실행됩니다.

- 라이프사이클 이미지
    
    
    ![lifecycle.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c8e4caa-b9e6-42ca-acc6-df7ea52c91d5/lifecycle.png)
    

## 기본 사용

**반응형 API(Reactivity API)**를 사용하여 반응형 상태를 선언하고 `setup()`에서 객체를 반환하여 `<template>`에 노출할 수 있습니다. 반환된 객체의 속성은 구성 요소 인스턴스에서도 사용할 수 있습니다(다른 옵션이 사용되는 경우):

```
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 템플릿 및 기타 Options API hook에 노출
    return {
      count
    }
  },
  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## Props 접근

`setup` 함수의 첫 번째 매개변수는 `props` 입니다. `props`는 **반응형** 객체입니다.

```
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

`props` 객체를 구조 분해 할당을 하면 반응성을 잃게 됩니다. 따라서 항상 `props.xxx` 형식으로 `props`에 액세스하는 것이 좋습니다.

**toRef, toRefs**

만약 `props`의 반응성을 유지하면서 구조 분해 할당을 해야 한다면(예: 외부 함수에 prop을 전달해야 하는 경우) `toRefs()` 및 `toRef()` 유틸리티 API를 사용하여 이를 수행할 수 있습니다.

```
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // turn `props` into an object of refs, then destructure
    const { title } = toRefs(props)
    // `title` is a ref that tracks `props.title`
    console.log(title.value)

    // OR, turn a single property on `props` into a ref
    const title = toRef(props, 'title')
  }
}
```

## Setup Context

`setup` 함수에 전달된 두 번째 매개변수는 **Setup Context** 객체입니다. 컨텍스트 객체는 `setup` 함수내에서 유용하게 사용할 수 있는 속성을 갖고 있습니다.

```
export default {
  setup(props, context) {
    // 속성($attrs와 동일한 비반응형 객체)
    console.log(context.attrs)

    // 슬롯($slots에 해당하는 비반응성 개체)
    console.log(context.slots)

    // 이벤트 발생($emit에 해당하는 함수)
    console.log(context.emit)

    // Public한 속성, 함수를 외부에 노출시에 사용
    console.log(context.expose)
  }
}
```

컨텍스트 객체는 반응형이 아니며 안전하게 구조 분해 할당을 할 수 있습니다.

```
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

**attrs, slots**

`attrs`와  `slots`은 컴포넌트 자체가 업데이트될 때 항상 업데이트되는 상태 저장 객체입니다. 이러한 것들은 구조 분해 할당을 피해야 하며 항상 속성을 `attrs.x` 또는 `slot.x`로 접근해야 한다는 것을 의미합니다. 또한 `props`와 달리 `attrs`과 `slots`의 속성은 반응형이지 않습니다. `attrs` 또는 `slots` 변경에 따라 다른 작업을 하려고 하는 경우 `onBeforeUpdate` **라이프사이클 훅** 내에서 수행할 수 있습니다.

### 공공 자산 노출

`expose`은 [**template refs](https://vuejs.org/guide/essentials/template-refs.html#ref-on-component)(템플릿 참조)**를 통해 상위 컴포넌트에서 컴포넌트의 인스턴스에 접근할 때 노출되는 속성을 명시적으로 제한하는 데 사용할 수 있는 함수입니다.

```
export default {
  setup(props, { expose }) {
    // make the instance "closed" -
    // i.e. do not expose anything to the parent
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selectively expose local state
    expose({ count: publicCount })
  }
}
```

## Render 함수 사용

`setup`은 동일한 범위에서 선언된 반응형 상태를 직접 사용할 수 있는 [**render function**](https://vuejs.org/guide/extras/render-function.html) 를 반환할 수도 있습니다.

```
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

render function을 반환하면 다른 것을 반환할 수 없습니다. 내부적으로는 문제가 되지 않지만 template refs(템플릿 참조)를 통해 이 컴포넌트의 메서드를 상위 컴포넌트에 노출하려는 경우 문제가 될 수 있습니다.

이때 [**`expose()`**](https://vuejs.org/api/composition-api-setup.html#exposing-public-properties)를 호출하여 이 문제를 해결할 수 있습니다.

```
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```