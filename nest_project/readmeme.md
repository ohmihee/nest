# nestjs란
nestjs는 nodejs의 프레임워크의 하나이다. 타입스크립트와 OOP(Object Oriented Programming)를 지원한다.

## nestjs 초기 세팅
// nodejs는 설치되었다고 가정한다.
- npm i -g @nestjs/cli 
// nest cli 를 사용할 수 있도록 전역에 nest client인 @nestjs/cli를 설치한다.
- nest new project_name // 프로젝트의 기본 구조를 생성하여 준다. 

cd project_name
npm install
npm run start

## 폴더 구조 설명
### .eslintrc.js
코드 작성시 일정한 기준에 맞추어 코드를 작성할 수 있도록 도와주는 라이브러리이다. 타입스크립트 가이드 라인 제시, 문법 오류시 알려주는 역할을 한다.

### .prettierrc
.eslintrc.js 파일과 비슷한 역할을 하며, 주로 코드 형식을 맞추는데 사용된다.
작은 따옴표(') 사용할지 큰 따옴표(")를 사용할지 등 코드의 포멧터 역할을 한다. 


.eslintrc가 좀 더 문법 위주의 코드 작성 기준을 잡는 역할을 하고 .prettierrc는 코드 형식 위주의 코드 작성 기준을 잡는 역할을 한다. 

### nest-cli.json
nest.js 프로젝트 자체의 설정을 위해 필요한 것을 작성하여 주는 파일이다.

### package.json
프로젝트에 대한 전반적인 정보를 담고 있는 파일이다.
ex) 프로젝트명, 사용된 라이브러리, 실행 명령어 등

### src
nestjs 프로젝트를 위한 대부분의 서비스 관련 로직이 들어가 있는 폴더이다.

##### main.ts
프로젝트의 시작점을 담당하는 파일이다.

# 흐름
main.ts -> app.module.ts -> app.controller.ts, app.service.ts
main.ts를 시작점으로 하여 프로그램이 실행되고, 실행된 후 localhost:3000으로 들어오면 controller의 getHello()가 작동하여 'Hello World'를 응답하는 service의 getHello를 요청하고 controller는 service의 getHello를 최종적으로 응답하여 주게 된다. 
// ex) express와 비교하여 설명하면, main.ts는 흔히 index.ts로 app.listen을 통해 서버를 실행하여 주는 역할과 같고, app.module.ts는 server.ts에서 import express from 'express'.... 이와 같이 서버의 기본 설정을 해주는 부분이라 생각하면 되고, app.controller는 라우터 역할, app.service는 실질적인 서비스 로직이 짜여있는 곳이라 이해하면 될 것 같다.

# decorator (데코레이터)
이름 말 그대로 다른 객체를 꾸며주는 역할을 하는 함수이다.

# 직접 구현하여 보기
## 모듈 생성
// nest는 nestcli로 대부분의 기본적인 틀을 구현하여 준다.
// nest cli를 통해 컨트롤러나 서비스 생성시에는 모듈 코드 안에 자동으로 추가도 해주나.
> neset [기능] [생성하려는것] [생성하려는것의이름] --[옵션]

> nest g module boards
- nest : using nestcli
- g : generate
- module : schematic that i want to create
- borads : name of the schematic

목표 boardModule과 AuthModule 구현
1. BaordModule 구성
- BoardController
- BoardEntity
- BoardService
- BoardRespository
- ValidattionPipe
2. AuthModule 구성
- AuthController
- UserEntity
- AuthService
- UserRespository
- JWT, Passport

### @Controller
컨트롤러는 @Controller 데코레이터를 클래스를 데코레이션하여 사용한다. @Controller([경로])  ex) @Controller('/user')

> nest g controller boards --no-spec
- nest : using nestcli
- g : generate
- controller : controller schematic
- boards : name of the schematic
// --no-spec: 테스트를 위한 소스 코드 생성x

> nest g service boards --no-spec
- nest: using nestcli
- g: generate
- service: service schematic
- boards: name of the schematic
// --node-spec

#### Handler
- @Get
- @Post
- @Delete 등
컨트롤러 클래스 내의 단순 메서드이다.

// https://www.youtube.com/watch?v=3JminDpCJNE&list=RDCMUCFyXA9x8lpL3EYWeYhj4C4Q&start_radio=1&rv=3JminDpCJNE&t=129

