import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'

function AppNavbar() {
  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
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
            <Form.Control type='search' placeholder='Search' className='me-2' aria-label='Search' />
            <Button variant='outline-light'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
