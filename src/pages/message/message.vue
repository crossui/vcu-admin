

<template>
  <div class="message-main-con">
    <div class="message-mainlist-con">
      <div>
        <v-button
          @click="setCurrentMesType('unread')"
          size="large"
          block
          type="link"
        >
          <transition name="mes-current-type-btn">
            <v-icon
              v-show="currentMessageType === 'unread'"
              type="check"
            ></v-icon> </transition
          ><span class="mes-type-btn-text">未读消息</span>
          <v-badge
            class="message-count-badge-outer"
            class-name="message-count-badge"
            :count="unreadCount"
          ></v-badge>
        </v-button>
      </div>
      <div>
        <v-button
          @click="setCurrentMesType('hasread')"
          size="large"
          block
          type="link"
        >
          <transition name="mes-current-type-btn">
            <v-icon
              v-show="currentMessageType === 'hasread'"
              type="check"
            ></v-icon> </transition
          ><span class="mes-type-btn-text">已读消息</span>
          <v-badge
            class="message-count-badge-outer"
            class-name="message-count-badge"
            :count="hasreadCount"
          ></v-badge>
        </v-button>
      </div>
      <div>
        <v-button
          @click="setCurrentMesType('recyclebin')"
          size="large"
          block
          type="link"
        >
          <transition name="mes-current-type-btn">
            <v-icon
              v-show="currentMessageType === 'recyclebin'"
              type="check"
            ></v-icon> </transition
          ><span class="mes-type-btn-text">回收站</span>
          <v-badge
            class="message-count-badge-outer"
            class-name="message-count-badge"
            :count="recyclebinCount"
          ></v-badge>
        </v-button>
      </div>
    </div>
    <div class="message-content-con">
      <transition name="view-message">
        <div v-if="showMesTitleList" class="message-title-list-con">
          <v-table
            ref="messageList"
            :pagination="false"
            :columns="mesTitleColumns"
            :dataSource="currentMesList"
          >
            <a
              slot="name"
              slot-scope="text, record, index"
              href="javascript:;"
              @click="() => show(record, index)"
              >{{ text }}</a
            >
            <span slot="time" slot-scope="time">
              {{ formatDate(time) }}
            </span>
            <span slot="action" slot-scope="text, record, index">
              <template v-if="currentMessageType === 'unread'">
                <v-button type="primary" size="small" @click="() => read(index)"
                  >标为已读</v-button
                >
              </template>
              <template v-else-if="currentMessageType === 'hasread'">
                <v-button type="error" size="small" @click="() => del(index)"
                  >删除</v-button
                >
              </template>
              <template v-else>
                <v-button
                  type="danger"
                  size="small"
                  @click="() => restore(index)"
                  >还原</v-button
                >
              </template>
            </span>
          </v-table>
        </div>
      </transition>
      <transition name="back-message-list">
        <div v-if="!showMesTitleList" class="message-view-content-con">
          <div class="message-content-top-bar">
            <span class="mes-back-btn-con">
              <v-button type="link" @click="backMesTitleList">
                <v-icon type="rollback"></v-icon> 返回
              </v-button>
            </span>
            <h3 class="mes-title">{{ mes.name }}</h3>
          </div>
          <p class="mes-time-con">
            <v-icon type="android-time"></v-icon>&nbsp;&nbsp;{{ mes.time }}
          </p>
          <div class="message-content-body">
            <p class="message-content">{{ mes.content }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "message_index",
  data() {
    return {
      currentMesList: [],
      unreadMesList: [],
      hasreadMesList: [],
      recyclebinList: [],
      currentMessageType: "unread",
      showMesTitleList: true,
      unreadCount: 0,
      hasreadCount: 0,
      recyclebinCount: 0,
      noDataText: "暂无未读消息",
      mes: {
        name: "",
        time: "",
        content: "",
      },
      mesTitleColumns: [
        {
          title: " ",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: " ",
          dataIndex: "time",
          width: "180px",
          align: "center",
          scopedSlots: { customRender: "time" },
        },
        {
          title: " ",
          key: "action",
          width: "120px",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    formatDate(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return (
        year +
        "/" +
        month +
        "/" +
        day +
        "  " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    backMesTitleList() {
      this.showMesTitleList = true;
    },
    setCurrentMesType(type) {
      if (this.currentMessageType !== type) {
        this.showMesTitleList = true;
      }
      this.currentMessageType = type;
      if (type === "unread") {
        this.noDataText = "暂无未读消息";
        this.currentMesList = this.unreadMesList;
      } else if (type === "hasread") {
        this.noDataText = "暂无已读消息";
        this.currentMesList = this.hasreadMesList;
      } else {
        this.noDataText = "回收站无消息";
        this.currentMesList = this.recyclebinList;
      }
    },
    getContent(index) {
      // you can write ajax request here to get message content
      let mesContent = "";
      switch (this.currentMessageType + index) {
        case "unread0":
          mesContent =
            "这是您点击的《欢迎登录vcu-admin后台管理系统，来了解他的用途吧》的相关内容。";
          break;
        case "unread1":
          mesContent =
            "这是您点击的《使用vcu-admin和vcu-ui组件库快速搭建你的后台系统吧》的相关内容。";
          break;
        case "unread2":
          mesContent =
            "这是您点击的《喜欢vcu-admin的话，欢迎到github主页给个star吧》的相关内容。";
          break;
        case "hasread0":
          mesContent = "这是您点击的《这是一条您已经读过的消息》的相关内容。";
          break;
        default:
          mesContent = "这是您点击的《这是一条被删除的消息》的相关内容。";
          break;
      }
      this.mes.content = mesContent;
    },
    read(index) {
      this.hasreadMesList.unshift(this.currentMesList.splice(index, 1)[0]);
      this.$store.commit("setMessageCount", this.unreadMesList.length);
    },
    del(index) {
      this.recyclebinList.unshift(this.hasreadMesList.splice(index, 1)[0]);
    },
    restore(index) {
      this.hasreadMesList.unshift(this.recyclebinList.splice(index, 1)[0]);
    },
    show(data, index) {
      this.showMesTitleList = false;
      this.mes.name = data.name;
      this.mes.time = this.formatDate(data.time);
      this.getContent(index);
    },
  },
  mounted() {
    this.currentMesList = this.unreadMesList = [
      {
        name: "欢迎登录vcu-admin后台管理系统，来了解他的用途吧",
        time: 1507390106000,
      },
      {
        name: "使用vcu-admin和vcu-ui组件库快速搭建你的后台系统吧",
        time: 1507390106000,
      },
      {
        name: "喜欢vcu-admin的话，欢迎到github主页给个star吧",
        time: 1507390106000,
      },
    ];
    this.hasreadMesList = [
      {
        name: "这是一条您已经读过的消息",
        time: 1507330106000,
      },
    ];
    this.recyclebinList = [
      {
        name: "这是一条被删除的消息",
        time: 1506390106000,
      },
    ];
    this.unreadCount = this.unreadMesList.length;
    this.hasreadCount = this.hasreadMesList.length;
    this.recyclebinCount = this.recyclebinList.length;
  },
  watch: {
    unreadMesList(arr) {
      this.unreadCount = arr.length;
    },
    hasreadMesList(arr) {
      this.hasreadCount = arr.length;
    },
    recyclebinList(arr) {
      this.recyclebinCount = arr.length;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./message.less";
</style>