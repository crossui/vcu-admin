import _isPlainObject from 'lodash/isPlainObject';
import _forEach from 'lodash/forEach';
export default function plainToError(o) {
  if (!_isPlainObject(o)) {
    return o;
  }

  var err = new Error();

  _forEach(o, function (v, k) {
    err[k] = o[k];
  });

  return err;
}