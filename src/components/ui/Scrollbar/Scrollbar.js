import { addResizeListener, removeResizeListener } from './resize-event';
import scrollbarWidth from './scrollbar-width';
import { toObject } from './util';
import Bar from './bar';
import './scrollbar.less';

/* istanbul ignore next */
export default {
    name: 'Scrollbar',

    components: { Bar },

    props: {
        zIndex: {
            type: Number,
            default: 10
        },
        native: Boolean,
        wrapStyle: {},
        wrapClass: {},
        viewClass: {},
        viewStyle: {},
        noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        tag: {
            type: String,
            default: 'div'
        }
    },

    data() {
        return {
            sizeWidth: '0',
            sizeHeight: '0',
            moveX: 0,
            moveY: 0
        };
    },

    computed: {
        wrap() {
            return this.$refs.wrap;
        }
    },

    render(h) {
        let gutter = scrollbarWidth();
        let style = this.wrapStyle;
        let prefixCls = 'scrollbar';
        if (gutter) {
            const gutterWith = `-${gutter}px`;
            const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

            if (Array.isArray(this.wrapStyle)) {
                style = toObject(this.wrapStyle);
                style.marginRight = style.marginBottom = gutterWith;
            } else if (typeof this.wrapStyle === 'string') {
                style += gutterStyle;
            } else {
                style = gutterStyle;
            }
        }
        const view = h(this.tag, {
            class: [`${prefixCls}__view`, this.viewClass],
            style: this.viewStyle,
            ref: 'resize'
        }, this.$slots.default);
        const wrap = (
            <div
                ref="wrap"
                style={style}
                onScroll={this.handleScroll}
                class={[this.wrapClass, `${prefixCls}__wrap`, gutter ? '' : `${prefixCls}__wrap--hidden-default`]}>
                {[view]}
            </div>
        );
        let nodes;

        if (!this.native) {
            nodes = ([
                wrap,
                <Bar
                    zIndex={this.zIndex}
                    move={this.moveX}
                    size={this.sizeWidth}></Bar>,
                <Bar
                    zIndex={this.zIndex}
                    vertical
                    move={this.moveY}
                    size={this.sizeHeight}></Bar>
            ]);
        } else {
            nodes = ([
                <div
                    ref="wrap"
                    class={[this.wrapClass, `${prefixCls}__wrap`]}
                    style={style}>
                    {[view]}
                </div>
            ]);
        }
        return h('div', { class: `${prefixCls}` }, nodes);
    },

    methods: {
        scrollTo({ x = 0, y = 0 }) {
            this.wrap.scrollTop = y;
            this.wrap.scrollLeft = x;
        },
        scrollBottom() {
            const childWrap = this.wrap.childNodes[0]
            this.wrap.scrollTop = childWrap.offsetHeight
        },

        scrollTop() {
            this.wrap.scrollTop = 0
        },

        scrollLeft() {
            this.wrap.scrollLeft = 0
        },

        scrollRight() {
            const childWrap = this.wrap.childNodes[0]
            this.wrap.scrollLeft = childWrap.offsetWidth
        },

        handleScroll() {
            const wrap = this.wrap;
            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
        },

        update() {
            let heightPercentage, widthPercentage;
            const wrap = this.wrap;
            if (!wrap) return;

            heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
            widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

            this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
            this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
        }
    },

    mounted() {
        if (this.native) return;
        this.$nextTick(this.update);
        !this.noresize && addResizeListener(this.$refs.resize, this.update);
    },

    beforeDestroy() {
        if (this.native) return;
        !this.noresize && removeResizeListener(this.$refs.resize, this.update);
    }
};