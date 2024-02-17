import { parse } from "./parse"

export function dump(node, indent = 0) {
  // 节点的类型
  const type = node.type
  // 节点的描述，如果是根节点，则没有描述
  // 如果是 Element 类型的节点，则使用 node.tag 作为节点的描述
  // 如果是 Text 类型的节点，则使用 node.content 作为节点的描述
  const desc =
    node.type === "Root"
      ? ""
      : node.type === "Element"
      ? node.tag
      : node.content

  // 打印节点的类型和描述信息
  console.log(`${"-".repeat(indent)}${type}: ${desc}`)

  // 递归打印子节点
  if (node.children) {
    node.children.forEach((n) => dump(n, indent + 2))
  }
}

// dump(parse("<div><p>Vue</p><p>Template</p></div>"))

export function traverseNode(ast) {
  // 当前节点，ast 本身就是 Root 节点
  const currentNode = ast
  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = currentNode.children

  if (children) {
    for (let i = 0; i < children.length; i++) {
      traverseNode(children[i])
    }
  }
}

// 将 AST 中所有 p 标签转换为 h1 标签
export function tagPToH1(ast) {
  const currentNode = ast

  // 对当前节点进行操作
  if (currentNode.type === "Element" && currentNode.tag === "p") {
    // 将所有 p 标签转换为 h1 标签
    currentNode.tag = "h1"
  }

  // 如果有子节点，则递归地调用 TagPToH1 进行遍历
  const children = currentNode.children

  if (children) {
    for (let i = 0; i < children.length; i++) {
      tagPToH1(children[i])
    }
  }
}

function dumplicateTextNode(ast) {
  const currentNode = ast

  if (currentNode.type === "Element" && currentNode.tag === "p") {
    currentNode.tag = "h1"
  }

  if (currentNode.type === "Text") {
    currentNode.content = currentNode.content.repeat(2)
  }

  const children = currentNode.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      dumplicateTextNode(children[i])
    }
  }
}

function transform(ast) {
  dumplicateTextNode(ast)
  console.log(dump(ast))
}

const ast = parse("<div><p>Vue</p><p>Template</p></div>")
transform(ast)
