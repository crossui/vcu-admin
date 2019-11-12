let modalMixin = {
    data() {
        return {
            dataFormatModal: false,
            showModal: false,
            // 深拷贝对象，防止默认空对象被更改
            modalFormData: {
                loading: false
            },
            optionsType: ["select", "radio", "checkbox", "cascader"],
            optionsTypeOne: ["select", "radio", "checkbox"],
        };
    },
    methods: {
        //选项设置 删除
        optionsDel(i) {
            let _content = "";
            switch (this.modalFormData.type) {
                case "radio":
                    if (this.modalFormData.items.length == 2) {
                        _content = "单选框最少两个选项";
                    }
                    break;
                case "select":
                    if (this.modalFormData.items.length == 1) {
                        _content = "下拉框最少1个选项";
                    }
                    break;
                case "checkbox":
                    if (this.modalFormData.items.length == 1) {
                        _content = "多选择框最少1个选项";
                    }
                    break;
            }
            if (_content != "") {
                this.$error({
                    title: "提示",
                    content: _content
                });
                return;
            }
            this.modalFormData.items.splice(i, 1);
            this.resetOptionsItems(this.modalFormData.items);
        },
        //选项设置 添加
        optionsAdd(i) {
            this.modalFormData.items.splice(i + 1, 0, {
                label: "单选框",
                value: "0"
            });
            this.resetOptionsItems(this.modalFormData.items);
        },
        //重置选项value
        resetOptionsItems(items) {
            items.forEach((item, index) => {
                item.value = index + 1;
            });
        },
        //选项设置 切换方式
        handleOptionTabs(key) {
            this.modalFormData.optionsType = key;
        },
        // modal点击确定执行事件
        handleOk() {
            let index = this.modalFormData.listIndex;
            this.resultLists[index].obj = Object.assign({},
                this.resultLists[index].obj,
                this.modalFormData
            );
            this.handleCancel();
        },
        // modal点击取消执行事件，清空当前modal内容
        handleCancel() {
            this.showModal = false;
            this.modalFormData = {
                loading: false
            };
        }
    }
}

export default modalMixin;