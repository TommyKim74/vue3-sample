# ESLint, Prettier 설정


## ESLint, Prettier 확장 프로그램

---

- **ESLint**
    - JavaScript와 TypeScript 코드의 **문법 오류와 스타일을 검사**하는 확장 프로그램입니다. 주로 코드 품질을 유지하고, 코드 스타일의 일관성을 보장하며, **잠재적 오류를 사전에 방지**하는 데 사용됩니다.
    - **자동 수정 기능**: VSCode 설정에서 `eslint.codeActionsOnSave`를 활성화하면, 코드 저장 시 ESLint가 설정된 규칙에 따라 자동으로 문제를 수정합니다.
- **Prettier - Code Formatter**
    - JavaScript, TypeScript, HTML, CSS 등 다양한 언어의 **코드 포맷팅을 자동화**해 주는 확장 프로그램입니다. 코드 스타일을 일관되게 유지하고, 포매팅에 대한 규칙을 명확히 할 수 있어 **코드 리뷰 시간 절약과 가독성 향상**에 도움을 줍니다.
    - VSCode 설정에서 `editor.formatOnSave: true`로 설정하면, **저장할 때 자동으로 코드가 포맷팅**됩니다.

### 요약

- **ESLint**는 코드의 **문법 오류와 코드 스타일**을 검사하고, **Prettier**는 **코드 포맷팅을 자동화**하여 일관된 스타일을 유지하게 해줍니다.
- **ESLint**는 주로 **문법 오류 감지와 규칙 강제**에 초점이 맞춰져 있고, **Prettier**는 **포맷팅에 집중**하여 더 나은 코드 가독성을 제공하는 데 중점을 둡니다.
- 두 확장 프로그램을 함께 사용하면 **높은 코드 품질과 일관된 스타일**을 유지할 수 있습니다.

## ESLint v9

---

### 새로운 ESLint 설정 파일 flat config (`eslint.config.js`)

ESLint v9.0.0에서는 `eslint.config.js`가 새로운 ESLint 기본 설정 파일로 도입되었습니다. 이전 형식인 `eslintrc`는 이제 사용이 중단(deprecated)되며, 자동으로 검색되지 않습니다.

[Configuration Files - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/configuration-files)

### `eslint.config.js`

`eslint.config.js` 파일은 ESLint v9의 설정 파일 (`eslint.config.js`)로, **Vue와 JavaScript 프로젝트에 필요한 Linting 규칙과 설정을 정의**합니다. 이 설정 파일은 JavaScript와 Vue 파일에서 **코드 품질 검사 및 코드 스타일 유지**에 필요한 기본 규칙들을 적용하기 위한 것입니다.


- `eslint.config.js`
```
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    rules: {
      'no-console': 'warn',
      'vue/no-undef-components': 'error',
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
]
```

설명 포함:
```
// ESLint의 JavaScript 기본 규칙을 가져옵니다.
import js from '@eslint/js'

// Vue 파일에 대해 ESLint 검사를 수행하기 위한 Vue 전용 플러그인입니다.
import pluginVue from 'eslint-plugin-vue'

// Prettier와의 포맷팅 규칙 충돌을 방지하는 설정을 가져옵니다.
// Prettier는 코드 포맷팅을 담당하고, ESLint는 코드 품질 검사에 집중하도록 설정합니다.
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// ESLint 설정을 배열로 내보냅니다.
export default [
  {
    // Linting을 적용할 파일을 지정하는 설정입니다.
    // 여기서는 모든 .js, .mjs, .jsx, .vue 파일을 대상으로 합니다.
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    rules: {
      // console.log 사용을 경고 (개발 중에만 허용하고 배포 시 제거 권장)
      'no-console': 'error',
      // 정의되지 않은 Vue 컴포넌트를 사용하는 것을 방지하는 ESLint 규칙
      'vue/no-undef-components': 'error',
    },
  },

  {
    // Linting에서 무시할 파일을 지정하는 설정입니다.
    // dist, dist-ssr, coverage 디렉토리 내의 모든 파일을 Linting에서 제외합니다.
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // ESLint의 JavaScript 권장 규칙 세트를 적용합니다.
  // 기본적인 JavaScript 코드 품질 유지와 오류 방지를 위한 규칙들이 포함되어 있습니다.
  js.configs.recommended,

  // Vue 필수 규칙 세트를 적용합니다.
  // Vue 파일에서 발생할 수 있는 기본적인 오류와 스타일 문제를 방지하는 필수 규칙들이 포함되어 있습니다.
  ...pluginVue.configs['flat/essential'],

  // 포맷팅 관련 규칙을 비활성화하여 Prettier와 충돌을 방지합니다.
  // 이를 통해 Prettier가 포맷팅을 담당하고, ESLint는 코드 품질 검사에 집중할 수 있습니다.
  skipFormatting,
]

```

