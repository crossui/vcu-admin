<template>
  <div class="cmhwrapper">
    <div class="cmh_company">
      <div class="cmh_logo">
        <img :src="logo" />
      </div>
      <div class="cmh_company_text">{{ title }}</div>
      <template v-if="appConfig.navigationMode == 'sidemenu'">
        <div class="cmh_collapsed" v-if="quotePage">
          <icon-font
            :type="collapsed ? 'iconsqr' : 'iconsq'"
            @click="handleCollapsed"
          />
        </div>
      </template>
      <template v-else>
        <div class="cmh_menu" :style="{ maxWidth: menuMaxWidth + 'px' }">
          <sideMenu
            menuMode="horizontal"
            :menu-list="menuList"
            @on-click="handleClickMenu"
          />
        </div>
      </template>
    </div>

    <div ref="cmhFns" class="cmh_fns">
      <div class="cmh_implement">
        <div class="implement-item">
          <v-tooltip title="gitee地址" placement="bottom">
            <a href="https://gitee.com/ylzyxkfwb/vcu-admin" target="_blank">
              <v-icon type="github"></v-icon>
            </a>
          </v-tooltip>
        </div>
        <div class="implement-item">
          <v-tooltip title="消息中心" placement="bottom">
            <v-badge :dot="messageDot">
              <v-icon type="bell" @click="handleMessage"></v-icon>
            </v-badge>
          </v-tooltip>
        </div>
        <div class="implement-item">
          <v-tooltip title="刷新当前页" placement="bottom">
            <v-icon type="reload" @click="handleReloadPage"></v-icon>
          </v-tooltip>
        </div>
      </div>
      <div class="cmh_hospmes">
        <v-dropdown placement="bottomCenter">
          <span class="span-item">
            <v-avatar
              size="small"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            ></v-avatar>
            {{ userName }}
          </span>
          <v-menu slot="overlay">
            <v-menu-item>
              <a href="javascript:;" @click="handleOwnSpace">
                <v-icon type="user"></v-icon> 个人中心
              </a>
            </v-menu-item>
            <v-menu-item>
              <a href="javascript:;" @click="handleShowEidtPassWord">
                <v-icon type="unlock"></v-icon> 修改密码
              </a>
            </v-menu-item>
            <v-menu-divider></v-menu-divider>
            <v-menu-item>
              <a href="javascript:;" @click="handleExit">
                <v-icon type="logout"></v-icon> 退出系统
              </a>
            </v-menu-item>
          </v-menu>
        </v-dropdown>
      </div>
    </div>

    <!-- 修改密码 -->
    <v-modal
      title="修改密码"
      :visible="editPassWordVisible"
      :confirm-loading="editPassWordLoading"
      ok-text="保存"
      @ok="handleOkEditPassWord"
      @cancel="handleCancelEditPassWord"
    >
      <v-row :gutter="16">
        <v-col :span="16">
          <v-form-model
            ref="editPassWordForm"
            :model="editPassWordForm"
            :rules="editPassWordRules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <v-form-model-item label="旧密码" prop="oldPasswd">
              <v-input :type="inputType" v-model="editPassWordForm.oldPasswd" />
            </v-form-model-item>
            <v-form-model-item label="新密码" prop="newPasswd">
              <v-input
                :type="inputType"
                v-model="editPassWordForm.newPasswd"
                @change="handleChangeNewPasswd"
              />
            </v-form-model-item>
            <v-form-model-item label="确认新密码" prop="newPasswdCheck">
              <v-input
                :type="inputType"
                v-model="editPassWordForm.newPasswdCheck"
              />
            </v-form-model-item>
          </v-form-model>
        </v-col>
        <v-col :span="8">
          <v-checkbox @change="onChangeShowPasswd" class="mt-10"
            >显示字符</v-checkbox
          >
          <div class="mt-30">
            <span>密码强度等级{{ percentPasswdText }}</span>
            <v-progress
              :percent="percentPasswd"
              :show-info="false"
              size="small"
            />
          </div>
        </v-col>
      </v-row>
    </v-modal>
  </div>
