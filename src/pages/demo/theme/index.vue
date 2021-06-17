<template>
  <div>
    <v-card title="动态皮肤" class="mb-30">
      <template v-for="(item,index) in colorList">
        <v-button type="primary" class="mr-20" @click="changeColor(item)" :key="index">{{item.key}}</v-button>
      </template>
    </v-card>

    <v-card>
      <div class="mb-20">
        <v-button type="primary">Primary</v-button>
        <v-button>Default</v-button>
        <v-button type="dashed">Dashed</v-button>
        <v-button type="danger">Danger</v-button>
        <v-config-provider :autoInsertSpaceInButton="false">
          <v-button type="primary">按钮</v-button>
        </v-config-provider>
        <v-button type="primary">按钮</v-button>
        <v-button type="link">Link</v-button>
      </div>
      <div class="mb-20">
        <v-dropdown>
          <v-menu slot="overlay">
            <v-menu-item key="1">
              <v-icon type="user" />1st menu item
            </v-menu-item>
            <v-menu-item key="2">
              <v-icon type="user" />2nd menu item
            </v-menu-item>
            <v-menu-item key="3">
              <v-icon type="user" />3rd item
            </v-menu-item>
          </v-menu>
          <v-button style="margin-left: 8px">
            Button
            <v-icon type="down" />
          </v-button>
        </v-dropdown>
      </div>

      <div class="mb-20">
        <v-pagination v-model="current" :total="50" />
      </div>
      <div class="mb-20">
        <v-steps :current="1">
          <v-step>
            <!-- <span slot="title">Finished</span> -->
            <template slot="title">Finished</template>
            <span slot="description">This is a description.</span>
          </v-step>
          <v-step title="In Progress" description="This is a description." />
          <v-step title="Waiting" description="This is a description." />
        </v-steps>
      </div>
      <div class="mb-20">
        <v-checkbox checked>Checkbox</v-checkbox>
      </div>
      <div class="mb-20">
        <v-date-picker />
      </div>
      <div class="mb-20">
        <v-input></v-input>
      </div>
      <div class="mb-20">
        <v-slider :defaultValue="30"  />
      </div>
      <div class="mb-20">
        <v-radio checked>Radio</v-radio>
      </div>
      <div class="mb-20">
        <v-switch defaultChecked />
      </div>
      <div class="mb-20">
        <v-table :columns="columns" :dataSource="data" bordered>
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{text}}</a>
          </template>
          <template slot="title" slot-scope="currentPageData">Header</template>
          <template slot="footer" slot-scope="currentPageData">Footer</template>
        </v-table>
      </div>
      <div class="mb-20">
        <v-tabs defaultActiveKey="1">
          <v-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</v-tab-pane>
          <v-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</v-tab-pane>
          <v-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</v-tab-pane>
        </v-tabs>
      </div>
      <div class="mb-20">
        <v-timeline>
          <v-timeline-item>Create a services site 2015-09-01</v-timeline-item>
          <v-timeline-item>Solve initial network problems 2015-09-01</v-timeline-item>
          <v-timeline-item>Technical testing 2015-09-01</v-timeline-item>
          <v-timeline-item>Network problems being solved 2015-09-01</v-timeline-item>
        </v-timeline>
      </div>
      <div class="mb-20">
        <v-tree
          checkable
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          v-model="checkedKeys"
          @select="onSelect"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
        />
      </div>
      <div class="mb-20">
        <v-button type="primary" @click="showModal">Open Modal with async logic</v-button>
        <v-modal title="Title" :visible="visible" @ok="handleOk" @cancel="handleCancel">
          <p>'Content of the modal'</p>
        </v-modal>
      </div>
      <div class="mb-20">
        <v-spin />
      </div>
      <div class="mb-20"></div>
      <div class="mb-20"></div>
    </v-card>
  </div>
</template>

<script>
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" }
        ]
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" }
        ]
      },
      {
        title: "0-0-2",
        key: "0-0-2"
      }
    ]
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" }
    ]
  },
  {
    title: "0-2",
    key: "0-2"
  }
];
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park"
  }
];
const colorList = [
  {
    class: "skin-darkred",
    key: "殷红",
    color: "#983b39"
  },
  {
    class: "skin-tangerine",
    key: "橘红",
    color: "#fa541c"
  },
  {
    class: "skin-orange",
    key: "橙黄",
    color: "#fa8c16"
  },
  {
    class: "skin-apricot",
    key: "杏黄",
    color: "#faad14"
  },
  {
    class: "skin-beangreen",
    key: "豆绿",
    color: "#7cb305"
  },
  {
    class: "skin-stonegreen",
    key: "石绿",
    color: "#389e0d"
  },
  {
    class: "skin-coppergreen",
    key: "铜绿",
    color: "#068d87"
  },
  {
    class: "skin-blue",
    key: "天蓝（默认）",
    color: "#1890FF"
  },
  {
    class: "skin-indigo",
    key: "靛蓝",
    color: "#096dd9"
  },
  {
    class: "skin-sapphire",
    key: "宝蓝",
    color: "#1d39c4"
  },
  {
    class: "skin-pink",
    key: "桃红",
    color: "#ff7c7c"
  }
];
export default {
  name: "theme_index",
  data() {
    return {
      colorList,
      current: 2,
      data,
      columns,
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      treeData,
      visible: false
    };
  },
  methods: {
    changeColor(item) {
      this.util.themeColor.changeColor(item.color);
      this.$store.commit("setSkinTheme", item);
    },
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
    handleCancel(e) {
      this.visible = false;
    }
  }
};
</script>