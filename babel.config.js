const plugins = [];
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  plugins.push("transform-remove-console")
}
module.exports = {
  //entry: ["@babel/polyfills", "./src/main.js"],
  presets: [
    [
      "@vue/app",
      {
        "useBuiltIns": "entry",
        polyfills: [
          'es6.promise',
          'es6.symbol'
        ]
      }
    ]
    //'@vue/cli-plugin-babel/preset'
  ],
  //plugins: plugins
}
