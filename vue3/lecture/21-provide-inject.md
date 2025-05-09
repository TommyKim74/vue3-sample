# Provide / Inject

## Prop Drilling

일반적을 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달해야 할 때 **props**를 사용합니다. 하지만 규모가 큰 컴포넌트 트리가 있고 깊이 중첩된 자손 컴포넌트에 데이터를 전달해야 한다면 해당 자손 컴포넌트와 연관된 모든 자식 컨포넌트에게 동일한 prop을 전달해야 합니다.

![prop srilling](https://gymcoding.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa32a4a35-7d50-4770-92b5-53ccab618fce%2Fprop-drilling.11201220.png?table=block&id=60a21768-1f30-42a1-a4ca-1250cde7e3b1&spaceId=34c3bb9a-fd4a-4827-a490-5a2912b6a1ed&width=1420&userId=&cache=v2)

`<Root>`에서 `<DeepChild>` 컴포넌트에 데이터를 전달하기 위해서는 `<Footer>` 컴포넌트를 거쳐 데이터를 전달해야 합니. 만약 더 긴 상위 체인이 있으면 더 많은 상위 컴포넌트들이 영향을 받습니다. 이것을 “Prop Drilling”이라고 합니다.

“Prop Drilling” 문제는 Vue3의 `provide`와 `inject`로 해결할 수 있습니다. `provide`와 `inject`를 사용하면 데이터를 제공하는 상위 컴포넌트는 **dependency provider** 역할을 합니다. 그리고 데이터를 받는 하위 컴포넌트는 깊이에 관계 없이 **dependency provider**가 제공하는 종속성(data, function 등)을 주입받을 수 있습니다.

![provide-inject](https://gymcoding.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa16c00d9-8c24-4c69-8573-3ba1398117cc%2Fprovide-inject.3e0505e4.png?table=block&id=417a4e54-03d2-4cc1-8f1c-259d53ae7b76&spaceId=34c3bb9a-fd4a-4827-a490-5a2912b6a1ed&width=1420&userId=&cache=v2)

## Provide

하위 컴포넌트 항목에 데이터를 제공하려면 **provider** 역할을 하는 상위 컴포넌트 `setup()` 함수 내부에수 있습니다.
```
import { provide } from 'vue';

export default {
  setup() {
    provide('message', 'hello!');
  },
};
```

`provide()` 함수는 두 개의 파라미터를 받습니다.

- 첫 번째 파라미터는 **주입 키** : ****`문자열` 또는 `Symbol`이 될 수 있습니다. **주입 키**는 하위 컴포넌트에서 주입된 값을 조회하는 데 사용됩니다.
- 두 번째 파라미터는 **제공된 값** : 값은 refs와 같은 반응성 데이터를 포함하여 모든 유형이 될 수 있습니다.
```
import { provide, ref } from 'vue';

export default {
  setup() {
    const message = ref('Hello World!');
    provide('message', message);
    return {
      message,
    };
  },
};
```

반응성 데이터를 사용하면 제곤된 값을 사용하는 하위 컴포넌트가 공급자 컴포넌트에 대한 반응 연결을 설정할 수 있습니다.

## Inject

상위 컴포넌트에서 제공한 데이터를 삽입하려면 하위 컴포넌트 `setup()` 함수 내부에서 `inject()` 함수를 사용할 수 있습니다.
```
import { inject } from 'vue';
export default {
  setup() {
    const message = inject('message');
    const appMessage = inject('appMessage');
    return {
      message,
      appMessage,
    };
  },
};
```

주입된 값이 ref이면 반응성 연결을 유지할 수 있습니다.

### Injection 기본값

만약에 `inject`로 주입된 키가 상위 체인 어디에서든 제공되지 않을경우 런타임 경고가 표시됩니다. 이 때 두 번째 인자로 **기본값(Default Value)**을 설정할 수 있습니다.
```
const defaultMessage = inject('defaultMessage', 'default message');
```

기본값으로 팩토리함수를 제공할 수도 있습니다.
```
const defaultMessage = inject('defaultMessage', () => 'default message');
```

## Reactivity

Provide/Inject를 반응성 데이터로 제공할 때 **가능한 모든 변경을 Provider 내부에서 하는 것이 좋습니다.** 이렇게 Provider 내부에 배치되면 향후 유지관리가 용이합니다.

만약에 injector 내부 컴포넌트에서 반응성 데이터를 변경해야 하는 경우 데이터 변경을 제공하는 함수를 함께 제공하는 것이 좋습니다.
```
// Provider
const message = ref('Hello World!');
const updateMessage = () => {
  message.value = 'world!';
};
provide('message', { message, updateMessage });
```

```
// Injector
const { message, updateMessage } = inject('message');
```

그리고 주입된 컴포넌트에서 제공된 값을 변경할 수 없도록 하려면 readonly() 함수를 사용할 수 있습니다.
```
import { provide, readonly, ref } from 'vue';

provide('count', readonly(count));
```

## Symbol 키 사용

대규모 애플리케이션에서 다른 개발자와 함께 작업할 때 잠재적 충돌을 피하기 위해 Symbol 주입 키를 사용하는 것이 가장 좋습니다.
```
// keys.js
export const myInjectionKey = Symbol()
```

```
// in provider component
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* data to provide */
})
```

```
// in injector component
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

## App-level Provide

컴포넌트에서 데이터를 제공하는 것 외에도 App-level에서 제공할 수도 있습니다.
```
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app.provide('appMessage', 'Hello app message');
app.mount('#app');
```

### Provide/Inject 사용 예

App-level에서의 Provide는 앱에서 렌더링되는 모든 컴포넌트에서 사용할 수 있습니다. 이것은 [Plugin](https://vuejs.org/guide/reusability/plugins.html)을 작성할 때 유용합니다.

Vue2에서 컴포넌트 인스턴스 객체를 추가할 때 global property에 추가 했으나, Vue3에서 Composition API Setup 함수에서는 컴포넌트 인스턴스에 접근할 수 없다.

이때 대신 Provide/Inject를 사용할 수 있다.

### 참고

[**Vue3 Config Global Properties**](https://vuejs.org/api/application.html#app-config-globalproperties)