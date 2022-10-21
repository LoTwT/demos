const path = require("node:path")
const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base")

module.exports = merge(baseConfig, {
  mode: "development",
  entry: "./src/server/index.tsx",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "server_build"),
  },
})
