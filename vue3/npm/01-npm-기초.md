# NPM 기초 강좌


## npm 이란 무엇인가?

---

NPM(Node Package Manager)은 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저입니다. [npm 공식 사이트](https://www.npmjs.com/)에 공개된 수많은 자바스크립트 라이브러리를 npm 명령어로 쉽게 설치하여 사용할 수 있습니다.

<aside>
💡 프로그램이 사용하는 기능과 같은 것을 `패키지` = `라이브러리` = `모듈` 이라고 합니다.
넓은 의미에서 같은 말이니 어렵게 생각하지 않으셔도 돼요.

</aside>

### 왜 npm을 사용해야 하는가?

- 프로젝트에서 필요한 라이브러리를 쉽게 다운받을 수 있다. (npm install로 프로젝트에서 필요한 라이브러리를 한꺼번에 다운받는다.)
- 프로젝트에서 사용하는 많은 라이브러리의 버전과 의존성 관리가 편하다.
- 필요한 라이브러리를 CDN 보다 편하게, npm 명령어를 통해 프로젝트 로컬 환경 및 전역 환경에 쉽게 설치하고 관리할 수 있다.
- 빌드하는 명령어를 자동화해 프로젝트를 관리할 수 있다.

## npm 설치하기

---

npm은 Node.js설치 시 자동으로 설치가 됩니다. 따라서 npm을 사용하기 위해서는 Node.js를 설치해야 합니다.

### Node.js 란

Node.js는 Chrome V8 JavaScript 엔진 으로 빌드된 JavaScript 런타임입니다.

### Node.js 설치

1. [공식 홈페이지](https://nodejs.org/ko/)에서 NodeJS 설치
    
    [Node.js](https://nodejs.org/ko/)
    
    <aside>
    💡 NodeJS 설치시 다른 프로그램과 호환 문제가 있을 수 있기 때문에 **LTS** 설치를 권장
    
    </aside>
    
2. 설치가 끝났으면 아래 명령어로 제대로 설치가 되었는지 확인합니다.
```
>> node -v
v16.13.2
>> npm -v
8.5.2
```

3. node 테스트
    - test.js 생성
```
function sum(num1, num2) {
	return num1 + num2;
}
console.log('sum: ', sum(10, 20));
```

- node 로 실행
```
>> node test.js
sum: 30
```


## npm 시작하기

---

learn-npm 폴더를 npm으로 관리할 프로젝트라고 하고 npm을 실습해 보도록 하겠습니다.

- 우선 프로젝트 폴더를 생성합니다.
```
mkdir learn-npm
```

- 프로젝트 안으로 이동하여 package.json 파일을 생성해주세요
```
cd learn-npm
touch package.json
```

- package.json 파일안에 name과 verison을 입력해주세요.
```
{
	"name": "learn-npm",
	"version": "0.0.1"
}
```

- 날짜나 시간을 쉽게 표현할 수 있는 dayjs 라는 라이브러리를 설치해보도록 하겠습니다.
```
npm install dayjs
```

### package.json

package.json 파일은 프로젝트에 대한 정보를 갖고 있는 파일이다. 그리고 `dependencies`와 같은 속성을 활용하여 프로젝트에 의존된 라이브러리를 관리한다.

package.json 파일은 직접 작성할 수도 있고, `npm init` 명령어를 통하여 자동으로 생성할 수 있다.

| 속성 | 설명 |
| --- | --- |
| `name` | 프로젝트 이름으로 가장 중요하다. (필수항목) |
| `version` | 프로젝트 버전을 정의한다. 주로 3단계 버전을 사용한다. (필수항목) |
| `description` | 프로젝트 설명을 기술한다. npm search로 검색된 리스트에 표시되기 때문에 사람들이 패키지를 찾아내고 이해하는 데 도움이 된다. |
| `keywords` | 프로젝트를 검색할 때 참조되는 키워드이다.
description과 마찬가지로 npm search로 검색된 리스트에 표시된다. |
| `private` | **true** 로 설정되면 npm 게시를 거부합니다.
이 값은 개인 리포지토리가 실수로 게시되는 것을 방지합니다. |
| `main` | main은 프로그램의 기본 진입점 입니다. |
| `scripts` | 프로젝트에서 자주 실행하는 명령어를 scripts로 작성해두면 npm 명령어로 실행 가능하다. |
| `author` | 제작자의 이름을 지정합니다. |
| `license` | 패키지에 대한 라이선스를 지정하여 사람들이 패키지를 사용할 수 있는 방법과 패키지에 대한 제한 사항을 알 수 있도록 해야 합니다. |
| `dependencies` | - 프로젝트에서 사용하는(의존하는) 모듈을 기술하는 부분이다. 따라서, 이 프로젝트가 어떤 모듈을 사용하는지 한눈에 볼 수 있다.
- 애플리케이션을 설치할 때 이 내용을 참조하여 필요한 확장 모듈을 자동으로 설치한다.
따라서 개발한 애플리케이션에서 사용하는 모듈은 여기에 꼭 명시를 해주어야 한다. |
| `devDependencies` | 개발할 때만 의존하는 모듈을 관리한다. |
- **package.json docs**
    
    [package.json | npm Docs](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
    
- **예) axios > package.json**
    
    [axios/package.json at master · axios/axios](https://github.com/axios/axios/blob/master/package.json)
    
- **예) vue-enterprise-boilerplate > package.json**
    
    [vue-enterprise-boilerplate/package.json at main · bencodezen/vue-enterprise-boilerplate](https://github.com/bencodezen/vue-enterprise-boilerplate/blob/main/package.json)
    

### node_modules

`node_modules` 디렉토리에는 `package.json` 에 설치된 모듈 뿐만 아니라, `package.json`에 있는 모듈이 의존하고 있는(`package-lock.json`) **모듈 전부가 설치된 디렉토리**이다.


### package-lock.json

프로젝트에 설치된 모듈들의 의존성 트리를 기록하고 있으며, `package-lock.json` 파일을 참고하여 `node_modules` 디렉토리안에 모듈을 다운받습니다.

### npm 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm init` | 새로운 프로젝트(패키지)를 시작할 때 사용하는 명령어로 package.json 파일을 생성합니다. |
| `npm init -y` | `-y` 옵션을 사용하여 기본값을 자동으로 설정할 수 있습니다. |
| `npm install <패키지명>` (축약 `i`) | 패키지(= 라이브러리, 모듈)를 설치하는 명령어 입니다. (로컬 설치) |
| `npm install <패키지명@버전>` | 버전과 함께 사용하면 특정 버전을 설치할 수 있습니다. |
| `npm install --save` 축약 `-S` | `--save` 옵션을 사용하면 dependencies에 추가됩니다.
(npm@5 버전 이후부터는 디폴트로 `--save` 옵션이 적용됨.) |
| `npm install --save-dev` 축약 `-D` | 사용하면 devDependencies에 추가됩니다. |
| `npm install <패키지명1> <패키지명2>`  | 여러개를 설치할 수 있습니다. |
| `npm install -g <패키지명>` | 전역 설치를 할 수 있습니다. (또는 `--global`) |
| `npm install` | package.json에 설정된 모든 패키지를 설치 |
| `npm install --production` | package.json에 설정된 모든 패키지를 설치 (devDependencies 제외) |
| `npm uninstall <패키지명>` | 로컬 패키지 삭제 |
| `npm uninstall -g <패키지명>` | 전역 패키지 삭제 |
| `npm update <패키지명>` | 설치한 패키지를 업데이트 합니다. |
| `npm root` | 로컬 패키지 설치 디렉토리 확인 |
| `npm root -g` | 전역 패키지 설치 디렉토리 확인 |
| `npm ls` | 로컬 설치된 패키지 확인 |
| `npm ls -g` | 전역 설치된 패키지 확인 |
| `npm start` | package.json 파일의 script 속성의 start 실행 |
| `npm run <script-name>` | package.json 파일의 script 속성의 start외 스트립트 실행 |

**NPM Command**

[CLI Commands | npm Docs](https://docs.npmjs.com/cli/v7/commands)

## 전역설치 vs 지역설치

---

- 시스템 상에서 해당 라이브러리의 명령어를 인식하게끔 설정하기위해서 전역 설치를 한다. (ex. vue-cli)
- 프로젝트에서 사용할 라이브러리는 지역설치
- 시스템 레벨에서 사용할 자바스크립트 라이브러리(해당 라이브러리명을 명령어로 인식)는 전역설치

```bash
npm install -g nodemon
```

<aside>
💡 유닉스 리눅스 맥OS에서 관리자 권한으로 실행은 명령어 앞에 “**sudo**”를 붙이고, 윈도우에서는 cmd를 실행할 때 마우스 우클릭 후 “**관리자 권한으로 실행**”을 클릭해서 명령어를 입력하시면 됩니다.

</aside>

## 버전

---

기본적으로 버전은 `[MAJOR , MINOR, PATCH]` 로 구성되어 있다.  이러한 표기법은 **시맨틱 버저닝(Semantic Versioning)** 규칙을 따르고 있다.

`package.json` 에 버전 명시를 다음과 같이 할 수 있다.

`1.2.3` `>1.2.3` `>=1.2.3` `<1.2.3` `<=1.2.3` `~1.2.3` `^1.2.3`


### 시맨틱 버저닝(***Semantic Versioning***)

시맨틱 버저닝(Semantic Versioning)은 소프트웨어의 버전 변경 규칙에 대한 제안입니다.

`[MAJOR , MINOR, PATCH]` (ex. 1.0.2)

- `MAJOR` - 주요변화, 기존 API 추가/변경/삭제 등, 이전 버전과 호환이 안될 수 있음
- `MINOR` - 기능추가, 이전 버전과 호환됨
- `PATCH` - 버그수정, 이전 버전과 호환됨

### 틸드(~)

틸드는 현재 지정한 버전의 마지막 자리 내의 범위에서만 자동으로 업데이트 한다.

- `~0.0.1`  : ****`>=0.0.1 <0.1.0`
- `~0.1.1`  : `>=0.1.1 <0.2.0`
- `~0.1`  : `>=0.1.0 <0.2.0`
- `~0`  : `>=0.0 <1.0`

### 캐럿(^)

**캐럿(`^`)은 Node.js 모듈이 이 SemVer의 규약을 따른다는 것을 신뢰한다는 가정하에서 동작한다.**
그래서 MINOR나 PATCH버전은 하위호환성이 보장되어야 하므로 업데이트를 한다.

- `^1.0.2` : `>=1.0.2 <2.0`
- `^1.0` : `>=1.0.0 <2.0`
- `^1` : `>=1.0.0 <2.0`

## 참고

---

- **nodejs.org - nodejs 설치**
    
    [Node.js](https://nodejs.org/ko/)
    
- **npmjs.com - 패키지 검색**
    
    [npm](https://www.npmjs.com/)
    
- **NPM Docs**
[docs](https://nodejs.dev/learn/an-introduction-to-the-npm-package-manager)