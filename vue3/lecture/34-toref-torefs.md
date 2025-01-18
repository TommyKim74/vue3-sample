# toRef, toRefs


## toRef

반응형 객체의 속성을 하나의 ref 객체로 만들 때 사용된다. 생성된 ref 객체는 원본 반응형 객체의 속성과 동기화 됩니다. 원본 속성을 변경하면 ref 객체가 업데이트되고 그 반대의 경우도 마찬가지 입니다.
```
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// 참조를 변경하면 원본이 업데이트됩니다.
fooRef.value++
console.log(state.foo) // 2

// 원본을 변경하면 ref도 업데이트됩니다.
state.foo++
console.log(fooRef.value) // 3
```

`ref`와 `toRef`는 다릅니다.
```
const fooRef = ref(state.foo)
```
위의 ref 객체(fooRef)는 프리미티브 값을 초기화 값으로 받기 때문에 `state.foo`와 동기화 되지 않습니다.

### **toRef 활용**

`toRef()`는 Composable 함수에 Props 참조를 전달하려는 경우에 유용합니다.
```
import { toRef } from 'vue'

const props = defineProps(/* ... */)

// `props.foo`를 ref로 변환한 다음
useSomeFeature(toRef(props, 'foo'))
```

`toRef()`가 `props`와 함께 사용 되면 `props`변경에 대한 제한사항이 계족 적용됩니다. ref에 새 값을 할당하려는 시도는 prop을 직접 수정하려는 것과 동일하게 판단되며 허용되지 않습니다.

새 값을 할당하려는 상황이라면 toRef() 대신 `computed(get, set)`를 활용할 수 있습니다.

그리고 toRef는 반응형 객체의 속성이 존재하지 않아도 사용 가능한 ref 객체를 반환합니다.

## toRefs

반응형 객체를 **구조분해 할당 후 반응형을 그대로 유지**하고 싶을 때 사용합니다.

반응형(reactive) 객체를 구조 분해하여 재할당 할 경우 반응형으로 동작하지 않습니다. 이렇게 반응형으로 동작하지 않는것은 매우 당연한 일입니다. (call by value)
```
let position = reactive({
  x: 0,
  y: 0,
});
let { x, y } = position;
x++;
y++;
console.log(x, y);                   // 1 1
console.log(position.x, position.y); // 0 0
```

이때 반응성을 유지하기 위해 reactive 객체의 각각의 속성을 `ref`로 변환해 주는 것이 `toRefs`입니다. `toRefs`를 사용하면 `reactive` 객체 각각의 속성이 `ref` 값으로 변환 됩니다. 그렇기 때문에 구조 분해 할당으로 재할당을 하게 되면 재할당 받은 `ref` 참조 값(예: `x`, `y`)과 `reactive` 객체의 속성은 동기화가 됩니다.
```
let position = reactive({
  x: 0,
  y: 0,
});
let { x, y } = toRefs(position);
x.value++;
y.value++;
console.log(x.value, y.value);       // 1 1
console.log(position.x, position.y); // 1 1
```

### toRefs 활용

`toRefs()`는 일반 함수나 Composable 함수에서 Reactive객체를 반환 받는 경우에 유용합니다.
```
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // ...logic operating on state

  // convert to refs when returning
  return toRefs(state)
}

// can destructure without losing reactivity
const { foo, bar } = useFeatureX()
```

Composable 함수에서 반환값을 `ref`로 반환해야 하는 컨벤션(규칙)이 있습니다. 하지만 Composable 함수 내부에서 reactive 객체를 사용하고 싶을때가 있는데요.

이때 `toRefs()`함수를 사용하여 내부에서 사용한 `reactive`객체를 반환시에 `ref`로 변환할 수 있습니다.
```
<template>
	<div></div>
</template>

<script>
import { reactive, readonly } from 'vue';

export default {
	setup() {
		const original = reactive({
			count: 0,
		});
		const copy = readonly(original);
		original.count++;
		copy.count++;
		console.log(original.count);
		console.log(copy.count);
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
```

