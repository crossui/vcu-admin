<style lang="less">
@import "./error-page.less";
</style>

<template>
    <div class="error-page">
        <v-row>
            <v-card>
                <div slot="title">
                    404-页面不存在
                </div>
                <v-row>
                    <v-col :span="10">
                        <v-card dis-hover>
                            <v-row>
                                <div class="error-page-show">
                                    <error404></error404>
                                </div>
                                <div class="error-page-cover"></div>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col :span="14" class="padding-left-10">
                        <v-row type="flex" align="middle" class="error-page-intro-con">
                            <p>当访问的页面不存在时会跳转到404页面，您可以在浏览器地址栏中修改url为一个不存在的路径，体验一下效果</p>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
        <v-row class="margin-top-10">
            <v-card>
                <div slot="title">
                    403-权限不足
                </div>
                <v-row>
                    <v-col :span="10">
                        <v-card dis-hover>
                            <v-row>
                                <div class="error-page-show">
                                    <error403></error403>
                                </div>
                                <div class="error-page-cover"></div>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col :span="14" class="padding-left-10">
                        <v-row type="flex" align="middle" class="error-page-intro-con">
                            <p>在当前登录用户不具有执行当前操作的权限时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为403时跳转到该页面</p>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
        <v-row class="margin-top-10">
            <v-card>
                <div slot="title">
                    500-服务端错误
                </div>
                <v-row>
                    <v-col :span="10">
                        <v-card dis-hover>
                            <v-row>
                                <div class="error-page-show">
                                    <error500></error500>
                                </div>
                                <div class="error-page-cover"></div>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col :span="14" class="padding-left-10">
                        <v-row type="flex" align="middle" class="error-page-intro-con">
                            <p>当请求之后出现服务端错误时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为500时跳转到该页面</p>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </div>
</template>

<script>
import Error404 from './404.vue';
import Error500 from './500.vue';
import Error403 from './403.vue';
export default {
    components: {
        Error404,
        Error500,
        Error403
    }
};
</script>
