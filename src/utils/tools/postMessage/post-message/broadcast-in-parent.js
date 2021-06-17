/**
 * 去父窗口进行广播
 */
export default function broadcastInParent(type, payload) {
  let targetOrigin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

  if (window.parent === window || !window.parent.postMessage) {
    return;
  }

  window.parent.postMessage({
    type: type,
    payload: payload
  }, targetOrigin);
}