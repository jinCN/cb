module.exports = awaitor

function awaitor () {
  let cb = function (...args) {
    cb.resolve(args)
  }
  cb.then = then
  cb._promise = new Promise((resolve, reject) => {
    cb.resolve = resolve
  })
  return cb
}

function then (onFulfilled, onRejected) {
  return this._promise.then(onFulfilled, onRejected)
}
