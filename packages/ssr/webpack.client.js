const path = require("node:path")
const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base")

module.exports = merge(baseConfig, {
  mode: "development",
  entry: "./src/client/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "client_build"),
  },
})
