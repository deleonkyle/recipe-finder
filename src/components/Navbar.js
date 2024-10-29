import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { House, Search, Heart } from 'react-bootstrap-icons';
import { Menu } from 'lucide-react';
const NavigationBar = ({ showSidebar, setShowSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar expand="md" className="py-3" style={{ backgroundColor: '#fdf2f3' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="Recipe Finder Logo"
            />
            <span style={{ color: '#8b0000', fontWeight: 'bold' }}>Recipe Finder</span>
          </Navbar.Brand>
          <Navbar.Toggle 
            as={Button}
            variant="outline-danger"
            className="border-0"
            onClick={() => setShowSidebar(true)}
          >
            <Menu />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link 
                as={Link} 
                to="/" 
                className={`mx-2 ${isActive('/') ? 'fw-bold' : ''}`}
                style={{ color: isActive('/') ? '#8b0000' : '#2b0808' }}
              >
                <House className="me-1" /> Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/search" 
                className={`mx-2 ${isActive('/search') ? 'fw-bold' : ''}`}
                style={{ color: isActive('/search') ? '#8b0000' : '#2b0808' }}
              >
                <Search className="me-1" /> Search
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/favorites" 
                className={`mx-2 ${isActive('/favorites') ? 'fw-bold' : ''}`}
                style={{ color: isActive('/favorites') ? '#8b0000' : '#2b0808' }}
              >
                <Heart className="me-1" /> Favorites
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;