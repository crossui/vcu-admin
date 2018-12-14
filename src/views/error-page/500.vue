<style lang="less">
@import "./500.less";
</style>

<template>
    <div class="error500">
        <div class="error500-body-con">
            <v-card>
                <div class="error500-body-con-title">
                    5<span class="error500-0-span">
                        <v-icon type="rocket"></v-icon>
                    </span><span class="error500-0-span">
                        <v-icon type="rocket"></v-icon>
                        <v-icon type="social-freebsd-devil"></v-icon>
                    </span>
                </div>
                <p class="error500-body-con-message">Oops! the server is wrong</p>
                <div class="error500-btn-con">
                    <v-button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</v-button>
                    <v-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</v-button>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error500',
    methods: {
        backPage() {
            this.$router.go(-1);
        },
        goHome() {
            this.$router.push({
                name: 'home_index'
            });
        }
    }
};
</script>
