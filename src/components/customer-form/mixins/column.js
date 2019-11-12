import editableCell from "@/components/EditableCell";

//递归查找对应的列
const recursionQueryColumn = (dataSource, key) => {
    let target = dataSource.find(item => item.key === key);
    if (target == undefined) {
        dataSource.forEach((element, index) => {
            if (element.children != undefined) {
                target = recursionQueryColumn(element.children, key);
            }
        });
    }
    return target;
};
//递归删除对应的列
const recursionDeleteColumn = (dataSource, key) => {
    dataSource.forEach((item, index) => {
        if (item.key === key) {
            dataSource.splice(index, 1);
        } else if (item.children) {
            return recursionDeleteColumn(item.children, key);
        }
    });
    return dataSource;
};
//清空列中无子节点的Children
const clearColumnChildren = dataSource => {
    dataSource.forEach((item, index) => {
        if (item.children == undefined) return;
        if (item.children.length == 0) {
            delete item.children;
        } else {
            return clearColumnChildren(item.children);
        }
    });
    return dataSource;
};
let columnMixin = {
    components: {
        editableCell
    },
    data() {
        return {
            columns: [{
                    title: "选项名称",
                    dataIndex: "label",
                    width: "80%",
                    scopedSlots: { customRender: "label" }
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    scopedSlots: { customRender: "operation" }
                }
            ]
        };
    },
    methods: {
        //选项Label改变后更新列数据（级联）
        onChangeColumnName(key, value) {
            const dataSource = [...this.modalFormData.items];
            const target = recursionQueryColumn(dataSource, key);
            if (target) {
                target.label = value;
                this.modalFormData.items = dataSource;
            }
        },
        //删除列（级联）
        onDeleteColumn(key) {
            let dataSource = [...this.modalFormData.items];
            dataSource = recursionDeleteColumn(dataSource, key);
            dataSource = clearColumnChildren(dataSource);
            this.modalFormData.items = dataSource;
        },
        //新增列（级联）
        handleAddColumn() {
            //const { dataSource } = this;
            let _value = (this.modalFormData.items.length + 1).toString();
            const newData = {
                key: _value,
                value: _value,
                label: `选项 ${_value}`
            };
            this.modalFormData.items = [...this.modalFormData.items, newData];
        },
        //新增子列（级联）
        handleAddChildrenColumn(key) {
            const dataSource = [...this.modalFormData.items];
            const target = recursionQueryColumn(dataSource, key);
            if (target) {
                if (target.children == undefined) target.children = [];
                let _value = (target.children.length + 1).toString();
                target.children.push({
                    key: `${key}${_value}`,
                    value: `${key}${_value}`,
                    label: `选项${key}${_value}`
                });
                this.modalFormData.items = dataSource;
            }
        }
    }
}

export default columnMixin;