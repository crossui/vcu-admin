export default (_self, h) => {
    let icons = [];
    // 配置按钮
    if (!!_self.obj.config) {
        icons.push(h('VIcon', {
            props: {
                type: 'setting',
            },
            nativeOn: {
                click() {
                    _self.$emit('handleConfEle', _self.index);
                }
            }
        }));
    }
    // 删除按钮
    icons.push(h('VIcon', {
        props: {
            type: 'delete'
        },
        nativeOn: {
            click() {
                _self.$emit('handleRemoveEle', _self.index);
            }
        }
    }));
    const item_icon = h('div', {
        class: {
            'item-icon': true
        }
    }, icons);
    return item_icon;
}