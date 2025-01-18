# # Vue  3 프로젝트 구성

## 프로젝트 생성

---

`npm create vue` 명령어는 내부적으로 **`npx [create-vue](https://www.npmjs.com/package/create-vue)`** 명령어를 사용하여 Vue 프로젝트를 생성합니다.

- **설명**: 기본 버전(`v3.11.1`)을 사용하여 Vite 프로젝트를 생성합니다. 2024년 11월 현재, 기본 버전은 `v3.11.1`입니다. 이 버전은 npm이 지정한 기본 설정을 따릅니다. 프로젝트 생성 시점의 최신 버전이 아니라, 설치된 npm 환경에서 설정된 기본 버전을 사용합니다.
    - 현재 최신 버전 : `v3.12.0`
    - 현재 기본 버전 : `v3.11.1`
- **명령어**:
    
    ```bash
    npm create vue
    # 또는
    npm init vue
    # 3.11.2 특정 버전으로 프로젝트 생성하기
    npm create vue@3.11.2
    # 최신 버전으로 프로젝트 생성하기
    npm create vue@latest
    ```
    
    위 명령어들은 동일하게 기본 버전의 Vite를 사용해 프로젝트를 설정합니다.
    

<aside>
❗

**최신 버전이 좋을까요?**

최신 기능을 필요로 하거나 새로운 기술을 배우고자 할 때는 최신 버전을 사용하는 것이 좋습니다. 그러나 안정성과 호환성이 중요한 경우, 특히 운영 중인 프로젝트라면 기존 버전을 유지하거나 LTS(Long Term Support) 버전을 사용하는 것이 더 적합할 수 있습니다.

</aside>

## 생성
---

![install](https://gymcoding.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F34c3bb9a-fd4a-4827-a490-5a2912b6a1ed%2Fe099ee65-d9bf-47b4-af20-0cc06188cbb0%2F%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-04_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.43.41.png?table=block&id=1346a10d-310b-8098-82b1-ecef9a9cab27&spaceId=34c3bb9a-fd4a-4827-a490-5a2912b6a1ed&width=1420&userId=&cache=v2)


### 프로젝트 설정 옵션

- **Add TypeScript?**: TypeScript를 사용할지 여부를 선택합니다. `Yes`를 선택하면 TypeScript를 지원하는 Vue 프로젝트가 생성됩니다.
- **Add JSX Support?**: JSX(JavaScript XML)를 지원할지 선택합니다. JSX는 React와 유사한 방식으로 UI를 작성할 수 있도록 해줍니다.
- **Add Vue Router for Single Page Application development?**: Vue Router를 추가할지 선택합니다. **Vue Router**는 **SPA(Single Page Application)**에서 페이지 이동을 가능하게 하는 라우팅 라이브러리입니다.
- **Add Pinia for state management?**: 상태 관리 라이브러리인 **Pinia**를 추가할지 선택합니다. Pinia는 Vuex의 대안으로, Vue 3와 호환되는 공식 상태 관리 도구입니다.
- **Add Vitest for Unit Testing?**: 단위 테스트 도구인 **Vitest**를 추가할지 선택합니다. Vitest는 빠른 테스트 환경을 제공하며, Vue 프로젝트에 쉽게 통합할 수 있습니다.
- **Add an End-to-End Testing Solution?**: E2E(End-to-End) 테스트 솔루션을 추가할지 선택합니다. E2E 테스트는 애플리케이션의 전체 흐름을 검증하는 데 사용됩니다.
- **Add ESLint for code quality?**: 코드 품질을 유지하기 위한 **ESLint**를 추가할지 선택합니다. ESLint는 코드 오류 및 스타일을 검사하여, 일관된 코드 품질을 유지할 수 있도록 도와줍니다.
- **Add Prettier for code formatting?**: 코드 포매터인 **Prettier**를 추가할지 선택합니다. Prettier는 코드를 자동으로 정리하여 일관된 코드 스타일을 유지할 수 있도록 해줍니다.
- **Add Vue DevTools 7 extension for debugging? (experimental)**: Vue DevTools의 실험적 버전인 **Vue DevTools 7**을 추가할지 선택합니다. 이 확장은 디버깅을 더 쉽게 할 수 있도록 도와줍니다.

## 의존성 패키지 설치
---

```
cd vue3-latest
npm install
```