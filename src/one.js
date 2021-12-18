import two from "./two";

const x = 100;
console.log("x", x);
console.log("y", two.y);

const test = (num) => {
    return num + 100;
}
console.log(test(two.y));

// 装饰器函数：动态给类或对象添加属性或方法
function testable(target) {
    target.isTestable = true; //类的话直接添加静态属性方法，对象的话new target().ss=ff添加属性和方法
}

@testable //调用装饰器函数
class MyTestableClass {} //然后把这个类传给上边的装饰器函数，给这个类添加静态属性isTestable，赋值为true
console.log("装饰器语法", MyTestableClass.isTestable) //打印出来为true 

//generator函数
//ES5中没有Promise对象，也没有generator函数，转换完毕浏览器runtime环境也不支持
//解决：polyfill 提供regenerator-runtime模块用于提供功能实现，自己封装了Promise generator await async
const delay = new Promise(resolve => console.log("new Promise()"));

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();
console.log(hw.next());