import type { NextPage } from "next"

interface IProps {
  articleId: number
}

const Article: NextPage<IProps> = (props) => {
  const { articleId } = props

  return (
    <div>
      <h1>文章 id : {articleId}</h1>
    </div>
  )
}

Article.getInitialProps = async (context) => {
  const { articleId } = context.query

  return {
    articleId: Number(articleId),
  }
}

export default Article
