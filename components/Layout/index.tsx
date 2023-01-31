import AppNavbar from '@components/AppNavbar'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode

}

export default function Layout({ children }: Props) {
  return (
      <>
        <AppNavbar />
        {children}
      </>
  )
}
