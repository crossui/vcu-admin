<template>
  <div class="tags-nav">
    <div class="close-con">
      <v-dropdown placement="bottomRight">
        <v-button type="text">
          <v-icon type="down" />
        </v-button>
        <v-menu slot="overlay" @click="handleTagsOption">
          <v-menu-item key="all">关闭所有</v-menu-item>
          <v-menu-item key="others">关闭其他</v-menu-item>
        </v-menu>
      </v-dropdown>
    </div>
    <div class="btn-con left-btn">
      <v-button type="text" @click="handleScroll(240)">
        <v-icon type="left" />
      </v-button>
    </div>
    <div class="btn-con right-btn">
      <v-button type="text" @click="handleScroll(-240)">
        <v-icon type="right" />
      </v-button>
    </div>
    <div
      class="scroll-outer"
      ref="scrollOuter"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div
        ref="scrollBody"
        class="scroll-body"
        :style="{ left: tagBodyLeft + 'px' }"
      >
        <template v-for="(item, index) in list">
          <span
            ref="tagsPageOpened"
            :key="item.name"
            :name="item.name"
            class="page-tags"
            @dblclick="handleDBClick(item, index)"
            @click="handleClick(item)"
            :class="isCurrentTag(item) ? 'closable' : ''"
          >
            {{ itemTitle(item) }}
            <v-icon
              type="close"
              v-if="item.name === appConfig.homepage.name ? false : true"
              @click.stop="handleClose(item, index)"
            />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
let timer = null;
export default {
  props: {
    value: Object,
    list: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 10,
      menuList: {
        others: "关闭其他",
        all: "关闭所有",
      },
    };
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    },
  },
  watch: {
    $route(to) {
      this.getTagElementByName(to.name);
    },
  },
  methods: {
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    handleTagsOption(type) {
      if (type.key == "all") {
        // 关闭所有，除了home
        let res = this.list.filter(
          (item) => item.name === this.appConfig.homepage.name
        );
        this.$store.commit("setTagNavList", res);
        this.$router.push({
          name: this.appConfig.homepage.name,
        });
      } else {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(
          (item) =>
            this.util.routeEqual(this.currentRouteObj, item) ||
            item.name === this.appConfig.homepage.name
        );
        this.$store.commit("setTagNavList", res);
        setTimeout(() => {
          this.getTagElementByName(this.currentRouteObj.name);
        }, 100);
      }
    },
    async handleClose(route, index) {
      let isExist = _.filter(
        this.$store.state.app.watchClosed,
        (item) => item.name === route.name
      );
      let closed = true;
      if (isExist && isExist.length) {
        let _modal = isExist[0];
        if (_modal.modalType === "1") {
          closed = await this.util.showConfirmModal({
            content: _modal.tips,
          });
        } else {
          closed = await this.util.showTipsModal({
            content: _modal.tips,
          });
          closed = closed && _modal.closePage;
        }
        if (!closed) {
          return;
        } else {
          this.$store.commit("updateWatchClosed", route.name);
        }
      }

      let res = this.list.filter((item) => !this.util.routeEqual(route, item));
      this.$store.commit("setTagNavList", res);
      if (this.$route.name === route.name) {
        let item = res.length == index ? res[index - 1] : res[index];
        this.$router.push(item);
      }
    },
    handleDBClick(item, index) {
      clearTimeout(timer);
      this.handleClose(item, index);
    },
    handleClick(item) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.$router.push(item);
      }, 200);
    },
    isCurrentTag(item) {
      return this.util.routeEqual(this.value, item);
    },
    getTagElementByName(name) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;
        this.refsTag.forEach((item, index) => {
          if (name === item.getAttribute("name")) {
            this.moveToView(item);
          }
        });
      });
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        );
      }
    },
    itemTitle(item) {
      return this.util.showTitle(item, this);
    },
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByName(this.$route.name);
    }, 200);
  },
};
</script>
<style lang="less">
.tag-nav-wrapper {
  background: #fff;
  height: 36px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
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
  .no-select;
  .size;
  .close-con {
    position: absolute;
    right: 0px;
    top: 0;
    height: 100%;
    width: 32px;
    text-align: center;
    z-index: 10;
    background-color: #fff;
    button {
      border-radius: 0;
      box-shadow: none;
      position: relative;
      border: 0;
      background: #fff;
      padding: 0;
      /deep/ .vcuicon {
        font-size: 24px;
      }
      &:hover {
        color: #000;
      }
    }
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #f0f0f0;
    z-index: 10;
    button {
      position: relative;
      top: -1px;
      padding: 12px 4px;
      line-height: 1;
      text-align: center;
      color: #999;
      border: 0;
      background-color: #f0f0f0;
      box-shadow: none;
      &:hover {
        color: #000;
      }
    }
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 32px;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 21px;
    right: 54px;
    top: 0;
    bottom: 0;
    .scroll-body {
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 3px 10px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .page-tags {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 13px;
        font-variant: tabular-nums;
        line-height: 2;
        list-style: none;
        font-feature-settings: "tnum";
        display: inline-block;
        height: 26px;
        margin-right: 5px;
        padding: 3px 7px;
        line-height: 20px;
        white-space: nowrap;
        /* background: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 5px #999; */
        cursor: pointer;
        opacity: 1;
        transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        .vcuicon {
          font-size: 12px;
          position: relative;
          top: -1px;
        }
        &.closable {
          color: #fff;
        }
      }
    }
  }
}
</style>