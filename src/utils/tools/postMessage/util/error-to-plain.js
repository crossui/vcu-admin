import _isError from 'lodash/isError';
import _forEach from 'lodash/forEach';
/**
 * postMessage 不支持传 Error 对象
 */

export default function errorToPlain(err) {
  if (!_isError(err)) {
    return err;
  }

  var plain = {};

  _forEach(err, function (v, k) {
    plain[k] = v;
  });

  ['message', 'name', 'stack'].forEach(function (v) {
    if (!plain[v]) {
      plain[v] = err[v];
    }
  });
  return plain;
}