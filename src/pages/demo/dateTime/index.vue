<template>
  <div>
    <v-card title="日期" class="mb-20">
      <div class="mb-20">
        <dateTime
          isEditable
          v-model="dateTimeValue"
          :size="appConfig.elementSize"
          :dateTimeOptions="dateTimeOptionType"
        />
      </div>
      <v-button @click="handleCheng(0)" class="mr-10">默认</v-button>
      <v-button @click="handleCheng(1)" class="mr-10">切换1,初始值</v-button>
      <v-button @click="handleCheng(2)" class="mr-10">切换2,初始值</v-button>
      <v-button @click="handleCheng(3)" class="mr-10">切换3,初始值</v-button>
      <v-button @click="handleCheng(4)" class="mr-10">切换4,初始值</v-button>
      <v-button @click="handleGet" class="mr-10">获取值</v-button>
    </v-card>

    <v-card title="日期校验 form" class="mb-20">
      <v-form :form="formValidates" layout="inline">
        <v-form-item label="日期组件">
          <dateTime
            v-decorator="[
              'dateTimeForm',
              { rules: [{ required: true, message: '请选择日期！' }] },
            ]"
            :size="appConfig.elementSize"
          />
        </v-form-item>
        <v-form-item>
          <v-button
            type="primary"
            @click="handleSubmitForm"
            :size="appConfig.elementSize"
            >校验</v-button
          >
        </v-form-item>
      </v-form>
    </v-card>

    <v-card title="日期校验 formModel" class="mb-20">
      <v-form-model ref="ruleForm" :model="form" :rules="rules" layout="inline">
        <v-form-model-item label="日期组件" prop="datetime">
          <dateTime v-model="form.datetime" :size="appConfig.elementSize" />
        </v-form-model-item>
        <v-form-model-item>
          <v-button
            type="primary"
            @click="handleSubmit"
            :size="appConfig.elementSize"
            >校验</v-button
          >
        </v-form-model-item>
      </v-form-model>
    </v-card>

    <v-card title="初始时间区间" class="mb-20">
      <dateTime
        v-model="dateTimeValue1"
        :size="appConfig.elementSize"
        :interval="7"
      />
    </v-card>

    <v-card title="不可选择日期" class="mb-20">
      <dateTime
        v-model="dateTimeValueDisable"
        :dateTimeOptions="dateTimeOptionsDisable"
        :size="appConfig.elementSize"
      />
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "dateTimeDemo",
  data() {
    const validateDateTime = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please select all datetime!!!"));
      } else {
        callback();
      }
    };
    return {
      dateTimeValue: null,
      dateTimeValue1: null,
      dateTimeOptionType: null,
      form: {
        datetime: null,
      },
      rules: {
        datetime: [
          {
            required: true,
            message: "Please select datetime",
          },
          {
            validator: validateDateTime,
          },
        ],
      },
      dateTimeValueDisable: null,
      dateTimeOptionsDisable: {
        startDate: {
          disabledDate: this.disabledStartDate,
        },
        endDate: {
          disabledDate: this.disabledEndDate,
        },
      },

      formValidates: this.$form.createForm(this),
    };
  },
  methods: {
    handleGet() {
      console.info(this.dateTimeValue);
    },
    handleCheng(type) {
      //后端返回四种时间格式
      let date1 = "2020-04-07 12:12:12";
      let date2 = "2020-04-07";
      let date3 = "2020040710:44:06";
      let date4 = "20200407";

      switch (type) {
        case 0:
          this.dateTimeValue = null;
          this.dateTimeOptionType = null;
          break;
        case 1:
          this.dateTimeValue = {
            startDate: this.util.stringToDate(date2),
            endDate: this.util.stringToDate(date4),
          };
          this.dateTimeOptionType = {
            startDate: {
              change: (date, dateString) => {
                console.info(date, dateString);
              },
            },
            startTime: {
              isShow: false,
            },
            endTime: {
              isShow: false,
            },
          };
          break;
        case 2:
          this.dateTimeValue = {
            startTime: this.util.stringToDate(date1, "hh:mm:ss"),
            endTime: this.util.stringToDate(date3, "hh:mm:ss"),
          };
          this.dateTimeOptionType = {
            startDate: {
              isShow: false,
            },
            endDate: {
              isShow: false,
            },
          };
          break;
        case 3:
          this.dateTimeValue = {
            startDate: this.util.stringToDate(date1, "yyyy-MM-dd"),
            startTime: this.util.stringToDate(date1, "hh:mm:ss"),
          };
          this.dateTimeOptionType = {
            endDate: {
              isShow: false,
            },
            endTime: {
              isShow: false,
            },
          };
          break;
        case 4:
          this.dateTimeValue = {
            startDate: this.util.formatDate(new Date(), "yyyy-MM-dd"),
          };
          this.dateTimeOptionType = {
            startTime: {
              isShow: false,
            },
            endDate: {
              isShow: false,
            },
            endTime: {
              isShow: false,
            },
          };
          break;
      }
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    disabledStartDate(current) {
      return current < moment().endOf("day");
    },
    disabledEndDate(current) {
      return current > moment().endOf("day");
    },
    handleSubmitForm() {
      const {
        formValidates: { validateFields },
      } = this;
      validateFields((errors, values) => {
        if (!errors) {
          console.info("true");
        } else {
          console.info("false");
        }
      });
    },
  },
};
</script>