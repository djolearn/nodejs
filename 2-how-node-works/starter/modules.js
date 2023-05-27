const C = require('./test-module-1');

const calc1 = new C();

console.log(calc1.divide(2400, 5));

// const calc2 = require('./test-module-2 ');
const { add, multiply, divide } = require('./test-module-2');

console.log(add(20, 40));
console.log(divide(20, 17));

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
