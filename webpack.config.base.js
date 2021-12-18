const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackBar = require("webpackbar");
module.exports = {
  entry: {
    index: "./src/index.js",
    one: "./src/one.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]_[hash].main.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/, //监控图片文件
        use: [
          {
            loader: "url-loader", //用url-loader来处理
            options: {
              //url-loader的选项
              limit: 8192, //指定多少字节B的图片，自动转码为base64，再插入到css中
              publicPath: "./../img", //指定最终引用的文件路径(打包生成的index.html文件里面引用资源的前缀)
              outputPath: "img/", //图片复制到的文件夹
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/, //监控字体文件
        loader: "file-loader", //用file-loader来处理
        options: {
          //选项
          name: "[name].[ext]", //保存的文件名--原来的名字
          publicPath: "./../fonts", //指定最终引用的文件路径(打包生成的index.html文件里面引用资源的前缀)
          outputPath: "fonts/", //字体复制到的文件夹
        },
      },
    ],
  },
  plugins: [
    //配置多个应用
    new HtmlWebpackPlugin({
      //假设是前台应用入口
      title: "首页",
      filename: "index.html",
      template: "./public/index.html",
      chunks: ["index"], //chunks指定需要引入的入口模块的键名index:"./src/index.js"
    }),
    new HtmlWebpackPlugin({
      //假设是后台应用入口one:"./src/one.js"
      title: "One",
      filename: "one.html",
      template: "./public/one.html",
      chunks: ["one"], //chunks指定需要引入的入口模块的键名 one:"./src/one.js"
    }),
    new CleanWebpackPlugin(),
    new webpackBar(),
  ],
  resolve: {
    //扩展名，可以省略的扩展名，按顺序搜索
    extensions: [".jsx", ".less", ".js", ".css"],
  },
};
