<template>
  <div class="tags-nav">
    <div class="close-con">
      <v-dropdown placement="bottomRight" style="margin-top:7px;">
        <v-button size="small" type="text">
          <v-icon :size="18" type="close-circle" />
        </v-button>
        <v-menu slot="overlay" @click="handleTagsOption">
          <v-menu-item key="all">关闭所有</v-menu-item>
          <v-menu-item key="others">关闭其他</v-menu-item>
        </v-menu>
      </v-dropdown>
    </div>
    <div class="btn-con left-btn">
      <v-button type="text" @click="handleScroll(240)">
        <v-icon :size="18" type="left" />
      </v-button>
    </div>
    <div class="btn-con right-btn">
      <v-button type="text" @click="handleScroll(-240)">
        <v-icon :size="18" type="right" />
      </v-button>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <template v-for="(item, index) in list">
          <v-tag ref="tagsPageOpened" :name="item.name" :closable="item.name==='home_index'?false:true" :color="isCurrentTag(item) ? 'rgb(45, 140, 240)' : ''" @click.native="handleClick(item)" @close="close(item,index)">{{itemTitle(item)}}</v-tag>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 10,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      menuList: {
        others: '关闭其他',
        all: '关闭所有'
      }
    }
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  methods: {
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption(type) {
      if (type.key == 'all') {
        // 关闭所有，除了home
        let res = this.list.filter(item => item.name === 'home_index')
        this.$store.commit("setTagNavList", res)
        this.$router.push({
          name: "home_index"
        });
      } else {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(item => util.routeEqual(this.currentRouteObj, item) || item.name === 'home_index')
        this.$store.commit("setTagNavList", res)
        setTimeout(() => {
          this.getTagElementByName(this.currentRouteObj.name)
        }, 100)
      }
    },
    close(route, index) {
      let res = this.list.filter(item => !util.routeEqual(route, item))
      this.$store.commit("setTagNavList", res);
      if (this.$route.name == this.currentRouteObj.name && this.$route.name != route.name) return
      let item = res.length == index ? res[index - 1] : res[index];
      this.$router.push(item);
    },
    handleClick(item) {
      this.$router.push(item);
    },
    isCurrentTag(item) {
      return util.routeEqual(this.value, item)
    },
    getTagElementByName(name) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (name === item.$attrs.name) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    itemTitle(item) {
      return util.showTitle(item, this)
    }
  },
  watch: {
    '$route'(to) {
      this.getTagElementByName(to.name)
    },
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByName(this.$route.name)
    }, 200)
  }
}
</script>

<style lang="less">
.tag-nav-wrapper {
  background: #f0f0f0;
  height: 40px;
  overflow: hidden;
  padding: 0;
}
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.size {
  width: 100%;
  height: 100%;
}
.tags-nav {
  position: relative;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  .no-select;
  .size;
  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
    button {
      color: #999;
      &:hover {
        color: #000;
      }
    }
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
      color: #999;
      &:hover {
        color: #000;
      }
    }
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #f0f0f0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 21px;
    right: 54px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
    .scroll-body {
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 3px 10px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .ivu-tag-dot-inner {
        transition: background 0.2s ease;
      }
      .vcu-tag {
        height: 32px;
        line-height: 30px;
        padding: 0 12px;
        margin-right: 3px;
        i.vcuicon {
          position: relative;
          left: 5px;
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 100;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>