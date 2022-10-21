import { FC, useState, useEffect } from "react"
import axios from "axios"

const Demo: FC = (data) => {
  const [content, setContent] = useState("")

  useEffect(() => {
    axios
      .post("/api/getDemoData", { content: "这是一个 demo 页面" })
      .then((res) => {
        setContent(res.data?.data?.content)
      })
  }, [])

  return <div>{content}</div>
}

export default Demo
