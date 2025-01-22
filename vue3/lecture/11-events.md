# 이벤트 처리

이벤트 처리는 `v-on`디렉티브로 사용할 수 있습니다. 그리고 `v-on`이벤트는 자주 사용하기 때문에 `@`단축 표현으로 많이 사용됩니다.

```
const counter = ref(0);
```

```
<div>
  <button @click="counter += 1">counter {{ counter }}</button>
</div>
```

## 메소드 이벤트 핸들러

---

`v-on` 디렉티브에서 메소드를 호출할 수 있습니다. 그리고 이때 매개변수로 `event` 객체를 받습니다.
```
const printEventInfo = (event) => {
  console.log(event.target);
  console.log(event.target.tagName);
};
```

```
<div>
  <button @click="printEventInfo">printEventInfo</button>
</div>
```

## 이벤트 객체 접근

---

인라인 핸들링에서 `event` 객체에 접근할 수 있습니다. 접근하는 방법는 `$event` 키워드를 사용합니다.
```
const printEventInfo2 = (message, event) => {
  console.log('messsage: ', message);
  console.log(event.target);
  console.log(event.target.tagName);
};
```

```
<button @click="printEventInfo2('hello world', $event)">
  inline event handler
</button>
```

## 이벤트 수식어(Modifiers)

---

우리는 이벤트를 조작할 때 이벤트 내부에서 `event.preventDefault()` 또는 `event.stopPropagation()` 메서드를 호출할 수 있습니다. 메소드에서 이러한 메소드의 호출은 어렵지 않지만 메소드 안에서 비즈니스 외에 이러한 코드는 비효율적입니다.

이 문제를 해결하기 위해 Vue는 `v-on` 이벤트에 다양한 **이벤트 수식어(Modifiers)**를 제공합니다.

- `.stop` = `e.stopPropagation()`
- `.prevent` = `e.preventDefault()`
- `.capture` = 캡처 모드를 사용할 때 이벤트 리스너를 사용 가능합니다.
- `.self` = 오로지 자기 자신만 호출할 수 있다. 즉, 타깃요소가 `self`일 때 발동된다.
- `.once` = 해당 이벤트는 **한 번만** 실행된다.
- `.passive` = 일반적으로 [**모바일 장치의 성능을 개선**](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners) 하기 위해 터치 이벤트 리스너와 함께 사용됩니다 .

```
<!-- 클릭 이벤트 전파가 중단되었습니다. -->
<a @click.stop="doThis"></a>

<!-- 제출 이벤트가 페이지를 다시 로드하지 않습니다. -->
<form @submit.prevent="onSubmit"></form>

<!-- 수정자는 체이닝이 가능합니다. -->
<a @click.stop.prevent="doThat"></a>

<!-- 단순히 수식어만 사용이 가능합니다. -->
<form @submit.prevent></form>

<!-- 캡처 모드를 사용할 때 이벤트 리스너를 사용 가능합니다.-->
<!--즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
<div @click.capture="doThis">...</div>

<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다.-->
<!-- 자식 엘리먼트에서는 처리되지 않습니다.-->
<div @click.self="doThat">...</div>

<div @scroll.passive="onScroll">...</div>
```

## 키 수식어

---

키보드 이벤트를 수신할 때 종종 특정 키를 확인해야 하는 경우가 있습니다. 그래서 Vue에서는 `v-on` 또는 `@` 디렉티브에 키 수식어를 제공합니다.

- `.enter`
- `.tab`
- `.delete` (”Delete”와 “Backspace” 키 모두를 수신합니다.)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
```
<input type="text" @keyup.enter="addTodo" />
```

## 시스템 키 수식어

---

다음 수식어를 사용해 해당 수식어 키가 눌러진 경우에만 마우스 또는 키보드 이벤트 리스너를 트리거 할 수 있습니다.

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` (Mac에서 meta는 command key, Window에서 meta는 윈도우키 입니다, 특정 키보드에서 [조금 다를 수 있음](https://v3.ko.vuejs.org/guide/events.html#%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7-%E1%84%89%E1%85%AE%E1%84%89%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%A5-%E1%84%8F%E1%85%B5%E1%84%86%E1%85%A9%E1%86%A8%E1%84%85%E1%85%A9%E1%86%A8))
```
<!-- 알트 + 엔터 -->
<input @keyup.alt.enter="clear" />

<!-- 컨트롤 + 엔터 -->
<input @keyup.ctrl.enter="send" />

<!-- 컨트롤 + 클릭 -->
<div @click.ctrl="doSomething">Do something</div>
```

## **`.exact` 수식어**

---

`.exact` 수식어는 정확한 조합이 눌러야하는 것을 요구합니다.
```
<!-- 아래코드는 Alt 또는 Shift와 함께 눌렀을 때도 실행됩니다.-->
<button @click.ctrl="onClick">A</button>

<!-- 아래코드는 Ctrl키만 눌려져 있을 때 실행됩니다.-->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 아래 코드는 시스템 키가 눌리지 않은 상태인 경우에만 작동합니다.-->
<button @click.exact="onClick">A</button>
```

## 마우스 버튼 수식어

---

- `.left`
- `.right`
- `.middle`
