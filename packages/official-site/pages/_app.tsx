import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout, ILayoutProps } from "@/components/layout/index"

function MyApp(props: AppProps & ILayoutProps) {
  const { Component, pageProps, navbarData, footerData } = props

  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
