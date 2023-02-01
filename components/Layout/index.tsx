import AppNavbar from '@components/AppNavbar'
import AppFooter from '@components/AppFooter'
import { ReactNode } from 'react'
import styles from './Layout.module.scss'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <AppNavbar />
      <div className={styles.content}>{children}</div>
      <AppFooter />
    </div>
  )
}
