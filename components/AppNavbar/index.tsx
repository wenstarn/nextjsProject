import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'
import { useSearchContext } from '@contexts/searchContext'
import styles from './AppNavbar.module.scss'

function AppNavbar() {
  const [currentSearch, setCurrentSearch] = useState('')
  const router = useRouter()
  const { setSearch } = useSearchContext()
  const handleSearchChange = (event: ChangeEvent<any>) => {
    setCurrentSearch(event.target.value)
  }
  const handleSearchButton = () => {
    if (router.pathname !== '/') {
      router.push('/')
    }
    setSearch(currentSearch)
  }
  return (
    <Navbar className={styles.container} bg='dark' expand='lg' variant='dark'>
      <Container fluid>
        <Navbar.Brand href='#'>AnimeApp</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
            <li className='nav-item'>
              <Link className='nav-link' prefetch={false} href={'/'}>
                Каталог
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' prefetch={false} href={'/calendar'}>
                Календарь
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' prefetch={false} href={'/collection'}>
                Коллекция
              </Link>
            </li>
          </Nav>
          <Form className='d-flex'>
            <Form.Control onChange={handleSearchChange} value={currentSearch} type='search' placeholder='Поиск' className='me-2' aria-label='Search' />
            <Button onClick={handleSearchButton} variant='outline-light'>Поиск</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
