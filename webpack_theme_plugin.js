const ThemeColorReplacer = require("webpack-theme-color-replacer");
const generate = require("@ant-design/colors/lib/generate").default;
const getAntdSerials = color => {
  // 淡化（即less的tint）
  const lightens = new Array(20).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10);
  });
  const colorPalettes = generate(color);
  const rgb = ThemeColorReplacer.varyColor
    .toNum3(color.replace("#", ""))
    .join(",");
  return lightens.concat(colorPalettes).concat(rgb);
};
const themePluginOption = {
  fileName: "css/theme-colors-[contenthash:8].css",
  matchColors: getAntdSerials("#1890ff"), // 主色系列
  // 改变样式选择器，解决样式覆盖问题
  changeSelector(selector) {
    switch (selector) {
      case '.vcu-calendar-today .vcu-calendar-date':
        return ':not(.vcu-calendar-selected-date):not(.vcu-calendar-selected-day)' + selector
      case '.vcu-btn:focus,.vcu-btn:hover':
        return '.vcu-btn:focus:not(.vcu-btn-primary):not(.vcu-btn-danger),.vcu-btn:hover:not(.vcu-btn-primary):not(.vcu-btn-danger)'
      case '.vcu-btn.active,.vcu-btn:active':
        return '.vcu-btn.active:not(.vcu-btn-primary):not(.vcu-btn-danger),.vcu-btn:active:not(.vcu-btn-primary):not(.vcu-btn-danger)'
      case '.vcu-steps-item-process .vcu-steps-item-icon > .vcu-steps-icon':
      case '.vcu-steps-item-process .vcu-steps-item-icon>.vcu-steps-icon':
        return ':not(.vcu-steps-item-process)' + selector
      case '.vcu-menu-horizontal>.vcu-menu-item-active,.vcu-menu-horizontal>.vcu-menu-item-open,.vcu-menu-horizontal>.vcu-menu-item-selected,.vcu-menu-horizontal>.vcu-menu-item:hover,.vcu-menu-horizontal>.vcu-menu-submenu-active,.vcu-menu-horizontal>.vcu-menu-submenu-open,.vcu-menu-horizontal>.vcu-menu-submenu-selected,.vcu-menu-horizontal>.vcu-menu-submenu:hover':
      case '.vcu-menu-horizontal > .vcu-menu-item-active,.vcu-menu-horizontal > .vcu-menu-item-open,.vcu-menu-horizontal > .vcu-menu-item-selected,.vcu-menu-horizontal > .vcu-menu-item:hover,.vcu-menu-horizontal > .vcu-menu-submenu-active,.vcu-menu-horizontal > .vcu-menu-submenu-open,.vcu-menu-horizontal > .vcu-menu-submenu-selected,.vcu-menu-horizontal > .vcu-menu-submenu:hover':
        return '.vcu-menu-horizontal > .vcu-menu-item-active,.vcu-menu-horizontal > .vcu-menu-item-open,.vcu-menu-horizontal > .vcu-menu-item-selected,.vcu-menu-horizontal:not(.vcu-menu-dark) > .vcu-menu-item:hover,.vcu-menu-horizontal > .vcu-menu-submenu-active,.vcu-menu-horizontal > .vcu-menu-submenu-open,.vcu-menu-horizontal:not(.vcu-menu-dark) > .vcu-menu-submenu-selected,.vcu-menu-horizontal:not(.vcu-menu-dark) > .vcu-menu-submenu:hover'
      case '.vcu-menu-horizontal > .vcu-menu-item-selected > a':
      case '.vcu-menu-horizontal>.vcu-menu-item-selected>a':
        return '.vcu-menu-horizontal:not(vcu-menu-light):not(.vcu-menu-dark) > .vcu-menu-item-selected > a'
      case '.vcu-menu-horizontal > .vcu-menu-item > a:hover':
      case '.vcu-menu-horizontal>.vcu-menu-item>a:hover':
        return '.vcu-menu-horizontal:not(vcu-menu-light):not(.vcu-menu-dark) > .vcu-menu-item > a:hover'
      case '.vcu-checkbox-checked .vcu-checkbox-inner':
        return '.vcu-checkbox-checked:not(.vcu-checkbox-disabled) .vcu-checkbox-inner'
      default:
        return selector
    }
  }
};

const createThemeColorReplacerPlugin = () =>
  new ThemeColorReplacer(themePluginOption);

module.exports = createThemeColorReplacerPlugin;