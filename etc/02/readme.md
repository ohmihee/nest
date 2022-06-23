https://velog.io/@koo8624/Javascript-Decorator
자바스크립트에서 데코레이터를 사용하기 위해서는 babel을 통해 설정해주어야 사용가능하다.
> npm i -D @babel/cli @babel/node @babel/core @babel/plugin-proposal-decorators
.babelrc
````
{
    "plugins": [[
        "@babel/plugin-proposal-decorators", {
            "legacy": true
        }
    ]]
}
````
실행시에는 ./node_modules/.bin/babel-node main 명령어를 통해 실행한다.