<style lang="less">
@import "./area-linkage.less";
</style>

<template>
    <div class="area-linkage">
        <v-card>
            <v-row :gutter="16">
                <v-col :span="16">
                    <v-cascader v-model="cDefault" :options="cityData" @change="onChange" placeholder="请选择城市" style="width:360px"></v-cascader>

                    <div class="margin-top-20">
                        <v-button type="primary" @click="setDefaultCity">set city</v-button>
                    </div>
                </v-col>
                <v-col :span="8">
                    <pre style="font-size:12px;">
{{ showRes }}
                    </pre>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { pcaa } from 'area-data';
const createData = (val) => {
    let res = []
    for (const p in val) {
        let item = {
            value: p,
            label: val[p]
        };
        res.push(item);
    }
    return res
}
export default {
    name: 'arealinkage_index',
    data() {
        return {
            cityData: [],
            showLevel: 3,   //显示几级城市
            cDefault: [],
            showRes: []
        }
    },
    mounted() {
        this.initCityData()
    },
    watch: {
        "cDefault"(val) {
            this.showRes = val;
        }
    },
    methods: {
        initCityData() {
            let proitem = createData(pcaa['86'])
            if (this.showLevel > 1) {
                proitem.map((item) => {
                    item.children = createData(pcaa[item.value])
                    if (this.showLevel > 2) {
                        item.children.map((chiditem) => {
                            chiditem.children = createData(pcaa[chiditem.value])
                        })
                    }
                    return item
                })
            }
            this.cityData = proitem
        },
        setDefaultCity() {
            this.cDefault = ['350000', '350100', '350102']
        },
        onChange(value) {
            console.info(value)
        },
    }
};
</script>