## Prettier
---

- `.prettierrc.json`
```
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "bracketSpacing": true,
  "endOfLine": "auto"
}
```

설명 포함:
```
{
  // JSON schema URL로, Prettier 설정 파일이 올바른지 검증하는 데 사용
  "$schema": "https://json.schemastore.org/prettierrc",

  // 명령문 끝에 세미콜론을 추가하지 않음
  "semi": false,

  // 문자열에 홑따옴표(single quote)를 사용
  "singleQuote": true,

  // 화살표 함수의 인자가 하나일 경우 괄호를 생략
  "arrowParens": "avoid",

  // 탭 대신 공백을 사용하고 들여쓰기 크기를 2칸으로 설정
  "tabWidth": 2,

  // 여러 줄에 걸친 구문에서 마지막 항목 뒤에 쉼표를 추가
  "trailingComma": "all",

  // 한 줄의 최대 길이를 80자로 제한
  "printWidth": 80,

  // 객체 리터럴에서 중괄호 양쪽에 공백을 추가
  "bracketSpacing": true,

  // 줄바꿈 방식에 대해 자동 감지 (OS에 맞게 LF 또는 CRLF 적용)
  "endOfLine": "auto"
}
```


## 전체 Linting, format

---

- **`npm run lint`**: ESLint로 코드 규칙 검사 및 자동 수정(`-fix`)을 수행.
- **`npm run format`**: Prettier로 `src/` 디렉토리의 코드 포맷을 일관되게 정리.

```
npm run lint
npm run format
```

## `.editorconfig`

---

`.editorconfig` 파일은 프로젝트의 **코딩 스타일을 일관성 있게 유지하기 위한 설정 파일**입니다. 이 파일을 프로젝트에 추가하면, 팀원들이 다른 코드 편집기를 사용해도 설정된 스타일이 적용되어 **일관된 코드 스타일**을 유지할 수 있습니다. 다양한 코드 편집기에서 `.editorconfig` 파일을 지원합니다.

