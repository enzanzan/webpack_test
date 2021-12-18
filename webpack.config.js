const dev = require("./webpack.config.dev");
const prod = require("./webpack.config.prod");
const Target = process.env.NODE_ENV;
console.log(Target);
if (Target === "development") {
  //导出dev配置
  module.exports = dev;
}
if (Target === "production") {
  //导出prod
  module.exports = prod;
}
