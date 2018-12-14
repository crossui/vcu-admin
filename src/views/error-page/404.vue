<style lang="less">
@import "./404.less";
</style>

<template>
    <div class="error404">
        <div class="error404-body-con">
            <v-card>
                <div class="error404-body-con-title">4<span>
                        <v-icon type="frown"></v-icon>
                    </span>4</div>
                <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
                <div class="error404-btn-con">
                    <v-button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</v-button>
                    <v-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</v-button>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error404',
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
