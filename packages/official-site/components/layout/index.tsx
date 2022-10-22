import { PropsWithChildren, FC } from "react"
import { IFooterProps, Footer } from "../footer/index"
import { INavBarProps, NavBar } from "../navbar/index"
import styles from "./styles.module.scss"

export interface ILayoutProps {
  navbarData: INavBarProps
  footerData: IFooterProps
}

export const Layout: FC<PropsWithChildren<ILayoutProps>> = (props) => {
  const { navbarData, footerData, children } = props

  return (
    <div className={styles.layout}>
      <NavBar {...navbarData} />
      <main className={styles.main}>{children}</main>
      <Footer {...footerData} />
    </div>
  )
}
