# nestjs란
nodejs 애플리케이션 구축을 위한 프레임워크이다.

1. node.js가 기본적으로 설치되어 있어야 한다.

2. nest.js 클라이언트가 설치되어야 한다.
> npm i -g @nestjs/cli
nest를 이용하여 애플리케이션을 구축할 수 있게 해주는 기본적인 파일 구성을 해주는 명령어를 입력한다.
> nest new [project_name] 
// 사용하려는 패키지 매니저를 선택한다. ( npm, yarm, pnpm  )

-- 폴더구조 설명 --
- eslintrc.js : 코드 작성이 적용될 특정한 규칙을 설정해주는 파일, 타입스크립트 작성시 가이드라인 제시, 문법 오류시 알려주는 기능 등.
- prettierrc : 코드 작성 시 일정한 형식을 맞추는데 사용된다. 작은 따옴표 사용할지 큰 따옴표 사용할지, 인덴트 즉 코드에서 앞에 띄어쓰기하는 칸을 2칸으로 할 지 4칸으로 할 지 등

eslintrc.js 파일과 유사하지만 prettierrc가 좀더 문법의 형식 위주의 설정에 대한 내용이고, eslintrc는 좀 더 문법적 코드 작성 설정에 대해 관련한 내용이다. 
- nest-cli.json
nest 프로젝트 자체의 설정에 관한 내용 등.
- tsconfig.json
- tsconfig.build.json
- package.json
프로젝트명이나 설명, 사용된 라이브러리, 애플리케이션 시작 방법 등 프로젝트 자체에 대한 설명을 담은 파일
- src 
애플리케이션의 실질적인 대부분의 서비스 로직이 담긴 폴더. 
-------------------------------------------------

## 흐름
user request - controller -> service -> controller -> user 

## 기타 설명
모듈 : @Module 데코레이터로 주석이 달린 클래스
- @Module() 데코레이터는 Nest 애플리케이션 구조 구성을 사용하는데 사용하는 메타 데이터를 제공한다.
-------------------------------------------------
// 기본부터 시작하기 전에 app.service.ts, app.controller.ts, app.controller.spec.ts 파일을 지원준다.
// app.module.ts 파일의 경우에는 controllers와 providers 부분을 지워준다.
// test 폴더를 지원준다.

3. 모듈 생성
nest 에서는 기본적으로 명령어를 통해 모듈을 생성한다.
> nest g module boards
- nest : using nestcli  // nestcli를 사용하겠다.
- g : generate // 생성할 것이다.
- module : schematic that i want to create // 어떤 유형을 것을 생성할 것인지, 모듈을 생성할 것이다. 
- boards : name of the schematic // 생성되는 모듈의 명칭

위의 명령어 실행시 boards.module.ts 파일이 존재하는 boards라는 폴더가 생성된다.

controller?
사용자의 요청에 대해 응답하는 부분.
- @Controller 데코레이터를 통해 사용한다.

4. 생성된 모듈 안에 컨트롤러 파일 생성
> nest g controller boards --no-spec
- nest: nestcli를 사용
- g : 생성
- controller : 생성하려는 작업
- boards : 어떠한 이름으로 생성할 것인지
- --no-spce : 테스트를 위한 소스 코드는 생성하지 않겠다.
// 기본적으로는 테스트하는 코드를 같이 생성해준다.
위의 명령어 입력시 boards.controller.ts 파일을 생성하여 주고, boards.module.ts 파일에는 controllers에 boardsController를 사용할 수 있게끔 설정해주는 코드가 추가된다.
boards.controller.ts
```
import { Controller } from '@nestjs/common';
@Controller('boards')
export class BoardsController {}
```

boards.module.ts
```
controllers: [BoardsController]
// 위의 내용이 추가된다.
```

5. 생성된 모듈 안에 서비스 로직을 구현할 서비스 파일 생성
> nest g service boards --no-spce
boards.service.ts 
```
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {}
```
boards.module.ts
```
providers: [BoardsService]
```

- @Injectable 
// 해당 데코레이터는 다른 컴포넌트에서 해당 클래스를 사용할 수 있게끔 해준다.

6. 서비스를 컨트롤러에서 사용할 수 있게끔 종속성 주입 (Dependency Injection)
컨트롤러 클래스의 constructor를 통해 주입한다.
```
constructor(private boardsService : BoardsService) {}
// private은 접근제한자
* 접근제한자 : public, protected, private
// boardsService는 해당 클래스 내에서만 사용가능함을 의미한다.
```
위의 코드는 아래의 코드를 압축한 것이라 볼 수 있다.
```
boardsService: BoardsService;
constructor(boardsService: BoardsService) {
    this.boardsService = boardsService;
}
```

--------------------------------------------
* providers?
종속성을 제공하는 것으로 @Injectable 데코레이터를 통해 사용한다.

종속성 주입은 사용하려는 곳의 클래스에서 constructor를 통해 제공한다.

ex) 
constructor(boarsService: BoardsService) {
    this.boardsService = BoardsService;
}

또한 모듈 파일의 providers에 추가를 해주어야 한다.
ex)
providers: [BoardsService]

--------------------------------------------

7. crud 구현하기
7-1. read
service 파일 참고
```
    private boards = [];

    getAllBoards() {
        return this.boards;
    }
    // 위의 내용 추가
```
controller.ts 파일 참고
```
    @Get()
    getAllBoard() {
        return this.boardsService.getAllBoards();
    }
    // 위의 내용 참고
```

8. 모델 정의하기
// 테이블에 대한 정의
- board.model.ts 파일 생성
- 서비스 파일과, 컨트롤러 파일 등 해당 타입이 들어가는 곳에 추가해준다.

https://www.youtube.com/watch?v=3JminDpCJNE&t=8s
1:16:19