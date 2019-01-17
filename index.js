module.exports = Cb

function Cb () {
  let cb = makeCb()
  Cb.cbStack.push(cb)
  refCb(cb)

  return Cb
}

let dummyFunc = () => { throw new Error('Cb visit error! Please construct one before visit') }

let dummy = {
  ok: dummyFunc,
  err: dummyFunc,
  arr: dummyFunc,
  pair: dummyFunc
}

function refCb (cb = dummy) {
  let funcs = ['ok', 'err', 'arr', 'pair']
  funcs.forEach(v => { Cb[v] = cb[v] })
}

Cb.cbStack = []
Cb.pop = function () {
  if (Cb.cbStack.length === 0) {
    throw new Error('Cb pop error! Please construct one before pop')
  }
  let cb = Cb.cbStack.pop()
  console.log(`pop cb.num:`, cb.num)
  refCb(Cb.cbStack[Cb.cbStack.length - 1])
  return cb
}

Cb.new = function () {
  return makeCb()
}

function makeCb () {
  let ok, err
  let cb = new Promise((resolve, reject) => {
    ok = resolve
    err = reject
  })

  cb.num = Math.random() * 100 >> 0
  console.log(`cb.num:`, cb.num)

  Object.assign(cb, {
    ok,
    err,
    arr: (...args) => ok(args),
    pair: (e, v) => e != null ? err(e) : ok(v)
  })

  return cb
}
