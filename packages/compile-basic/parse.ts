import { tokenize } from "./tokenize"

// parse 函数接收模板作为参数
export function parse(str: string) {
  // 首先对模板进行标记化，得到 tokens
  const tokens = tokenize(str)
  // 创建 Root 根节点
  const root = {
    type: "Root",
    children: [],
  }
  // 创建 elementStack 栈，起初只有 Root 根节点
  const elementStack = [root]

  // 开启一个 while 循环扫描 tokens，知道所有 Tokens 都被扫描完毕为止
  while (tokens.length) {
    // 获取当前栈顶节点作为父节点 parent
    const parent = elementStack[elementStack.length - 1]
    // 当前扫描的 Token
    const t = tokens[0]

    switch (t.type) {
      case "tag":
        // 如果当前 Token 是开始标签，则创建 Element 类型的 AST 节点
        const elementNode = {
          type: "Element",
          tag: t.name,
          children: [],
        }
        // 将其添加到父节点的 children 中
        parent.children.push(elementNode)
        // 将当前节点压入栈
        elementStack.push(elementNode)
        break
      case "text":
        // 如果当前 Token 是文本，则创建 Text 类型的 AST 节点
        const textNode = {
          type: "Text",
          content: t.content,
        }
        // 将其添加到父节点的 children 中
        parent.children.push(textNode)
        break
      case "tagEnd":
        // 遇到结束标签，将栈顶节点弹出
        elementStack.pop()
        break
    }

    // 消费已经扫描过的 token
    tokens.shift()
  }

  // 最后返回 AST
  return root
}

const ast = parse("<div><p>Vue</p><p>Template</p></div>")

console.log(JSON.stringify(ast, null, 2))
