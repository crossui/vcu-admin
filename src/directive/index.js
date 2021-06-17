import hotkey from './module/hotkey'
import action from './module/action'
import tablelazy from './module/tablelazy'
import formWidth from './module/formWidth'
import tableFooterScroll from './module/tableFooterScroll'
import modalConfirmEnter from './module/modalConfirmEnter'
import transferDom from './module/transfer-dom'
import clickOutside from './module/click-outside'

const directives = {
  hotkey,
  action,
  tablelazy,
  formWidth,
  tableFooterScroll,
  modalConfirmEnter,
  transferDom,
  clickOutside
}

const importDirective = Vue => {
  /**
   * 快捷键指令 v-hotkey="options"
   * options = {
   *  keyVal: /快捷键字符/,
   *  callBack: /快捷键回调方法 带返回值 {}/
   * }
   */
  Vue.directive("hotkey", directives.hotkey);
  /**
   * Action 权限指令
   * 指令用法：
   *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
   *    <v-button v-action:add >添加用户</v-button>
   *    <v-button v-action:delete>删除用户</v-button>
   *    <a v-action:edit @click="edit(record)">修改</a>
   *
   *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
   */
  Vue.directive("action", directives.action);

  /**
   * table-lazy 权限指令
   * 指令用法：
   *  - 在需要懒加载的表格上 v-table-lazy="callback" 
   */
  Vue.directive("table-lazy", directives.tablelazy);
  /**
     * form-width (v-form-width)
     * 指令用法：
     * <v-form v-form-width="{ labelWidth: 90, wrapperWidth: 250 }"></v-form> 
     * <v-form-item v-form-width="{ labelWidth: 90, wrapperWidth: 250 }"></v-form-item>
     * @params
     * labelWidth:表单名称宽度
     * wrapperWidth：表单控件宽度
     */
  Vue.directive("form-width", directives.formWidth);
  /**
     * tableFooterScroll (v-tableFooterScroll)
     * 指令用法：
     *  - <v-table v-tableFooterScroll :footer="footerFunc" :columns="columns" :dataSource="data" :scroll="{ x: 2300 }"></v-table>
     * 
     * 注意footer的宽度应与table宽度保持一致
    */
  Vue.directive("table-footer-scroll", directives.tableFooterScroll);

  /**
     * modalConfirmEnter
     * 指令用法：
     *  - <app v-modal-enter></app>
    */
  Vue.directive("modal-confirm-enter", directives.modalConfirmEnter);

  /**
    * transferDom
    * 指令用法：
    *  - <div v-transfer-dom></div>
   */
  Vue.directive("transfer-dom", directives.transferDom);
  /**
    * clickOutside
    * 指令用法：
    *  - <div v-click-outside="Config"></div>
   */
  Vue.directive("click-outside", directives.clickOutside);
}

export default importDirective


