# isRef, unref, isProxy, isReactive, isReadonly


## isRef()

값이 ref 객체인지 확인합니다.
```
if (isRef(foo)) {
	foo.value
}
```

## unref()

매개변수가 ref이면 내부 값(`.value`)을 반환하고 아니면 매개변수 자체를 반환합니다. 이것은 다음 표현식에 대한 syntactic sugar 입니다. `val = isRef(val) ? val.value : val`
```
function useFoo(x) {
	const unwrapped = unref(x)
}
```

## isReactive()

객체가 `reactive()` 또는 `shallowReactive()`에 의해 생성된 프록시인지 확인합니다.
```
const person = reactive({...})
isReactive(person)
```

## isReadonly()

객체가 `readonly()` 또는 `shallowReadonly()`에 의해 생성된 프록시인지 확인합니다.
```
const option = readonly({...});
isReadonly(option)
```

## isProxy()

객체가 `reactive()`, `shallowReactive()`, `readonly()`, `shallowReadonly()`에 의해 생성된 프록시인지 확인합니다.
```
isProxy(person)
isProxy(option)
```