### 설정 설명
```
[*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

- `[*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}`
    - 여기서는 `.js`, `.jsx`, `.mjs`, `.cjs`, `.ts`, `.tsx`, `.mts`, `.cts`, `.vue` 파일에 대해 설정을 적용합니다.

### 각 설정 항목 설명

- **`charset = utf-8`**
    - 파일의 문자 인코딩을 UTF-8로 설정합니다.
    - 대부분의 프로젝트에서 표준으로 사용되는 인코딩 방식입니다.
- **`indent_size = 2`**
    - 들여쓰기 크기를 2칸으로 설정합니다.
    - JavaScript와 TypeScript 같은 언어에서 주로 사용되는 들여쓰기 크기입니다.
- **`indent_style = space`**
    - 들여쓰기를 공백(space)으로 설정합니다.
    - 공백을 사용하면 다양한 환경에서 일관된 들여쓰기를 유지할 수 있습니다.
- **`insert_final_newline = true`**
    - 파일의 마지막에 빈 줄을 추가합니다.
    - POSIX 표준을 따르는 방식으로, 일부 도구에서는 마지막에 빈 줄이 없을 경우 경고가 발생하기도 합니다.
- **`trim_trailing_whitespace = true`**
    - 줄 끝의 불필요한 공백을 자동으로 제거합니다.
    - 코드가 깔끔하게 유지되고, 불필요한 공백으로 인한 스타일 불일치를 방지합니다.

### 요약

이 `.editorconfig` 파일은 **JavaScript, TypeScript, Vue 파일에 적용될 코딩 스타일을 정의**합니다. UTF-8 인코딩, 2칸 들여쓰기, 줄 끝 공백 제거, 파일 마지막에 빈 줄 추가 등의 설정을 통해 **코드의 일관성을 유지**하고 가독성을 높입니다.

## `jsconfig.json`

---

`jsconfig.json` 파일은 **JavaScript 프로젝트의 설정을 정의**하는 파일입니다. 이 파일은 주로 **VSCode에서 JavaScript 프로젝트를 더 효과적으로 관리**하기 위해 사용됩니다. **파일 경로 별칭 설정**이나 **타입 검사 옵션** 등을 정의할 수 있습니다. 이 설정 파일을 통해 VSCode는 프로젝트의 구조를 이해하고, **경로 자동 완성**, **오류 검사**, **코드 네비게이션** 등을 지원합니다.

```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### 각 항목 설명

- **`compilerOptions`**:
    - **컴파일러 옵션**을 설정하는 객체입니다. 여기서는 **경로 별칭**을 정의하는 데 사용됩니다.
    - **`paths`**:
        - **경로 별칭**을 설정하여 **상대 경로를 간단하게 줄여 쓸 수 있도록** 합니다.
        - 예를 들어, `"@/*": ["./src/*"]` 설정을 통해 `@`를 `src` 디렉토리로 매핑합니다. 이렇게 하면 `import Something from '@/components/Component'`처럼 `@`로 시작하는 경로를 `src` 디렉토리 하위 경로로 해석할 수 있습니다.
        - 이 설정은 코드의 가독성을 높이고, 경로를 짧게 작성하여 **유지보수성을 개선**하는 데 유용합니다.
- **`exclude`**:
    - **Linting(VSCode 자체)과 타입 검사에서 제외할 디렉토리나 파일**을 지정합니다.
    - `"node_modules"`와 `"dist"` 디렉토리를 제외하여, **불필요한 외부 패키지와 빌드 결과물에 대해 검사하지 않도록** 설정합니다. 이로 인해 **프로젝트의 성능을 최적화**할 수 있습니다.

## 비교

---

| 특징 | **ESLint** | **Prettier** | **EditorConfig** | **settings.json** |
| --- | --- | --- | --- | --- |
| **목적** | 코드 품질 유지 및 오류 검사 | 코드 포맷팅 (스타일 일관성) | 기본적인 코드 스타일 유지 (편집기 설정) | 프로젝트별 VSCode 설정 적용 |
| **주요 기능** | 문법 오류 검사, 규칙 강제, 코드 품질 개선 | 들여쓰기, 따옴표, 줄 길이 등 코드 스타일 포맷팅 | 탭/공백, 인코딩, 줄바꿈 등 편집기 설정 적용 | VSCode 확장 기능, 코드 자동 포맷팅, 폰트 크기 등 편집기 설정 |
| **파일 형식** | `.eslintrc`, `eslint.config.js` | `.prettierrc` | `.editorconfig` | `.vscode/settings.json` |
| **설정 대상 파일** | JavaScript, TypeScript, Vue 등 소스 코드 파일 | 모든 코드 파일 (HTML, CSS 등 포함) | 모든 파일 | VSCode 편집기에서 열리는 모든 파일 |
| **우선순위** | 높은 우선순위, 코드 품질 및 오류 검사 목적 | ESLint 이후, 스타일 정리에 주로 사용 | ESLint와 Prettier 보완, 편집기 기본 설정 보장 | Prettier 및 ESLint 설정을 제어하여 프로젝트별 커스터마이징 |

### **우선순위**

**`ESLint` > `Prettier` > `EditorConfig` > `settings.json`**