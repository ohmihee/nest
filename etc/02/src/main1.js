// 데코레이터 함수는 target, property, descriptor 세개의 인자를 받는다.
// target: 데코레이터가 적용될 객체
// key: 데코레이터가 적용될 객체의 프로퍼티 이름
// descriptor: 해당 객체의 프로퍼티에 대한 세부 정보
function myDecorator (target, key, descriptor) {
    const fn = descriptor.value || descriptor.initializer.call(this);

    descriptor.value = function (...args) {
        console.log('======')
        console.log('target.constructor : ', target.constructor);
        console.log('key: ', key)
        console.log('descriptor : ', descriptor)

        fn.call(this, args)
    }
}

class MyClass {
    @myDecorator
    doSomething() {
        console.log('im doing some work')
    }
    
    doTest() {
        console.log('test')
    }
}

const instance = new MyClass();
instance.doSomething()
instance.doTest()