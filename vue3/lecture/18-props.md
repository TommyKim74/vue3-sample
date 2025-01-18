# Props

## Props

블로그를 구축하는 경우 블로그 게시글을 나타내는 컴포넌트가 있다고 가정해 보겠습니다. 이때 모든 블로그 게시글의 UI나 레이아웃은 동일하지만 게시글의 제목, 내용과 같은 데이터는 각각 다릅니다. 그러면 **컴포넌트에 각각 제목이나 내용과 같은 데이터를 전달해야 하는데** 이때 `Props`를 사용하여 컴포넌트로 데이터(속성)를 전달할 수 있습니다.

## Props 란?

**`Props`란? 컴포넌트에 등록할 수 있는 사용자 정의 속성**입니다. 블로그 게시글 컴포넌트에 사용자 정의 속성을 선언하면 이 컴포넌트를 사용하는 부모 컴포넌트에서 데이터(속성)를 전달할 수 있습니다.

## Props 선언

Vue 컴포넌트에는 명시적 `props` 선언이 필요합니다. 왜냐하면 컴포넌트에 전달된 외부 props가 fallthrough 속성으로 처리되어야 함을 알 수 있습니다

<aside>
💡 fallthrough 속성
   props 또는 emits에 명시적으로 선언되지 않은 속성 또는 이벤트
</aside>

### 문자열 배열 선언

