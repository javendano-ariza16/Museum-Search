import {Container, Form, Nav, NavDropdown, Navbar, Button} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/Authenticate';

export default function MainNav() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const { register, handleSubmit } = useForm();

    const router = useRouter();

    const [isExpanded, setIsExpanded] = useState(false);

    let token = readToken();

    let handleToggleClick = () =>{
      setIsExpanded((prevState) => !prevState);
    }

    const handleNavClick = () =>{
      setIsExpanded(false)
    }

    async function submitForm(data) {
        setIsExpanded(false)
        console.log(`form submitted - searchField : ${data.searchField}`);
        const searchField = data.searchField;
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    }

    function logout() {
      setIsExpanded(false)
      removeToken();
      router.push('/login');
    }
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" expanded={isExpanded}>
      <Container >
        <Navbar.Brand >Juan David Avendano</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggleClick}/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Link href="/"  passHref legacyBehavior onClick={handleNavClick}><Nav.Link active={router.pathname === "/"}>Home</Nav.Link></Link>
      
          {token &&
          <Link href="/search"  passHref legacyBehavior><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
          }
          </Nav>
          &nbsp;
          {token &&
          <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              {...register('searchField')}
            />
            <Button variant="outline-success" type="submit" >Search</Button>
          </Form>}
          &nbsp;
          {token&&
          <Nav>
          <NavDropdown title={token.userName}  id="basic-nav-dropdown">        
            <Link href="/favourites" passHref legacyBehavior onClick={handleNavClick}><NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
            <Link href="/history" passHref legacyBehavior onClick={handleNavClick}><NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
          </Nav>}

          {!token &&
          <Nav>
            <Link href="/register"  passHref legacyBehavior onClick={handleNavClick}><Nav.Link active={router.pathname === "/register"}>register</Nav.Link></Link>
            <Link href="/login"  passHref legacyBehavior onClick={handleNavClick}><Nav.Link active={router.pathname === "/login"}>Login</Nav.Link></Link>
          </Nav> 
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/>
    <br/>
    </>
  );
}
