# Watch, WatchEffect

## Watch

---

우리는 종종 반응형 상태가 변경 되었을때에 감지하여 다른 작업(api call 등)을 수행해야 하는 경우가 있습니다. 예를 들어 어떠한 상태가 변경 되었을때 DOM을 변경하거나 비동기 작업을해서 다른 상태를 변경하는 것입니다.

Composition API의 `watch` 함수를 사용 하여 반응형 상태가 변경될 때마다 특정 작업을 수행할 수 있습니다.
```
const message = ref('Hello World');

// message 데이터 변경에 
watch(message, (newValue, oldValue) => {
  console.log('newValue: ', newValue);
  console.log('oldValue: ', oldValue);
	// 어떠한 작업을 수행하는 "감시자" 역할을 합니다.
});
```

## Watch Source Type
```
watch(/* Source Type */, (newValue, oldValue) => {});
```

`watch`의 첫 번째 매개변수는 다양한 타입이 될 수 있습니다. ref, reactive, computed, getter 함수, array 타입일 될 수 있습니다.
```
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

다음과 같이 반응형 객체의 속성은 볼 수 없습니다.
```
const obj = reactive({ count: 0 });

// 숫자(number)를 전달하기 때문에 작동하지 않습니다.
watch(obj.count, (newValue) => {
	console.log('newValue: ', newValue);
});
```

대신 getter를 사용하세요.
```
const obj = reactive({ count: 0 });
watch(() => obj.count, (newValue) => {
  console.log('newValue: ', newValue);
});
```

## deep option

---

반응형 객체를 직접 `watch()` 하면 암시적으로 깊은 감시자가 생성됩니다. 즉, 속성 뿐만아니라 모든 중첩된 속성에도 트리거 됩니다.
```
const person = reactive({
  name: '홍길동',
  age: 30,
  hobby: '운동',
  obj: {
    count: 0,
  },
});

watch(person, (newValue) => {
  console.log('newValue: ', newValue);
});
```

`getter function`으로 객체를 넘길 경우에는 객체의 값이 바뀔 경우에만 트리거 됩니다. 즉, 중첩된 속성은 트리거되지 않습니다.
```
watch(
	() => person.obj,
	(newValue) => {
		// 객체의 값이 바뀔 경우에만 트리거 됩니다.
	}
);
```

`deep` 옵션을 사용하면 깊은 감시자로 강제할 수 있습니다.
```
watch(
  () => person.obj,
  (newValue) => {
    console.log('newValue: ', newValue);
  },
  { deep: true }
);
```

<aside>
💡 deep 옵션은 큰 데이터 구조에서 사용할 때 비용이 많이 들 수 있습니다. 필요한 경우에만 사용하고 성능 영향에 주의하십시오.

</aside>

## immediate 즉시실행

---

`immediate` 옵션을 사용하여 최초에 즉시실행 할 수 있다.
```
const message = ref('Hello World!');
const reverseMessage = ref('');

watch(
  message,
  (newValue) => {
    reverseMessage.value = newValue.split('').reverse().join('');
  },
  {
    immediate: true,
  }
);
```

또는 함수를 외부에 선언하여 즉시실행 할 수 있음. (WatchEffect로 하면 더 단순화 할 수 있음)
```
const message = ref('Hello World!');
const reverseMessage = ref('');

const reverseFn = () => {
  reverseMessage.value = message.value.split('').reverse().join('');
};

watch(message, reverseFn);
// 즉시실행
reverseFn();
```

## Computed vs Watch [공식문서](https://v3.ko.vuejs.org/guide/computed.html#computed-%E1%84%89%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC-vs-watch-%E1%84%89%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC)

---

`computed`와 `watch` 둘 다 비슷한 역할을 하고 있습니다.

- **computed**
```
const reverseMessage = computed(() =>
  message.value.split('').reverse().join('')
);
```

- watch
```
watch(
  message,
  (newValue) => {
    reverseMessage.value = newValue.split('').reverse().join('');
  }
);
```

### 어떻게 사용할 것인가

- **computed**
    
    Vue 인스턴스의 상태(ref, reactive 변수)의 종속 관계를 자동으로 세팅하고자 할 때는 `computed`로 구현하는 것이 좋다.
    
    위 예시 처럼 `reverseMessage`는 `message` 값에 따라 결정되어지는 종속관계에 있다.  이 종속관계 코드가 복잡해지면 `watch`로 구현할 경우 더 복잡해지거나 중복계산 또는 오류를 발생시킬 수 있다.
    
- **watch**
    
    Vue 인트턴스의 상태(ref, reactive 변수)의 변경 시점에 특정 액션(call api, push route 등)을 취하고자 할때 적합하다.
    
    대게의 경우 `computed`로 구현 가능한 것이라면 `watch`가 아니라 `computed`로 구현하는게 대부분 옳다.
    

## WatchEffect

WatchEffect는 콜백 함수 안의 반응성 데이터에 변화가 감지되면 자동으로 반응하여 실행합니다. 그리고 WatchEffect의 코드는 컴포넌트가 생성될 때 즉시 실행됩니다.
```
watchEffect(async () => {
  const { data } =
							await axios.get(`https://reqres.in/api/users?page=${page.value}`);
  items.value = data.data;
});
```

​
## `watch` vs `watchEffect`
watch와 watchEffect 둘 다 관련 작업(api call, push route 등)을 반응적으로 수행할 수 있게 해줍니다. 하지만 주요한 차이점은 관련된 반응형 데이터를 추적하는 방식입니다.
watch명시적으로 관찰된 소스만 추적합니다. 콜백 내에서 액세스한 항목은 추적하지 않습니다. 또한 콜백은 소스가 실제로 변경된 경우에만 트리거됩니다. watch종속성 추적을 부작용과 분리하여 콜백이 실행되어야 하는 시기를 보다 정확하게 제어할 수 있습니다.
watchEffect반면에 종속성 추적과 부작용을 한 단계로 결합합니다. 동기 실행 중에 액세스되는 모든 반응 속성을 자동으로 추적합니다. 이것은 더 편리하고 일반적으로 더 간결한 코드를 생성하지만 반응성 종속성을 덜 명시적으로 만듭니다.
