<template>
  <div class="customer-form-wrap">
    <v-row :gutter="16">
      <v-col class="gutter-row" :span="14">
        <div class="gutter-box">
          <v-card title="自定义表单结果">
            <div slot="extra">
              <v-button
                type="primary"
                icon="check"
                :disabled="resultLists.length==0"
                size="small"
                @click="handleResultSubmit"
              >发布</v-button>
              <v-button
                type="warning"
                icon="delete"
                :disabled="resultLists.length==0"
                size="small"
                @click="handleResultReset"
              >清空</v-button>
            </div>

            <div class="customer-form-result">
              <v-form
                ref="formValidate"
                v-model="formData"
                @submit.native.prevent
                :label-width="100"
              >
                <v-row :gutter="16">
                  <draggable :list="resultLists" :options="resultOptions">
                    <transition-group
                      class="form-list-group"
                      type="transition"
                      :name="'flip-list'"
                      tag="div"
                    >
                      <template v-for="(element,index) in resultLists">
                        <v-col :key="index" :span="element.obj.gridspan">
                          <renders
                            @handleRemoveEle="removeEle"
                            @handleConfEle="confEle"
                            :key="index"
                            :index="index"
                            :ele="element.ele"
                            :obj="element.obj || {}"
                            :data="formData"
                            @handleChangeVal="val => handleChangeVal(val,element)"
                            :sortableItem="resultLists"
                            :config-icon="true"
                          ></renders>
                        </v-col>
                      </template>
                    </transition-group>
                  </draggable>
                </v-row>
              </v-form>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col class="gutter-row" :span="10">
        <div class="gutter-box">
          <v-card title="自定义表单控件(下方控件拖放到左边表中)">
            <div class="customer-form-control">
              <v-form ref="formValidate" @submit.native.prevent :label-width="100">
                <v-tabs defaultActiveKey="0" type="card" :animated="true">
                  <template v-for="(item,ii,index) in controlLists">
                    <v-tab-pane :tab="controlTabsTitle[index]" :key="index.toString()">
                      <draggable :clone="cloneData" :list="item" :options="controlOptions">
                        <transition-group
                          class="form-list-group"
                          type="transition"
                          :name="'flip-list'"
                          tag="div"
                        >
                          <renders
                            v-for="(element,ii) in item"
                            :key="ii"
                            :ele="element.ele"
                            :obj="element.obj || {}"
                          ></renders>
                        </transition-group>
                      </draggable>
                    </v-tab-pane>
                  </template>
                </v-tabs>
              </v-form>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- 配置 -->
    <v-modal
      :title="'配置' + modalFormData.label + '属性'"
      v-model="showModal"
      :maskClosable="false"
      :width="800"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <v-form label-position="left" :label-width="100" :model="modalFormData" ref="modalFormDom">
        <v-form-item label="名称：" v-if="typeof modalFormData.label != 'undefined'">
          <v-input type="text" v-model="modalFormData.label" />
        </v-form-item>
        <v-form-item label="提示语：" v-if="typeof modalFormData.placeholder != 'undefined'">
          <v-input type="text" v-model="modalFormData.placeholder" />
        </v-form-item>
        <v-form-item label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
          <v-checkbox v-model="modalFormData.require">必填</v-checkbox>
        </v-form-item>
        <v-form-item label="错误提示语：" v-if="modalFormData.require">
          <v-input v-model="modalFormData.ruleError" placeholder="请输入校验错误提示" />
        </v-form-item>
        <v-form-item label="表单栅格：">
          <v-input-number :min="1" :max="24" v-model="modalFormData.gridspan"></v-input-number>
        </v-form-item>
        <v-form-item label="最大长度：" v-if="typeof modalFormData.maxLength != 'undefined'">
          <v-input-number :min="1" v-model="modalFormData.maxLength" />
        </v-form-item>

        <v-form-item label="最大值：" v-if="typeof modalFormData.max != 'undefined'">
          <v-input-number :precision="modalFormData.precision" v-model="modalFormData.max" />
        </v-form-item>
        <v-form-item label="最小值：" v-if="typeof modalFormData.min != 'undefined'">
          <v-input-number :precision="modalFormData.precision" v-model="modalFormData.min" />
        </v-form-item>
        <v-form-item label="步伐：" v-if="typeof modalFormData.step != 'undefined'">
          <v-input-number :precision="modalFormData.precision" v-model="modalFormData.step" />
        </v-form-item>
        <v-form-item label="数值精度：" v-if="typeof modalFormData.precision != 'undefined'">
          <v-input-number v-model="modalFormData.precision" />
        </v-form-item>

        <v-form-item label="显示行数(最小):" v-if="typeof modalFormData.minRows != 'undefined'">
          <v-input-number v-model="modalFormData.minRows" />
        </v-form-item>
        <v-form-item label="显示行数(最大):" v-if="typeof modalFormData.maxRows != 'undefined'">
          <v-input-number v-model="modalFormData.maxRows" />
        </v-form-item>

        <v-form-item label="模式:" v-if="typeof modalFormData.modeType != 'undefined'">
          <v-radio-group v-model="modalFormData.modeType">
            <v-radio-button value="default">单选</v-radio-button>
            <v-radio-button value="multiple">多选</v-radio-button>
          </v-radio-group>
        </v-form-item>
        
        <v-form-item label="城市数据层级:" v-if="typeof modalFormData.addressShowLevel != 'undefined'">
          <v-input-number v-model="modalFormData.addressShowLevel" :min="1" :max="3" />
        </v-form-item>

        <v-form-item label="选项设置:" v-if="Array.indexOf(optionsType, modalFormData.type)>-1">
          <v-tabs :activeKey="modalFormData.optionsType" @change="handleOptionTabs">
            <v-tab-pane tab="静态数据" key="1">
              <div class="customer-options-item-list">
                <template v-for="(item,index) in modalFormData.items">
                  <div class="clearfix margin-bottom-5" style="line-height: 24px;">
                    <v-input
                      v-model="item.label"
                      class="fl"
                      style="width:285px; display:inline-block"
                      size="small"
                    />
                    <v-button-group class="fl margin-left-10" size="small">
                      <v-button type="default" icon="minus" @click="optionsDel(index)"></v-button>
                      <v-button type="default" icon="plus" @click="optionsAdd(index)"></v-button>
                    </v-button-group>
                  </div>
                </template>
              </div>
            </v-tab-pane>
            <v-tab-pane tab="远程数据" key="2">
              <div class="margin-bottom-5 clearfix">
                <div class="fl padding-top-10">字典地址:</div>
                <div class="fr">
                  <v-button type="text" icon="bulb" @click="()=>{this.dataFormatModal=true}">查看数据格式</v-button>
                </div>
              </div>
              <v-input
                v-model="modalFormData.dataSourceUrl"
                placeholder="远端数据字典请求地址，例如 http://192.168.1.1:9090/userinfo"
              />
              <div class="margin-bottom-5 margin-top-5">请求方法:</div>
              <v-select v-model="modalFormData.dataSourceType" style="width: 320px">
                <v-select-option value="POST">POST</v-select-option>
                <v-select-option value="GET">GET</v-select-option>
              </v-select>
            </v-tab-pane>
          </v-tabs>
        </v-form-item>
      </v-form>
    </v-modal>

    <!-- 数据格式 -->
    <v-modal v-model="dataFormatModal" title="数据格式">
      <template slot="footer">
        <v-button key="submit" type="primary" @click="()=>{this.dataFormatModal=false}">知道了</v-button>
      </template>
      <pre class="show-data-format">{{modalFormData.items}}</pre>
    </v-modal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import form_list from "./components/FormList";
import Renders from "./components/Render";

export default {
  components: {
    draggable,
    Renders
  },
  data() {
    return {
      showModal: false,
      // 深拷贝对象，防止默认空对象被更改
      modalFormData: {
        loading: false
      },
      //存储当前旧选项
      oldModelFormDataItems: null,
      formConfig: {
        labelPosition: "left",
        labelWidth: 100
      },
      formData: {},
      oldOptionsIetms: [],
      optionsType: ["select", "radio", "checkbox", "cascader"],
      resultOptions: {
        animation: 150,
        ghostClass: "ghost",
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        }
      },
      controlLists: form_list,
      controlTabsTitle: [
        "输入框",
        "单选/多选",
        "选择框",
        "时间",
        "上传",
        "其它"
      ],
      controlOptions: {
        animation: 0,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      },
      dataFormatModal: false
    };
  },
  props: {
    resultLists: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {},
  computed: {},
  watch: {
    resultLists(val) {
      val.forEach((item, index) => {
        if (item.obj.uid == "") {
          let _uid =
            item.obj.type +
            "-" +
            Date.parse(new Date()) +
            "-" +
            (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          item.obj.uid = _uid;
          item.obj.name = _uid;
        }
      });
    }
  },
  methods: {
    async getDataSource(itme, index) {
      let rdata = await this.request(item.obj.dataSourceUrl);
      console.info(rdata);
    },
    //发布
    handleResultSubmit() {
      this.$emit("backResultJson", this.resultLists);
    },
    //重置
    handleResultReset() {
      this.resultLists.splice(0, this.resultLists.length);
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.resultLists[index]);

      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }

      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index;
      /* if (this.modalFormData.optionsType == "2") {
        ////////////////////BUG
        if (this.modalFormData.items == undefined) {
          this.oldChildrenOptionsIetms = this.modalFormData.childrenitems;
        } else {
          this.oldOptionsIetms = this.modalFormData.items;
        }
      } */
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle(index) {
      this.resultLists.splice(index, 1);
    },
    // 克隆,深拷贝对象
    cloneData(original) {
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },
    //选项设置 删除
    optionsDel(i) {
      let _content = "";
      switch (this.modalFormData.type) {
        case "radio":
          if (this.modalFormData.items.length == 2) {
            _content = "单选框最少两个选项";
          }
          break;
        case "select":
          if (this.modalFormData.items.length == 1) {
            _content = "下拉框最少1个选项";
          }
          break;
        case "checkbox":
          if (this.modalFormData.items.length == 1) {
            _content = "多选择框最少1个选项";
          }
          break;
      }
      if (_content != "") {
        this.$error({
          title: "提示",
          content: _content
        });
        return;
      }
      this.modalFormData.items.splice(i, 1);
      this.resetOptionsItems(this.modalFormData.items);
    },
    //选项设置 添加
    optionsAdd(i) {
      this.modalFormData.items.splice(i + 1, 0, {
        label: "单选框",
        value: "0"
      });
      this.resetOptionsItems(this.modalFormData.items);
    },
    //重置选项value
    resetOptionsItems(items) {
      items.forEach((item, index) => {
        item.value = index + 1;
      });
    },
    //选项设置 切换方式
    handleOptionTabs(key) {
      this.modalFormData.optionsType = key;
    },
    // modal点击确定执行事件
    handleOk() {
      let index = this.modalFormData.listIndex;
      this.resultLists[index].obj = Object.assign(
        {},
        this.resultLists[index].obj,
        this.modalFormData
      );
      this.handleCancel();
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.showModal = false;
      this.modalFormData = {
        loading: false
      };
    }
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>