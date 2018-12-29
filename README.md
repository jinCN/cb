# [@mybug](https://www.npmjs.com/org/mybug)/awaitor
awaitable callback. 

async/await way to call callback style functions

## thought
If you want to convert callback style to async/await style, you can either:
1. wrap the operation to return a promise
2. just call the operation, using @mybug/awaitor as callback, like the example below  

## usage
awaitor()

return an awaitable callback, the promiseValue of which is the args array it's called with 

awaitor.norm()

same as above, but it only accept two args: `(err,value)`. If err exists, promiseValue will be `err` and rejected. 
Otherwise, promiseValue will be `value`. 
## example

```javascript
const awaitor = require('@mybug/awaitor')
// await can't be used without being wrapped by async function
;(async ()=>{
  let cb = awaitor()
  foo(1,2,cb) // whenever a callback is needed, just use cb
  let result = await cb //result is an array, containing the args cb received
  console.log(result) // [3]
})()

function foo(a,b,cb){
  setTimeout(()=>cb(a+b),1000)
}
```

## use together with [@mybug/wait](https://www.npmjs.com/package/@mybug/wait)

wait can await something synchronously. 

```javascript
const awaitor = require('@mybug/awaitor')
const wait = require('@mybug/wait')

let cb = awaitor()
foo(1,2,cb) // whenever a callback is needed, just use cb
let result = wait(cb) //result is an array, containing the args cb received
console.log(result) // [3]

function foo(a,b,cb){
  setTimeout(()=>cb(a+b),1000)
}
```

## compatibility
You can use @mybug/awaitor in both nodejs and browser environment.
