module.exports = awaitor

function awaitor () {
  let cb = function (...args) {
    cb._resolve(args)
  }
  cb.then = then
  cb._promise = new Promise((resolve, reject) => {
    cb._resolve = resolve
  })
  return cb
}

awaitor.norm = function norm () {
  let cb = function (err, value) {
    if (err != null) {
      return cb._reject(err)
    }
    cb._resolve(value)
  }
  cb.then = then
  cb._promise = new Promise((resolve, reject) => {
    cb._resolve = resolve
    cb._reject = reject
  })
  return cb
}
function then (onFulfilled, onRejected) {
  return this._promise.then(onFulfilled, onRejected)
}
