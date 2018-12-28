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

function then (onFulfilled, onRejected) {
  return this._promise.then(onFulfilled, onRejected)
}
