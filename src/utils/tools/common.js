import XEUtils from "xe-utils";
import store from "@/store"
import { Modal } from "vcu"
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some((_) => arr.indexOf(_) > -1)
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {String} value 日期字符串
 * @param {String} format 日期格式
 */
export function stringToDate(value, format) {
  if (value == undefined) return
  let date = value.replace(/[\s\:\-]/g, "")
  date = date.split("")
  //指定格式字符
  let cfg = {
    yyyy: `${date[0]}${date[1]}${date[2]}${date[3]}`, //年
    MM: `${date[4]}${date[5]}`, //月
    dd: `${date[6]}${date[7]}`, //日
    hh: `${date[8]}${date[9]}`, //时
    mm: `${date[10]}${date[11]}`, //分
    ss: `${date[12]}${date[13]}`, //秒
  }
  format || (format = "yyyy-MM-dd")
  return format.replace(/([a-z])(\1)*/gi, function(m) {
    return cfg[m]
  })
}

/**
 * 日期转换
 * @param date date对象
 * @param format 日期格式
 * @return 例如  2016-7-16 16:24:58
 **/
export function formatDate(date, format) {
  let paddNum = function(num) {
    num += ""
    return num.replace(/^(\d)$/, "0$1")
  }
  //指定格式字符
  let cfg = {
    yyyy: date.getFullYear(), //年 : 4位
    yy: date
      .getFullYear()
      .toString()
      .substring(2), //年 : 2位
    M: date.getMonth() + 1, //月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
    d: date.getDate(), //日 : 如果1位的时候不补0
    dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
    hh: paddNum(date.getHours()), //时 : 如果1位的时候补0
    mm: paddNum(date.getMinutes()), //分 : 如果1位的时候补0
    ss: paddNum(date.getSeconds()), //秒 : 如果1位的时候补0
    ms: paddNum(date.getMilliseconds()), //毫秒 : 如果1位的时候补0
  }
  format || (format = "yyyy-MM-dd hh:mm:ss")
  return format.replace(/([a-z])(\1)*/gi, function(m) {
    return cfg[m]
  })
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */ else return !keysArr1.some((key) => obj1[key] != obj2[key])
}

/**
 * @param {*} size 对象
 * @description 根据配置转换表格尺寸值
 */
export const tableChangeSize = (size) => {
  let val = "middle"
  switch (size) {
    case "default":
      val = "middle"
      break
    case "large":
      val = "default"
      break
    case "small":
      val = "small"
      break
  }
  return val
}

/**
 * @param {*} record 表格数据
 * @param {*} index 表格索引
 * @description 表格斑马纹
 */
export const tableZebraStripe = (record, index) => {
  if (index % 2 !== 0) {
    return "odd-table-row"
  }
  return ""
}

/**
 * @param {*} obj  {Section: "", Key: ""}  例如：obj.Section="NEWYBJK";  obj.Key="Debug";  key可以不传代表获取某类的全部数据JSON格式
 * @description 获取客户端login.ini数据
 */
export const getLoginIniDatas = (obj) => {
  let result = null
  try {
    result = synchBoundEvent.CefFuncEvent("ReadIni", obj)
  } catch (err) {}
  return result
}

/**
 * @param {*} obj  { Section: "SQSF",  Key: "CKBH_SF", Value: this.form.CKXX00,  }  例如：obj.Section="SQSF";  obj.Key="CKBH_SF"; Value 更新的值
 * @description 更新客户端login.ini数据
 */
export const setLoginIniDatas = (obj) => {
  let result = null
  try {
    result = synchBoundEvent.CefFuncEvent("WriteIni", obj)
  } catch (err) {}
  return result
}

/**
 * @description 提示表单错误信息
 */
export const showFormErrorMessage = async ({
  formType = "formModel",
  title = "提示",
  validList = [],
  type = "error",
  okCallBack = undefined,
  vm = null,
  errRefs = "",
  okText = "确定",
}) => {
  if (!validList && !validList.length) return
  let validHtml = ""
  if (formType == "formModel") {
    validList.forEach((item) => {
      validHtml += `<div class="mb-5">${item}</div>`
    })
  } else {
    for (let item in validList) {
      validHtml += `<div class="mb-5">${validList[item].errors[0].message}</div>`
    }
  }
  Modal[type]({
    class: "modal-confirm-enter-event",
    autoFocusButton: null,
    centered: true,
    title,
    okText,
    content: (h) => {
      return h("div", {
        domProps: {
          innerHTML: validHtml,
        },
      })
    },
    onOk() {
      if (vm != null && errRefs != "") {
        vm.$refs[errRefs].focus()
      }
      if (okCallBack) {
        okCallBack()
      }
    },
  })
}

/**
 * @param {Array} datas 表格数据
 * @param {Array} columns 表格列数据
 * @param {Array} fields 表格字段key值
 * @param {Boolean} type 是否采用新模式
 * @description 返回合并表格列表数据（rowSpan）
 */
