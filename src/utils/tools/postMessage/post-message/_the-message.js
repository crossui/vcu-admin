var MAP_RECEIVERS = {}; // 某一 type 对应的所有回调

var MAP_RECEIVERS_ONCE = {}; // 某一 type 对应的所有单次回调

if (window.addEventListener) {
  // 虽然支持的很好了，但..也谨慎一下吧
  // 全局唯一的 message receiver，所以就无所谓解不解绑了
  window.addEventListener('message', function (e) {
    var _e$data = e.data,
      type = _e$data.type,
      payload = _e$data.payload;
    var receivers = MAP_RECEIVERS[type] || [];
    var receiversOnce = MAP_RECEIVERS_ONCE[type] || [];
    delete MAP_RECEIVERS_ONCE[type];
    receivers.forEach(function (v) {
      return v(payload);
    });
    receiversOnce.forEach(function (v) {
      return v(payload);
    });
  });
}
/**
 * 向特定 receivers 列表推入新的回调
 */


export function pushToReceivers(receivers, type, fn) {
  var arr = receivers[type];

  if (!arr) {
    arr = [];
    receivers[type] = arr;
  }

  if (arr.indexOf(fn) < 0) {
    // 避免多次
    arr.push(fn);
  }
}
/**
 * 从特定 receivers 列表移除对应回调
 */

export function pullFromReceivers(receivers, type, fn) {
  var arr = receivers[type];

  if (!arr) {
    return;
  }

  var index = arr.indexOf(fn);

  if (index >= 0) {
    arr.splice(index, 1);
  }

  if (!arr.length) {
    delete receivers[type];
  }
}
export { MAP_RECEIVERS, MAP_RECEIVERS_ONCE };