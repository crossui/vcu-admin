import { MAP_RECEIVERS, pullFromReceivers } from './_the-message';
/**
 * 反注册对 type 的某一回调，一般推荐用 subscribe 的返回
 */

export default function unsubscribe(type, fn) {
  pullFromReceivers(MAP_RECEIVERS, type, fn);
}