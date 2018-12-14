<template>
    <v-breadcrumb>
        <v-breadcrumb-item v-for="item in currentPath" :to="item.path" :key="item.name">{{ itemTitle(item) }}</v-breadcrumb-item>
    </v-breadcrumb>
</template>

<script>
import util from '@/libs/util'
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    data() {
        return {
        }
    },
    methods: {
        itemTitle(item) {
            return util.showTitle(item, this);
        },
    },
    mounted() {

    }
};
</script>

