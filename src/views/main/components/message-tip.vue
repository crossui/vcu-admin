<template>
    <div @click="showMessage" class="message-con fl margin-right-10">
        <v-tooltip :title="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <v-badge :count="value" dot>
                <v-icon type="bell" size="22"></v-icon>
            </v-badge>
        </v-tooltip>
    </div>
</template>

<script>
import util from '@/libs/util.js';
export default {
    name: 'messageTip',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    methods: {
        showMessage() {
            //util.openNewPage(this, 'message_index');
            this.$router.push({
                name: 'message_index'
            });
        }
    }
};
</script>

<style lang="less" scoped>
.message-con {
  cursor: pointer;
}
</style>
