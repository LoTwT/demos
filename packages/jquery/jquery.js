const $ = (window.$ = function (selector) {
  return new Jquery(selector)
})

// 使用 xhr 请求 ( 简版 )
$.get = function (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", url)
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.response))
    }
  }
  xhr.send()
}

// 使用 fetch 请求 ( 简版 )
$.fetch = function (url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res))
}

// jsonp
$.jsonp = function (url, callback) {
  // window.fn = ...
  // <script src="url?callback=fn"></script>
  // 返回：fn{data}

  const callbackName = "JSONP_" + Math.random().toString().replace(".", "")
  window[callbackName] = function (data) {
    callback(data)
    delete window[callbackName]
  }

  const script = document.createElement("script")
  script.src = `${url}?callback=${callbackName}`
  document.body.appendChild(script)
}

class Jquery {
  constructor(selector) {
    this.selector = selector
    this.init(selector)
  }

  // 初始化
  init(selector) {
    if (typeof selector === "string") {
      // 取巧
      // querySelectorAll API
      // 类数组转数组
      this.elements = [...document.querySelectorAll(selector)]
    } else if (typeof selector === "function") {
      this.elements = []

      // 场景：在 head 标签里使用 $，但 jquery 还未加载完时
      // 将要执行的代码放入函数中
      // DOMContentLoaded 触发，再执行代码
      document.addEventListener("DOMContentLoaded", selector)
    } else if (selector instanceof HTMLElement) {
      this.elements = [selector]
    }
  }

  html(str) {
    if (str !== undefined) {
      // 修改
      this.elements.forEach((ele) => (ele.innerHTML = str))

      // 返回实例、链式调用
      return this
    } else {
      // 返回第一个节点的 html 内容
      return this.elements[0].innerHTML
    }
  }

  addClass(className) {
    this.elements.forEach((ele) => ele.classList.add(className))
    return this
  }

  on(event, callback, useCapture = false) {
    this.elements.forEach((ele) =>
      ele.addEventListener(event, callback, useCapture),
    )
    return this
  }

  val(str) {
    if (str !== undefined) {
      this.elements.forEach((ele) => (ele.value = str))
      return this
    } else {
      return this.elements[0].value
    }
  }

  append(child) {
    if (typeof child === "string") {
      this.elements.forEach((ele) => (ele.innerHTML += child))
    } else if (child instanceof Jquery) {
      // todo
    } else if (child instanceof HTMLElement) {
      // todo
    }
  }
}
