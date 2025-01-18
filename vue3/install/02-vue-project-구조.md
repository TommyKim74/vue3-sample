# 프로젝트 구조 설명

## 프로젝트 구조
---

```
.vscode/                     # VSCode 설정 파일
├── extensions.json          # 권장 확장 프로그램 목록
└── settings.json            # 프로젝트별 VSCode 설정

public/                      # 가공되지 않는 정적 파일
├── favicon.ico              # 브라우저 탭 아이콘

src/                         # 소스 파일 디렉토리
├── assets/                  # 컴포넌트에서 import하는 정적 리소스
├── components/              # 재사용 가능한 Vue 컴포넌트
├── router/                  # Vue Router 설정 파일
├── stores/                  # Pinia 또는 Vuex 상태 파일
├── views/                   # 페이지 컴포넌트
├── App.vue                  # 최상위 Vue 컴포넌트
└── main.js                  # Vue 애플리케이션 진입 파일

.gitignore                   # Git에 포함하지 않을 파일 목록
index.html                   # Vue 애플리케이션의 기본 HTML 파일
package.json                 # 프로젝트 의존성 및 스크립트 정의
.editorconfig                # 코드 스타일 규칙
.prettierrc.json             # Prettier 설정 파일
eslint.config.js             # ESLint 설정 파일
README.md                    # 프로젝트 설명서
vite.config.js               # Vite 설정 파일
jsconfig.json                # JavaScript/TypeScript 경로 별칭 및 컴파일 옵션
```
1. **`.vscode/`**
    - **`extensions.json`**: 프로젝트에서 권장하는 VSCode 확장 프로그램 목록이 저장됩니다. 팀원들이 같은 개발 환경을 쉽게 구성할 수 있도록 도와줍니다.
        - 리스트에 추가되는 것은 확장프로그램 식별자 명입니다. `@recommended`로 검색
            
            ![스크린샷 2024-11-04 오후 6.48.42.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/34c3bb9a-fd4a-4827-a490-5a2912b6a1ed/4d247793-8173-470e-bc5f-c7696a1eec9a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-11-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.48.42.png)
            
            ![스크린샷 2024-11-04 오후 6.48.34.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/34c3bb9a-fd4a-4827-a490-5a2912b6a1ed/f45ac952-b627-444b-9725-d82c6aefdd42/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-11-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.48.34.png)
            
    - **`settings.json`**: 이 프로젝트에서 사용되는 VSCode 설정을 정의하여, 팀원 간에 일관된 개발 환경을 유지할 수 있도록 합니다.
        - `.vscode/settings.json`
            
            ```jsx
            {
              // 파일 탐색기에서 파일 중첩 기능을 활성화
              "explorer.fileNesting.enabled": true,
            
              // 파일 중첩 패턴 설정
              // 특정 파일이 다른 파일의 하위에 중첩되어 표시되도록 설정합니다.
              "explorer.fileNesting.patterns": {
                // tsconfig.json 파일에 중첩될 파일 설정
                // 예: tsconfig.*.json, env.d.ts 파일이 tsconfig.json 하위에 중첩 표시됨
                "tsconfig.json": "tsconfig.*.json, env.d.ts",
            
                // vite.config.* 파일에 중첩될 파일 설정
                // 예: jsconfig*, vitest.config.*, cypress.config.*, playwright.config.* 파일이 vite.config.* 하위에 중첩 표시됨
                "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
            
                // package.json 파일에 중첩될 파일 설정
                // 예: package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .prettier*, prettier*, .editorconfig 파일이 package.json 하위에 중첩 표시됨
                "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .prettier*, prettier*, .editorconfig"
              },
            
              // 파일 저장 시 코드 액션을 자동으로 실행
              // 모든 가능한 코드 수정을 자동으로 적용하도록 설정합니다.
              "editor.codeActionsOnSave": {
                "source.fixAll": "explicit"
              },
            
              // 파일 저장 시 자동으로 코드 포매팅 실행
              "editor.formatOnSave": true,
            
              // 기본 코드 포매터로 Prettier 설정
              "editor.defaultFormatter": "esbenp.prettier-vscode"
            }
            ```
            
