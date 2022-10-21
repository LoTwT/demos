import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>hello-ssr</h1>
      <button
        onClick={(): void => {
          alert("hello-ssr")
        }}
      >
        alert
      </button>

      <a href="http://127.0.0.1:3000/demo">链接跳转</a>

      <span
        onClick={(): void => {
          navigate("/demo")
        }}
      >
        路由跳转
      </span>
    </div>
  )
}

export default Home
