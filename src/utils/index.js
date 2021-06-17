import * as app from './tools/app';
import * as common from './tools/common';
import themeColor from './tools/themeColor';
import * as postMessage from './tools/postMessage';
const util = {
  ...app,
  ...common,
  themeColor,
  postMessage
}
export default util