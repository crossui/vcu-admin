<template>
  <div class>
    <v-button class="editable-add-btn" @click="handleAddColumn">添加列</v-button>
    <v-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="label" slot-scope="label, record">
        <editable-cell :text="label" :defaultKey="record.key" @change="onChangeColumnName" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a href="javascript:;" @click="handleAddChildrenColumn(record.key)">添加</a>
        <v-popconfirm
          v-if="dataSource.length"
          title="确定要删除?"
          @confirm="() => onDeleteColumn(record.key)"
        >
          <a href="javascript:;">删除</a>
        </v-popconfirm>
      </template>
    </v-table>
    <v-button class="editable-add-btn" @click="getColumnData">打印</v-button>
  </div>
</template>

<script>
import editableCell from "@/components/EditableCell";
const recursionColumn = (dataSource, key) => {
  let target = dataSource.find(item => item.key === key);
  if (target == undefined) {
    dataSource.forEach((element, index) => {
      if (element.children != undefined) {
        target = recursionColumn(element.children, key);
      }
    });
  }
  return target;
};
export default {
  name: "level-1",
  components: {
    editableCell
  },
  data() {
    return {
      dataSource: [
        {
          key: "1",
          value: "0",
          label: "选项1",
          children: [
            {
              key: "11",
              value: "11",
              label: "选项11"
            },
            {
              key: "12",
              value: "12",
              label: "选项12"
            }
          ]
        },
        {
          key: "2",
          value: "2",
          label: "选项2"
        }
      ],
      columns: [
        {
          title: "选项名称",
          dataIndex: "label",
          width: "90%",
          scopedSlots: { customRender: "label" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  methods: {
    //选项Label改变后更新列数据（级联）
    onChangeColumnName(key, value) {
      console.info(key, value);
    },
    //删除列（级联）
    onDeleteColumn(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    //新增列（级联）
    handleAddColumn() {
      const { dataSource } = this;
      let _value = (this.dataSource.length + 1).toString();
      const newData = {
        key: _value,
        value: _value,
        label: `选项 ${_value}`
      };
      this.dataSource = [...dataSource, newData];
    },
    //新增子列（级联）
    handleAddChildrenColumn(key) {
      const dataSource = [...this.dataSource];
      const target = recursionColumn(dataSource, key);
      if (target) {
        if (target.children == undefined) target.children = [];
        let _value = (target.children.length + 1).toString();
        target.children.push({
          key: `${key}${_value}`,
          value: `${key}${_value}`,
          label: `选项${key}${_value}`
        });
        this.dataSource = dataSource;
      }
    },

    getColumnData() {
      console.info(this.dataSource);
    }
  }
};
</script>

<style scoped>
</style>