export const colMergeCells = ({
  datas = [],
  columns = [],
  fields = [],
  type = true,
}) => {
  if (type) {
    //新方案
    if (datas.length && columns.length && fields.length) {
      let mergeCells = [];
      let _fields = [];
      const mergeCellsFun = (rowIndex, index, num) => {
        mergeCells.push({
          row: rowIndex,
          col: index,
          rowspan: num,
          colspan: 1,
        });
      };
      XEUtils.arrayEach(columns, (item, index) => {
        if (
          XEUtils.findLastIndexOf(
            fields,
            (fieldItem) => fieldItem === item.property
          ) > -1
        ) {
          _fields.push({
            property: item.property,
            index,
          });
        }
      });
      XEUtils.arrayEach(_fields, (field, fieldIndex) => {
        let num = 1;
        let rowIndex = 0;
        XEUtils.arrayEach(datas, (data, dataIndex) => {
          if (datas[dataIndex + 1]) {
            if (data[field.property] === datas[dataIndex + 1][field.property]) {
              num++;
            } else {
              mergeCellsFun(rowIndex, field.index, num);
              rowIndex = dataIndex + 1;
              num = 1;
            }
          } else {
            mergeCellsFun(rowIndex, field.index, num);
          }
        });
      });
      return mergeCells;
    } else {
      return [];
    }
  } else {
    //旧方案 （直接操作数据）
    if (datas.length) {
      let data = _.concat(datas, []);
      for (let j = 0; j < fields.length; j++) {
        let num = 1;
        let RowSpan = `${fields[j]}RowSpan`;
        let oldNum = 0;
        let oldIndex = [oldNum];
        let newIndex = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i + 1] && data[i][fields[j]] === data[i + 1][fields[j]]) {
            num++;
          } else {
            newIndex.push(num);
            oldIndex.push((oldNum += num));
            num = 1;
          }
        }
        for (let i = 0; i < data.length; i++) {
          data[i][RowSpan] = 0;
        }
        for (let i = 0; i < oldIndex.length - 1; i++) {
          data[oldIndex[i]][RowSpan] = newIndex[i];
        }
      }
      return data;
    } else {
      return [];
    }
  }
}

/**
 * @description 弹出500错误提示
 * @param {Object} res.data
 * @return true
 */
export const showErrModal = async (data) => {
  try {
    return new Promise(async (resolve, reject) => {
      Modal.error({
        mask: false,
        title: "错误提示",
        class: "modal-confirm-enter-event",
        autoFocusButton: null,
        centered: true,
        content: (h) => {
          const showErrorDdetails = (event) => {
            event.target.nextSibling.style.display = "block"
          }
          let obj = _.merge({}, { title: "", payload: { message: "" } }, data)
          if (!obj.payload.message || obj.payload.message == "") {
            obj.payload.message = obj.title
          }
          return (
            <div>
              <div style="color:red;" domPropsInnerHTML={obj.title}></div>
              <div>
                <a href="javascript:;" onClick={showErrorDdetails}>
                  查看详情
                </a>
                <div
                  style="height:auto; max-height:300px; overflow: auto; display:none"
                  domPropsInnerHTML={obj.payload.message}
                ></div>
              </div>
            </div>
          )
        },
        okText: "确定",
        onOk() {
          resolve(true)
        },
      })
    })
  } catch (err) {
    return false
  }
}

/**
 * @description 弹出确认提示
 * @param {Object} res.data
 * @return true
 */
export const showConfirmModal = async (data) => {
  try {
    return new Promise(async (resolve, reject) => {
      Modal.confirm({
        mask: false,
        title: "提示",
        class: "modal-confirm-enter-event",
        autoFocusButton: null,
        centered: true,
        content: (h) => {
          return h("div", {
            domProps: {
              innerHTML: data.content ? data.content : "",
            },
          })
        },
        okText: "确定",
        onOk() {
          resolve(true)
        },
        cancelText: "取消",
        onCancel() {
          resolve(false)
        },
      })
    })
  } catch (err) {
    return false
  }
}

/**
 * @description 弹出提示
 * @param {Object} res.data
 * @return true
 */
export const showTipsModal = async (data) => {
  try {
    return new Promise(async (resolve, reject) => {
      Modal.info({
        mask: false,
        title: "提示",
        class: "modal-confirm-enter-event",
        autoFocusButton: null,
        centered: true,
        content: (h) => {
          return h("div", {
            domProps: {
              innerHTML: data.content ? data.content : "",
            },
          })
        },
        okText: "确定",
        onOk() {
          resolve(true)
        },
      })
    })
  } catch (err) {
    return false
  }
}

/**
 * @description 写入日志
 * @param {String} title  //日志标题（描述）
 * @param {String} type ('info'/'error')  //调用console哪个方法
 * @param {Object} opt  //想要追踪数据集
 */
export const weblog = ({ title = "", type = "info", opt = {} }) => {
  try {
    let obj = {
      title,
      zwxm00:
        store.state.user && store.state.user.organizationEntity ? store.state.user.organizationEntity.user.zwxm00 : "",
      res: opt,
    }
    if (type == "info") {
      console.info(JSON.stringify(obj))
    } else {
      console.error(JSON.stringify(obj))
    }
  } catch {
    console.error(title ? title : "前端日志传入数据转换json有误")
  }
}

/**
 * @description 防抖前置
 */
window.debouncePre = (func, wait = 300, immediate = true) => {
  let timer
  return function() {
    //this指向debounce
    let context = this
    //即参数，func,wait
    let args = arguments

    //如果timer不为null, 清除定时器
    if (timer) clearTimeout(timer)

    //如果是立即执行
    if (immediate) {
      //定义callNow = !timer
      var callNow = !timer
      //定义wait时间后把timer变为null
      //即在wait时间之后事件才会有效
      timer = setTimeout(() => {
        timer = null
      }, wait)
      //如果callNow为true,即原本timer为null
      //那么执行func函数
      if (callNow) func.apply(context, args)
    } else {
      //如果是不立即执行
      //那就是每次重新定时
      timer = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @description 调用客户端方法 执行window.open()
 */
export const webWindowOpen = ({ url = "", state = "2", width = "1200", height = "" }) => {
  var obj = new Object()
  obj.url = url
  obj.width = width
  obj.width = height
  obj.state = state
  synchBoundEvent.CefEvent("OpenNewTab", obj)
}
