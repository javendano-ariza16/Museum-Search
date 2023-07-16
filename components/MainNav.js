import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';


export default function MainNav() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    function submitForm(data) {
        console.log(`form submitted - searchField : ${data.searchField}`);
        const searchField = data.searchField;
        router.push(`/artwork?title=true&q=${searchField}`);
    }
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid >
        <Navbar.Brand >Juan David Avendano</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/"  passHref legacyBehavior>Home</Nav.Link>
            <Nav.Link href="/search"  passHref legacyBehavior>Advanced Search</Nav.Link>

          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              {...register('searchField')}
            />
            <Button variant="outline-success" type="submit" >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/>
    <br/>
    </>
  );
}