2. **`public/`**
    - **정적 파일 디렉토리**: `public` 디렉토리 내의 파일들은 **빌드 시 가공되지 않고 그대로 최종 결과물에 포함**됩니다. 예를 들어, `index.html`에서 이 디렉토리 내의 파일에 절대 경로(`/favicon.ico`)로 접근할 수 있습니다.
3. **`src/assets/`**
    - **정적 리소스 디렉토리**: 이미지, 폰트, 스타일 시트와 같은 정적 리소스가 저장됩니다.
    - `src` 폴더 내의 컴포넌트와 함께 사용할 리소스를 주로 이곳에 배치합니다. 예를 들어, Vue 컴포넌트에서 이미지 파일을 참조할 때 **import 문을 통해 로드할 파일들**을 여기에 저장합니다.
4. **`src/`**
    - **`components/`**: 재사용 가능한 Vue 컴포넌트 파일들이 위치합니다. UI 요소 등 여러 곳에서 사용할 수 있는 컴포넌트들이 이곳에 저장됩니다.
    - **`router/`**: Vue Router 설정 파일이 위치하는 디렉토리입니다. 라우팅 관련 설정과 파일들이 이곳에 저장됩니다.
    - **`stores/`**: 상태 관리 라이브러리인 Pinia 또는 Vuex의 상태 파일을 저장하는 디렉토리입니다. 전역 상태 관리가 필요한 경우 이 디렉토리를 사용합니다.
    - **`views/`**: 각 페이지 컴포넌트가 저장되는 디렉토리입니다. `Home`, `About`과 같은 라우트에 매핑되는 주요 화면 컴포넌트가 위치합니다.
    - **`App.vue`**: Vue 앱의 최상위 컴포넌트 파일로, 전체 애플리케이션의 구조를 정의합니다.
    - **`main.js`**: Vue 애플리케이션의 진입 파일로, Vue 인스턴스를 생성하고 `App.vue`를 렌더링합니다.
5. **프로젝트 루트**
    - **`.gitignore`**: Git에 포함하지 않을 파일과 디렉토리를 정의합니다. 예를 들어, `node_modules`나 환경 설정 파일을 제외합니다.
    - **`index.html`**: Vue 애플리케이션의 기본 HTML 파일로, `public` 폴더 내의 정적 파일과 `src` 폴더 내의 컴포넌트를 로드하는 역할을 합니다.
    - **`package.json`**: 프로젝트에서 사용하는 모든 의존성과 스크립트가 정의되어 있습니다. npm 스크립트를 통해 개발 서버 시작, 빌드 등의 작업을 관리합니다.
    - **`.editorconfig`**: 코드 스타일 규칙을 정의하여, 모든 팀원들이 동일한 코드 스타일을 유지하도록 돕습니다.
    - **`.prettierrc.json`**: Prettier 설정 파일로, 코드 포맷팅 규칙을 정의하여 일관된 코드 스타일을 유지합니다.
    - **`eslint.config.js`**: ESLint 설정 파일로, JavaScript/TypeScript 코드의 스타일과 오류를 검사합니다.
    - **`README.md`**: 프로젝트에 대한 설명서 파일로, 프로젝트 사용 방법과 설치 방법 등을 문서화할 때 사용됩니다.
    - **`vite.config.js`**: Vite 설정 파일로, Vite의 설정을 통해 빌드와 개발 서버의 동작을 정의합니다.
    - **`jsconfig.json`**: JavaScript와 TypeScript의 경로 별칭 및 컴파일 옵션을 정의하여, 경로 설정을 쉽게 하고 코드를 더 명확하게 작성할 수 있도록 합니다.

---

### `public/` vs `src/assets/` 차이점 요약

- **`public/`**: 파일들이 **가공 없이 그대로 복사**되며, 절대 경로로 접근하는 정적 파일을 넣습니다. 예를 들어, `favicon.ico`나 `index.html`에서 직접 참조할 파일이 여기에 위치합니다.
- **`src/assets/`**: **컴포넌트에서 import하여 사용**되는 정적 리소스(이미지, 스타일 등)를 보관합니다. 빌드 시 가공되고 최적화되며, 실제로 사용된 파일들만 포함됩니다.