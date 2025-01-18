# ESLint와 Prettier를 설정

## 프로젝트 구조
```
├── node_modules
│		└── ...
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   └── logo.svg
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   ├── WelcomeItem.vue
│   │   └── icons
│   │       ├── IconCommunity.vue
│   │       ├── IconDocumentation.vue
│   │       ├── IconEcosystem.vue
│   │       ├── IconSupport.vue
│   │       └── IconTooling.vue
│   └── main.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 설명

### `vite.config.js`

Vite 명령어로 dev 서버를 실행할 때 프로젝트 루트의 `vite.config.js` 파일 확인을 시도합니다. 그리고 내부에 설정된 값을 참고합니다.

```
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```


- `alias` : 파일 시스템의 경로에 별칭을 만들 때 사용합니다. 미리 설정된 `‘@’` 기호를 통하여 `‘./src’` 디렉토리에 절대경로로 쉽게 접근할 수 있습니다.

### `package.json`

`npm` 으로 관리하기 위한 프로젝트 정보를 갖고 있는 파일

## ESLint, Prettiser

- `ESLint` : [ESLint](https://eslint.org/)는 코드 검사기로 코드에 에러가 있는지 검사해주 도구 입니다.
- `Prettier` : [Prettier](https://prettier.io/)는 코드 포매터로 코드를 일관성있고 예쁘게 정렬해 주는 도구입니다.

현업에서는 대부분 ESLint와 Prettier를 함께 사용하고 있습니다.

### `.eslintrc.cjs`

```
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  }
}
```


- `plugin:vue/vue3-essential`
    
    [Available rules | eslint-plugin-vue](https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention-for-vue-js-3-x)
    
- `eslint:recommended`
    
    ✔️ 표시된 항목을 자동으로 검사해주는 옵션
    
    [List of available rules](https://eslint.org/docs/rules/)
    
- `@vue/eslint-config-prettier`
    
    불필요한 규칙이나 eslint와 prettier와 출동할 수 있는 규칙을 끄는 출동 방지용 패키지 입니다.
    
    Vue용 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
    
    이 구성은 @vue/cli 및 create-vue 설정에서 사용하도록 특별히 설계되었습니다.

```
    /* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-prettier',
	],
	env: {
		'vue/setup-compiler-macros': true,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
				endOfLine: 'auto', // 한줄 추가
			},
		],
	},
};
```

### VSCode 에서 ESLint 기반으로 Format On Save 설정하기
```
// settings.json
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        // "html",  // 삭제
        "vue",
        "markdown"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "editor.tabSize": 2,
}
```

- `eslint.validate`
    
    검사해야 하는 언어를 ESLint 확장에 알려줍니다.
    
- `editor.codeActionsOnSave`
    
    VS Code의 저장 이벤트에 대한 훅입니다.
    
- `source.fixAll.eslint`
    
    저장 중인 파일의 문제를 수정하라는 메시지가 표시됩니다.


## Rule

## 참고
- **공식 홈페이지 (ko)**
    
    [스타일 가이드 | Vue.js](https://v3.ko.vuejs.org/style-guide/#%E1%84%80%E1%85%B2%E1%84%8E%E1%85%B5%E1%86%A8-%E1%84%87%E1%85%A5%E1%86%B7%E1%84%8C%E1%85%AE)
    
- **공식 홈페이지 (en)**
    
    [Style Guide | Vue.js](https://vuejs.org/style-guide/)
    
- **ESLint VSCode format on save**
    
    [How to Format Code on Save in VS Code with ESlint | Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/blog/format-code-on-save-vs-code-eslint/)