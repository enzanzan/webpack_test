const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.config.base");
const merge = require("webpack-merge");
module.exports = merge(base, {
  module: {
    rules: [
      {
        test: /\.css$/, //监控css文件
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
        //use写成数组的形式写到一行上，先调右边的，再调左边的  右→左
        //   写成对象的形式，先调下边的，再调上边的  下→上
      },
      {
        test: /\.less$/, //监控less文件
        use: [
          {
            //写成对象的形式，先调下边的，再调上边的  下→上
            loader: MiniCssExtractPlugin.loader, //creates style nodes from JS strings
          },
          {
            loader: "css-loader", //translates CSS into CommonJS
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader", //compiles Less to CSS
          },
        ],
      },
      {
        test: /\.scss$/, //监控scss文件
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //creates style nodes from JS strings
          },
          {
            loader: "css-loader", //translates CSS into CommonJS
          },
          {
            loader: "sass-loader", //compiles sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      //Options similar to the same options in webpackOptions.output
      //both options are optional
      filename: "css/[name]_[hash].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    //webpack-dev-server配置项
    contentBase: path.join(__dirname, "dist"), //指定webpack-dev-server网站根目录
    compress: true, //是否进行压缩
    port: 9000, //指定端口
    proxy: {
      //代理
      "/data": {
        //接口文档上，真实接口地址
        target: "http://www.bjlink32.com/data.php", //开发测试服务器接口地址
        // source:false,  //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否开启跨域
        pathRewrite: { "^/data": "" }, //如果本身没有写/data需要通过pathRewrite来重写地址
      },
    },
  },
  optimization: {
    //webpack配置项
    minimize: true, //使用TerserPlugin压缩js，默认false
    minimizer: [
      //自定义TerserPlugin压缩
      new TerserPlugin({
        cache: true, //缓存 优化速度
        parallel: true, //多线程
      }),
      new OptimizeCSSAssetsPlugin({}), //css压缩
    ],
  },
  mode: "production",
});
