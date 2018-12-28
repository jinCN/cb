# @mybug/awaitor
awaitable callback. 

## usage
awaitor()

return an awaitable callback, the promiseValue of which is the args array it's called with 

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

## use together with @mybug/wait

wait can await a thing synchronously. 

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