컴포넌트에 `props` 옵션을 사용하여 선언할 수 있습니다.
```
// BlogPost.vue
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

### 객체문법 선언

문자열 배열을 사용하여 `props`를 선언하는 것 외에도 객체 문법을 사용하여 속성 타입과 함께 선언할 수도 있습니다.
```
export default {
  props: {
    title: String,
    likes: Number
  },
	setup(props) {
		console.log(props.title)
		console.log(props.likes)
	}
}
```

`props` 선언시 key는 속성명이고 value는 속성 타입입니다. 더 자세히 선언하고 싶다면 value에 고급 옵션인 객체를 선언할 수 있습니다.
```
{
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function
    default() {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
}
```
- `type` : `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol` 모든 기본 생성자 또는 모든 사용자 정의 타입이 올 수 있습니다. (예: `Person`, `Animal`)
    
    그리고 `[Number, String]` 배열을 이용하여 여러개의 타입을 선언할 수 있습니다.
    
- `default` : 속성값이 비어 있거나 `undefined`를 전달 받는 경우 기본값을 선언할 수 있습니다. 그리고 객체 또는 배열 타입인 경우 기본값을 팩토리 함수를 사용하여 반환해야 합니다.
- `required` : 속성이 필수값이라면 `true`로 해서 설정할 수 있습니다.
- `validator` : 속성값의 유효성 검사가 필요할 때 사용할 수 있습니다.

컴포넌트 사용시 `type`, `required`, `validator` 명시된 사항을 위반할 때 개발모드에서 콘솔 경고가 발생됩니다.

## Props 사용

- 선언된 props를 `<template>`에서 바로 사용할 수 있습니다.
```
<template>
	<p>{{ title }}</p>
</template>
```
- setup() 함수의 첫 번째 매개변수로 props 객체를 받아 사용할 수 있습니다.
```
export default {
	setup(props) {
		return { };
	},
};
```

- 컴포넌트 인스턴스(this)의 $props 객체로 접근할 수 있습니다. (Options API)
```
<template>
	<p>{{ $props }}</p>
</template>
<script>
export default {
	created() {
		// 객체로 접근
		this.$props

		// 
		this.title
	}
};
</script>
```

## Props Name Casing

- `props` 선언시에는 camelCase를 사용하여 이름을 선언합니다. 이렇게 하면 속성 키로 사용할 때 따옴표를 사용할 필요가 없고 유효한 JavaScript 식별자이기 때문에 템플릿 표현식에서 직접 참조할 수 있기 때문입니다.
```
export default {
	props: {
		greetingMessage: String
	}
}
```
```
<span>{{ greetingMessage }}</span>
```

속성에 값을 전달할 때는 kebab-case를 사용하는 것을 권장합니다.
```
<MyComponent greeting-message="hello"></MyComponent>
```

## 객체를 사용하여 다중 속성 전달

객체의 모든 속성을 props로 전달하려는 경우 `v-bind`에 `전달인자(예, v-bind:prop-name)`없이 사용할 수 있습니다.

예를 들어, 다음과 같이 `post`객체가 선언되어 있다고 가정하겠습니다.
```
export default {
	setup() {
		const post = ref({
			id: 1,
			title: 'Learn Vue3'
		})
		return {
			post
		}
	}
}
```

아래 두 가지 전달 방법은 동일합니다.
```
<!-- 객체를 사용한 다중 속성 전달(전달인자 없음) -->
<BlogPost v-bind="post" />
```

```
<BlogPost :id="post.id" :title="post.title" />
```

## 단방향 데이터 흐름

모든 `props`는 상위 속성과 하위 속성간에 **단방향 바인딩**으로 형성되어 있습니다. 만약 상위 속성이 업데이트되면 하위 속성도 업데이트되지만 그 반대는 아닙니다. 이러한 성질은 하위 속성 변경 실수로 상위 속성을 변경하여 앱의 데이터 흐름을 이해하기 어렵게 만드는 것을 방지할 수 있습니다.

또한 상위 컴포넌트가 업데이트될 때마다 하위 컴포넌트의 모든 `props`는 최신 상태도 초기화 됩니다. 그렇기 때문에 **자식 컴포넌트 내부에서 `props`를 변경하지 않아야 합니다.**
```
export default {
	props: ['title'],
	setup(props) {
		// ❌ warning, props are readonly!
		props.title = 'changed title';
	}
}
```

**일반적으로 props를 하위 컴포넌트에서 변경하고 싶은 두 가지 경우가 있습니다.**

1. **prop은 초기 값을 전달하는 데 사용됩니다. 자식 컴포넌트에서 속성 값을 로컬 데이터 속성으로 사용 하고자할 때 입니다.** 이 경우 prop을 초기 값으로 사용하는 로컬 변수를 선언하는 것이 가장 좋습니다.
```
export default {
	props: ['initialWidth', 'initialHeight'],
	setup(props) {
		// width는 props.initialWidth 값으로 초기화 됩니다.
		// 향후 props 업데이트의 연결이 끊어집니다.
		const width = ref(props.initialWidth)
		const height = ref(props.initialHeight)
		return {
			width,
			height
		}
	}
}
```

2. prop의 값의 변환이 필요할 때 입니다. 이 경우 computed를 사용하면 좋습니다. 그리고 상위 속성의 변경을 유지할 수 있습니다.
```
export default {
	props: ['size'],
	setup(props) {
		// 향후 props 업데이트의 연결이 유지됩니다.끊어집니다.
		const rectangleSize = computed(() => props.size.trim().toUpperCase());
		return {
			rectangleSize
		}
	}
}
```

### **객체 / 배열 Props 업데이트**

객체(object)나 배열(array)이 props로 전달되면 자식 컴포넌트에서는 prop 바인딩(값 변경)을 변경할 수 없지만 객체 또는 배열의 중첩 속성은 변경할 수 있습니다. 이것은 JavaScript에서 객체와 배열이 참조 타입(Reference Type)으로 전달되고 Vue가 이러한 변경을 방지하는것은 부당한 비용이 들기 때문입니다.

이러한 변경의 단점은 하위 컴포넌트가 상위 컴포넌트에 명확하지 않은 방식으로 상위 속성 업데이트 하게 되면 잠재적으로 향후 데이터 흐름을 추론하기 어렵게 만든다는 것입니다. 그렇기 때문에 가장 좋은 방법은 부모와 자식이 의도적으로 밀접하게 연관되어 있지 않는한 이러한 변경은 피하는 것입니다. 만약 변경이 필요하다면 자식 컴포넌트에서 **`emit`을 이용하여 부모 컴포넌트가 스스로 변경을 수행할 수 있도록** 이벤트를 내보내야 합니다.

## Boolean Casting

`Boolean`타입의 Props는 특별한 캐스팅 규칙이 있습니다. `<MyComponent>` 가 다음과 같이 선언되어 있습니다.
```
export default {
	props: {
		disabled: Boolean
	}
}
```

`<MyComponent>`는 다음과 같이 사용할 수 있습니다.
```
<MyComponent>는 다음과 같이 사용할 수 있습니다.
```

## 반응형을 잃지 않는 구조분해 할당

---

### `toRef`

### `toRefs`