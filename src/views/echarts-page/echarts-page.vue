<style lang="less">
@import "./echarts-page.less";
</style>

<template>
    <div class="echarts-page">
        <v-card title="今日服务调用地理分布">
            <v-row>
                <v-col :span="8">
                    <v-table :columns="columns" bordered :scroll="{ x: false, y: 350 }" :pagination="false" :dataSource="cityData">
                    </v-table>
                </v-col>
                <v-col :span="16">
                    <div style="height:405px;" id="china_map"></div>
                </v-col>
            </v-row>
        </v-card>
        <v-row class="margin-top-20" :gutter="16">
            <v-col :span="10">
                <v-card title="数据来源统计">
                    <div style="height: 200px;" id="data_source_con"></div>
                </v-card>
            </v-col>
            <v-col :span="14">
                <v-card title="每日来访量统计">
                    <div style="height: 200px;" id="visite_volume_con"></div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import echarts from 'echarts';
import cityData from './map-data/get-city-value.js';
import geoData from './map-data/get-geography-value.js';
export default {
    name: 'echartspage_index',
    data() {
        return {
            cityData,
            columns: [{
                title: '城市',
                dataIndex: 'name',
                width: 150,
            }, {
                title: '流量(k)',
                dataIndex: 'value',
            }]
        }
    },
    mounted() {
        this.init()
    },
    destoryed() {
    },
    methods: {
        init() {
            this.chinaMap()
            this.dataSourcePie()
            this.visiteVolume()

        },
        chinaMap() {
            var convertData = function (data) {
                let res = [];
                let len = data.length;
                for (var i = 0; i < len; i++) {
                    var geoCoord = geoData[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            var map = echarts.init(document.getElementById('china_map'));
            const chinaJson = require('./map-data/china.json');
            window.setTimeout(() => {

                echarts.registerMap('china', chinaJson);
                map.setOption({
                    backgroundColor: '#FFF',
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#EFEFEF',
                                borderColor: '#CCC'
                            },
                            emphasis: {
                                areaColor: '#E5E5E5'
                            }
                        }
                    },
                    grid: {
                        top: 0,
                        left: '2%',
                        right: '2%',
                        bottom: '0',
                        containLabel: true
                    },
                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(cityData),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#0099CC'
                            }
                        }
                    }]

                });
                map.resize();
            }, 200)



            window.addEventListener('resize', function () {
                map.resize();
            });
        },
        dataSourcePie() {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            window.setTimeout(() => {
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['ios', 'android', 'pc', 'web', 'others']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 2103456, name: 'ios', itemStyle: { normal: { color: '#9bd598' } } },
                                { value: 1305923, name: 'android', itemStyle: { normal: { color: '#ffd58f' } } },
                                { value: 543250, name: 'pc', itemStyle: { normal: { color: '#abd5f2' } } },
                                { value: 798403, name: 'web', itemStyle: { normal: { color: '#ab8df2' } } },
                                { value: 302340, name: 'others', itemStyle: { normal: { color: '#e14f60' } } }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                dataSourcePie.resize();
            }, 200)
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        },
        visiteVolume() {
            let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
            window.setTimeout(() => {

                let xAxisData = [];
                let data1 = [];
                let data2 = [];
                for (let i = 0; i < 20; i++) {
                    xAxisData.push('类目' + i);
                    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }

                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: 0,
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '访问量',
                            type: 'bar',
                            data: [
                                { value: 453682, name: 'Mon', itemStyle: { normal: { color: '#2d8cf0' } } },
                                { value: 879545, name: 'Tues', itemStyle: { normal: { color: '#2d8cf0' } } },
                                { value: 2354678, name: 'Wed', itemStyle: { normal: { color: '#2d8cf0' } } },
                                { value: 1598403, name: 'Thur', itemStyle: { normal: { color: '#2d8cf0' } } },
                                { value: 543250, name: 'Fri', itemStyle: { normal: { color: '#2d8cf0' } } },
                                { value: 1305923, name: 'Sat', itemStyle: { normal: { color: '#2d8cf0' } } },
                                { value: 1103456, name: 'Sun', itemStyle: { normal: { color: '#2d8cf0' } } }
                            ]
                        }
                    ]
                };

                visiteVolume.setOption(option);
                visiteVolume.resize();
            }, 200)

            window.addEventListener('resize', function () {
                visiteVolume.resize();
            });
        }
    }
};
</script>
