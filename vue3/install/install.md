## Vue 설치방법

---

Vue를 설치할 수 있는 방법은 크게 3가지가 있습니다. 

- 페이지에 **CDN** package로 import 하기
- **npm**을 사용하여 import 하기
- 공식 **CLI**를 사용하여 프로젝트를 scaffold하고, 최신 프론트엔드 워크플로우(예. hot-reload, lint-on-save 등)를 위한 batteries-included build를 제공합니다.

<aside>
💡 **scaffold**란? 개발을 용이하기 시작할 수 있는 발판을 제공해주는 것을 말합니다.

**batteries-included**란? 외부 라이브러리를 더하지 않아도 기본적으로 제공하는 표준 라이브러리만으로도 시작하는데 문제 없다는 의미로 해석할 수 있습니다.

</aside>

### CDN

프로토타이핑 또는 학습 목적이라면, 아래 코드로 최신 버전을 사용할 수 있습니다.

```html
<script src="https://unpkg.com/vue@next"></script>
<!-- 또는 -->
<script src="https://unpkg.com/vue@3.2.31"></script>
```

### npm

Vue를 사용하여 대규모 애플리케이션을 구축할 때 NPM를 이용한 설치를 권장하고 있습니다. NPM은 Webpack 또는 Browserify와 같은 모듈 번들러와 잘 작동합니다.

```bash
npm install vue**@3.1.9** // 강의시 버전과 동일하게 프로젝트를 생성합니다.
```

### Vue CLI

Vue CLI는 웹팩 기반 빌드도구 입니다. 하지만 Vue CLI는 현재 유지관리 모드에 있습니다. 특정 특정 웹팩 기능에 의존하지 않는한 Vite로 새 프로젝트를 시작하는 것이 좋습니다.

Vue CLI를 사용하기 위해서는 `@vue/cli` v4.5 이상의 버전을 설치해야 합니다.

```bash
npm install -g @vue/cli
```

- [Vue CLI에서 Vite로 마이그레이션하는 방법 정보](https://vuejs.org/guide/scaling-up/tooling.html#project-scaffolding)

### Vite

[Vite(비트)](https://github.com/vitejs/vite)는 Vue SFC를 지원하고 매우 가볍고 빠른 빌드 도구입니다. Vue!의 저자이기도 한 Evan You가 만들었습니다!

Vite는 개발 서버를 구동할 때 매우 빠릅니다. 그리고 소스 코드의 변경이 일어났을 때 전체 모듈을 번들링 하는게 아니라 변경된 모듈만 교체하기 때문에 개발을 더욱더 빠르게 진행할 수 있습니다.

그러면 vite로 프로젝트를 구성해 보도록 하겠습니다.

```bash
npm init vue@latest
```

```bash
cd {product name}
npm install
npm run dev
```

이 명령은 공식 Vue 프로젝트 스캐폴딩 도구인 [create-vue 를 설치하고 실행합니다.](https://github.com/vuejs/create-vue)

- Vite에 대해 자세히 알아보려면 [Vite 문서](https://vitejs.dev/)를 확인하세요 .
- Vite 프로젝트에서 Vue 관련 동작을 구성하려면(예: Vue 컴파일러에 옵션 전달) [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme)