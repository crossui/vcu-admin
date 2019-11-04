<template>
  <div class="customer-form-wrap">
    <v-row :gutter="16">
      <v-col class="gutter-row" :span="14">
        <div class="gutter-box">
          <v-card title="自定义表单结果">
            <div slot="extra">
              <v-button type="primary" icon="check" size="small">发布</v-button>
              <v-button type="warning" icon="delete" size="small">清空</v-button>
            </div>

            <div class="customer-form-result">
              <v-form ref="formValidate" v-model="formData" @submit.native.prevent :label-width="100">
                <draggable :list="resultLists" :options="resultOptions">
                  <transition-group
                    class="form-list-group"
                    type="transition"
                    :name="'flip-list'"
                    tag="div"
                  >
                    <renders
                      @handleRemoveEle="removeEle"
                      @handleConfEle="confEle"
                      v-for="(element,index) in resultLists"
                      :key="index"
                      :index="index"
                      :ele="element.ele"
                      :obj="element.obj || {}"
                      :data="formData"
                      @handleChangeVal="val => handleChangeVal(val,element)"
                      :sortableItem="resultLists"
                      :config-icon="true"
                    ></renders>
                  </transition-group>
                </draggable>
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
  </div>
</template>

<script>
//import util from "@/libs/util.js";
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
      formData:{},
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
  watch: {},
  methods: {
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.resultLists[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj['color']) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index;
      // 设置modalTitle
      this.modalFormData.modalTitle = list_temp.obj.label;
      if (this.modalFormData.optionsType) {
        this.getDataSourceItems(this.modalFormData.dataSourceId);
      } else {
        ////////////////////BUG
        if (this.modalFormData.items == undefined) {
          this.oldChildrenOptionsIetms = this.modalFormData.childrenitems;
        } else {
          this.oldOptionsIetms = this.modalFormData.items;
        }
      }
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
      // 添加一个modal标题
      //original.obj.modalTitle = original.obj.label || "";
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>