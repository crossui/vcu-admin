import { MAP_RECEIVERS, pushToReceivers } from './_the-message';
import unsubscribe from './unsubscribe';
/**
 * 注册回调，返回可用于反注册的方法
 */

export default function subscribe(type, fn) {
  pushToReceivers(MAP_RECEIVERS, type, fn);
  return function () {
    return unsubscribe(type, fn);
  };
}