</template>
<script>
import sideMenu from "./sideMenu";
import * as api from "@/api/common/app";
//计算密码强度
const checkPasswdStrength = (password) => {
  let strength = 0;
  if (password == "") {
    strength = 0;
  } else if (password.length < 6) {
    strength = 0.5;
  } else {
    strength = password.match(
      /[a-z](?![^a-z]*[a-z])|[A-Z](?![^A-Z]*[A-Z])|\d(?![^\d]*\d)|[^a-zA-Z\d](?![a-zA-Z\d]*[^a-zA-Z\d])/g
    ).length;
    if (strength > 2 && password.length > 12) {
      strength = 4;
    }
  }
  return strength;
};
export default {
  name: "commonHeader",
  props: {},
  components: { sideMenu },
  computed: {
    messageDot() {
      return this.$store.state.app.messageCount;
    },
    collapsed() {
      return this.$store.state.app.collapsed;
    },
    quotePage() {
      return this.$store.state.app.quotePage;
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
    logo() {
      return require(`@/assets/images/logo.png`);
    },
    userName() {
      return this.$store.state.user.loginUser
        ? this.$store.state.user.loginUser.userName
        : "";
    },
  },
  watch: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (
        this.editPassWordForm.newPasswd !== "" &&
        this.editPassWordForm.newPasswd.length >= 6
      ) {
        this.$refs.editPassWordForm.validateField("newPasswdCheck");
      }
      callback();
    };
    let validatePassCheck = (rule, value, callback) => {
      if (value !== this.editPassWordForm.newPasswd) {
        callback(new Error("确认新密码与新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      editPassWordVisible: false,
      editPassWordLoading: false,
      editPassWordForm: {
        oldPasswd: "",
        newPasswd: "",
        newPasswdCheck: "",
      },
      editPassWordRules: {
        oldPasswd: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur",
          },
        ],
        newPasswd: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "change" },
        ],
        newPasswdCheck: [
          {
            required: true,
            message: "确认新密码不能为空",
            trigger: "blur",
          },
          { validator: validatePassCheck, trigger: "change" },
        ],
      },
      inputType: "password",
      percentPasswd: 0,
      percentPasswdText: "",
      dateTimer: "",
      menuMaxWidth: 1000,
      title: this.appConfig.title,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.appConfig.navigationMode == "topmenu") {
        this.calculatedMenuWidth();
        window.addEventListener(
          "resize",
          _.throttle(this.calculatedMenuWidth, 100)
        );
      }
    },
    calculatedMenuWidth() {
      let cmhFns = this.$refs.cmhFns;
      this.$nextTick(() => {
        this.menuMaxWidth = document.body.offsetWidth - cmhFns.offsetWidth;
      });
    },
    //缩进菜单
    handleCollapsed() {
      this.$store.commit("setCollapsed", !this.collapsed);
    },
    //消息中心
    handleMessage() {
      this.$router.push({
        name: "message_index",
      });
    },
    //刷新当前页
    handleReloadPage() {
      this.$store.commit("setIsMainAlive", false);
    },
    //个人中心
    handleOwnSpace() {
      this.$router.push({
        name: "ownspace_index",
      });
    },
    //退出系统
    handleExit() {
      this.$store.dispatch("exitSys");
      //this.$store.commit("exitSys");
      this.$router.push({
        name: "login",
      });
    },
    //显示修改密码窗口
    handleShowEidtPassWord() {
      this.editPassWordVisible = true;
    },
    //保存修改密码
    handleOkEditPassWord() {
      this.$refs.editPassWordForm.validate(async (valid) => {
        if (valid) {
          let res = api.passwordEdit({
            oldPassword: this.editPassWordForm.oldPasswd,
            newPassword: this.editPassWordForm.newPasswd,
          });
          if (res) {
            this.$message.success("密码修改成功");
            this.editPassWordVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    //取消修改密码
    handleCancelEditPassWord() {
      this.editPassWordVisible = false;
    },
    //检测密码强度
    handleChangeNewPasswd() {
      let percentPasswd = checkPasswdStrength(this.editPassWordForm.newPasswd);
      this.percentPasswd = percentPasswd * 30;
      switch (percentPasswd) {
        case 0:
          this.percentPasswdText = ": 极低";
          break;
        case 1:
          this.percentPasswdText = ": 中";
          break;
        case 2:
          this.percentPasswdText = ": 高";
          break;
        case 4:
          this.percentPasswdText = ": 极高";
          break;
      }
    },
    //是否显示字符
    onChangeShowPasswd(e) {
      if (e.target.checked) {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    handleClickMenu({ item, key, keyPath }) {
      this.$emit("on-click", { item, key, keyPath });
    },
  },
};
</script>

<style lang="less" scoped>
.flexBox(@type) {
  display: flex;
  flex-direction: @type;
  flex-wrap: wrap;
}
.cmhwrapper {
  width: 100%;
  height: 42px;
  .flexBox(row);
  .cmh_company {
    width: auto;
    display: flex;
    flex-wrap: nowrap;
    flex: 1;
    .flexBox(row);
    .cmh_logo {
      height: 42px;
      padding: 5px 10px;
      margin-right: 10px;
      box-sizing: border-box;
      position: relative;
      &:after {
        position: absolute;
        width: 1px;
        height: 30px;
        top: 6px;
        content: "";
        display: block;
        right: 0;
        background: rgba(255, 255, 255, 0.4);
      }
      img {
        height: 30px;
      }
    }
    .cmh_company_text {
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #fff;
      font-weight: 600;
    }

    .cmh_collapsed {
      margin-left: 25px;
      line-height: 42px;
      .iconfont {
        cursor: pointer;
        color: #fff;
      }
    }
    .cmh_menu {
      margin-left: 25px;
      flex: 1;
    }
  }

  .cmh_fns {
    height: 42px;
    background-color: rgba(0, 0, 0, 0.05);
    .flexBox(row);
    align-items: center;

    .cmh_implement {
      .implement-item {
        display: inline-block;
        margin: 0 10px;
        .vcuicon {
          font-size: 17px;
          color: #fff;
          cursor: pointer;
        }
      }
    }

    > div {
      .span-item {
        color: #fff;
        display: block;
        padding: 0 10px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        .vcu-avatar {
          position: relative;
          top: -3px;
        }
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 42px;
          height: 42px;
          color: #fff;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
}
</style>