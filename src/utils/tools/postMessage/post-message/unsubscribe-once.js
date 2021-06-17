import { MAP_RECEIVERS_ONCE, pullFromReceivers } from './_the-message';
/**
 * 反注册对 type 的某一单次回调（有必要的场景）
 */

export default function unsubscribeOnce(type, fn) {
  pullFromReceivers(MAP_RECEIVERS_ONCE, type, fn);
}