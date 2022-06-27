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

* 서비스를 컨트롤러에서 사용하기 위해서는 종속성 주입(Dependency Injection)을 해주어야 한다.
// 종속성 주입은 컨트롤러의 클래스의 constructor()를 통해 한다.

#### Handler
- @Get
- @Post
- @Delete 등
컨트롤러 클래스 내의 단순 메서드이다.

#### Provider? 
nestjs의 기본 개념이다. Nest클래스는 서비스, 리포지토리, 팩토리 해러 등 provider로 취급될 수 있다.
Provider의 주요 아이디어틑 종속성으로 주입할 수 있다는 것이다. Provider를 사용하기 위해서는 nest에 등록해주어야 하는데, 이는 module 파일의 providers 항목에 사용하려는 provider를 넣으면 된다.
boards.module.ts 파일 참고

#### Service?
@Injectable 데코레이터를 사용하여 모듈에 제공된다. 컨트롤러에서 데이터의 유효성 체크, 데이터베이스 crud 등의 작업을 수행한다.

##### 서비스 crud 작업
- nestjs에서는 @Body를 통해 body 값을 가져올 수 있다.
- @Param : 경로에서 값 가져올 때
ex )   @Param() params: string[]   // 여러 값 가져오는 경우
ex )   @Param('id') id: string   // 한 개의 값만 가져오는 경우
- @Body : body 값 가져올 때


###### DTO (Data Transfer Object)
계층 간 데이터 교환을 위한 객체, DB에서 데이터를 얻어 사용하는 객체를 의미한다.
DTO는 interface나 class를 통해 만드는데 nestjs에서는 class를 이용할 것을 권장한다.

# Pipe
nestjs에서 파이프는 @Injectable () 데코레이터로 주석이 달린 클래스이다.
Pipe는 데이터변환과 데이터 유효성 확인을 위해 사용된다.
즉 요청이 들어오면 거치게 되는 미들웨어라고 생각하면 쉽다.

* Data Transformation (데이터 변환)
입력 데이터를 형식을 바꾸어주는 것
ex) number타입을 스트링 형식으로 바꾸어 주거나, 토큰 형식으로 온 값에서 본래의 값을 추출해내거나

* Data Validattion (데이터 유효성 확인)
입력 데이터의 형식이 유효한것이 맞는지 확인하는 것
ex) 10 글자 이상의 요청이 들어와야할때 입력 값이 10글자 이상이 맞는지

- Handler-level Pipes
// controller.ts 파일에서 @usePipes 데코레이터를 통해 사용된다.
// 해당 파이프는 해당 컨트롤러의 경로의 모든 값에 적용된다.
- Parameter-level Pipes
// 특정 파라미터에만 적용된다.
- Global-level Pipes 
// 서비스의 모든 요청에 적용된다.
// 가장 상단의 main.ts 파일에서 적용된다.
````
async function bootstrap() {
    const app = await NsetFactory.create(AppModule);
    await app.listen(3000)
}
````

* nestjs에서 기본적으로 사용가능한 내장 파이프 종류
- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseUUIDPipe
- DefaultValuePipe

// npm i class-validator class-transformer --save
// docs 문서 확인

## 커스텀 파이프 구현
- transform([value], [metadata])
value : 입력값
metadata :  입력값에 대한 메타 데이터를 포함한 객체

# class property
- readonly : 읽기 전용, 클래스 외부에서 접근은 가능하지만, 해당 클래스의 값을 변경할 수는 없다.



# postgresSql 설치
pgAdmin : https://www.pgadmin.org/download
설치 : brew install postgresql
설치확인 : postgres --version

brew services start postgresql

# TypeORM (Object Relational Mapping)
nodejs에서 실행되는 타입스크립트로 작성된 객체관계형 매퍼 라이브러리
TypeORM은 mysql, postgresql mariadb, mssql server, oracle, websql등을 지원한다.
> npm i pg typeorm @nestjs/typeorm
// 참고 문서 : https://docs.nestjs.com/techniques/database
// configs/typeorm.config.ts 파일 참고
// postgres 연결을 위한 기본 설정을 해둔 파일

*.entity.ts 파일 : 테이블 생성을 위한 정보가 담긴 파일
## Repository
엔터티 개체와 함께 작동하며, 엔티티 찾기, 삽인, 업데이트 삭제 등의 작업을 수행.
공식 문서 : http://typeorf.delightful.studio/classes/_repository_repository_repository.html
* repository pattern
// 데이터베이스와 관련한 작업(crud)을 서비스가 아닌 repository에서 별도로 처리하는 형태
ex) user -> request -> controller -> service -> repository -> service -> controller -> response
1. 리포지토리 파일 생성
2. 생성한 리포지토리 파일에 클래스 생성
@EntityRepository() 
// 클래스를 사용자 정의 저장소로 선언하는데 사용된다.

----

# auth
cli를 통해 모듈 컨트롤러 서비스 생성
> nest g module auth
> nest g controller auth --no-spec
> nest g service auth --no-spec

# jwt(json web token)
- header : 토큰에 대한 메타데이터를 포함.(타입, 해싱 알고리즘, sha256, rsa)
- payload : 유저 정보(issuer), 만료 기간 (expiration time)
- verify signature : 서명

* passport를 이용하여 구현
> npm i @nestjs/jwt @nestjs/passport passport passport-jwt 
- @nestjs/jwt : nestjs에서 jwt를 사용하기 위해 필요한 모듈
- @nestjs/passport: nestjs에서 passport를 사용하기 위해 필요한 모듈
- passport 모듈
- jwt : jwt 모듈

# nestjs 미들웨어
- Pipes : 요청값 유효성 검사 및, 페이로드 변환을 위해 사용됨, 데이터를 예상한 대로 직렬화
- Filters : 오류 처리 미들웨어, 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복잡성 관리방법 알 수 있다.
- Guards : 인증 미들웨서, 지정된 경로로 통과할 수 있는 사람과, 허용되지 않는 사람을 서버에 알려준다.
- Intercetptors : 인터셉터는 응답 매핑 및 캐시 관리와 함께 요청 로깅과 같은 전후 미들웨어이다. 각 요청 전후에 이를 실행한다.
* 미들웨어 요청되는 순서 : middleware -> guard -> interceptor(before) -> controller -> interceptor(after) ->filter(if application) -> client 

# 기타 함수 
[Array].index.of([value]) : 해당 배열 내에서 value의 index를 추출해준다. 배열에 없는 값을 value에 넣으며 -1를 출력한다.
// https://www.youtube.com/watch?v=3JminDpCJNE&list=RDCMUCFyXA9x8lpL3EYWeYhj4C4Q&start_radio=1&rv=3JminDpCJNE&t=129

