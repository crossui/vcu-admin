

<template>
  <div>
    <v-card>
      <div slot="title">
        <v-icon type="user"></v-icon>
        个人信息
      </div>
      <div>
        <v-form-model
          ref="userForm"
          :model="userForm"
          :rules="inforValidate"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <v-form-model-item label="用户姓名：" prop="name">
            <v-input v-model="userForm.name"></v-input>
          </v-form-model-item>
          <v-form-model-item label="用户手机：" prop="cellphone">
            <v-input v-model="userForm.cellphone"></v-input>
          </v-form-model-item>
          <v-form-model-item label="公司：">
            <span>{{ userForm.company }}</span>
          </v-form-model-item>
          <v-form-model-item label="部门：">
            <span>{{ userForm.department }}</span>
          </v-form-model-item>
          <v-form-model-item label=" " :colon="false">
            <v-button type="text" size="large" @click="cancelEditUserInfor">
              取消
            </v-button>
            <v-button
              type="primary"
              size="large"
              class="ml-20"
              :loading="save_loading"
              @click="saveEdit"
            >
              保存
            </v-button>
          </v-form-model-item>
        </v-form-model>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ownspace_index",
  data() {
    const validePhone = (rule, value, callback) => {
      var re = /^1[0-9]{10}$/;
      if (!re.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      userForm: {
        name: "",
        cellphone: "",
        company: "",
        department: "",
      },
      uid: "", // 登录用户的userId
      inforValidate: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cellphone: [
          { required: true, message: "请输入手机号码" },
          { validator: validePhone },
        ],
      },
      save_loading: false,
    };
  },
  methods: {
    showEditPassword() {
      this.editPasswordModal = true;
    },
    cancelEditUserInfor() {
      this.util.colsePage("ownspace_index");
    },
    saveEdit() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.saveInfoAjax();
        }
      });
    },
    init() {
      this.userForm.name = "lubin";
      this.userForm.cellphone = "18860165063";
      this.initPhone = "18860165063";
      this.userForm.company = "crossui";
      this.userForm.department = "可视化部门";
    },
    saveInfoAjax() {
      this.save_loading = true;
      setTimeout(() => {
        this.$message.success("保存成功");
        this.save_loading = false;
      }, 1000);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import "./own-space.less";
</style>