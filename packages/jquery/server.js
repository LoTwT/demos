const http = require("http")

http
  .createServer((req, res) => {
    // 跨域设置
    res.setHeader("Access-Control-Allow-Origin", "*")

    const result = {
      title: "今天天气真不错",
      code: 200,
    }

    const response = JSON.stringify(result)

    res.setHeader("Content-Type", "application/json")
    if (req.url === "/info") {
      // xhr & fetch

      res.end(response)
    } else if (req.url.includes("JSONP")) {
      // jsonp
      const query = {}
      const [url, searchParams] = req.url.split("?")

      if (searchParams) {
        searchParams.split("&").forEach((item) => {
          const [key, val] = item.split("=")
          query[key] = val
        })
      }

      if (query.callback) {
        res.end(`${query.callback}(${response})`)
      }
    } else {
      res.end(
        JSON.stringify({
          error: "Not Found",
          code: 404,
        }),
      )
    }
  })
  .listen(24678, () =>
    console.log("server is running at http://localhost:24678"),
  )
