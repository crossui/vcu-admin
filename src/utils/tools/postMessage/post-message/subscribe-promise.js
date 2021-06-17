import errorToPlain from '../util/error-to-plain';
import broadcast from './broadcast';
import subscribe from './subscribe';
/**
 * 对 broadcastPromise 对应的 type 进行响应，这里关心的 payload 还是 broadcastPromise 所传入的 payload
 */

export default function subscribePromise(type, fn) {
  return subscribe(type, function (payload) {
    // 得到的 payload 下有 _dismiss_ 参数才响应，否则 pass
    if (!(payload !== null && payload !== void 0 && payload._dismiss_)) {
      return;
    } // 这里广播是事件会被 `broadcastPromise` 方法内部的 subscribeOnce 消化


    Promise.resolve(fn(payload.payload)).then(function (value) {
      broadcast(payload._dismiss_, {
        value: value
      });
    }, function (err) {
      broadcast(payload._dismiss_, {
        error: errorToPlain(err)
      });
    });
  });
}