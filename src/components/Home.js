import React from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Utensils, BookOpen, Heart, Clock } from 'lucide-react';


const Home = () => {
  const benefits = [
    { icon: <Utensils size={32} />, title: 'Diverse Cuisine', description: 'Explore dishes from around the world' },
    { icon: <BookOpen size={32} />, title: 'Easy Instructions', description: 'Follow step-by-step cooking guides' },
    { icon: <Heart size={32} />, title: 'Healthy Options', description: 'Find nutritious and delicious meals' },
    { icon: <Clock size={32} />, title: 'Quick Meals', description: 'Discover recipes for busy schedules' },
  ];

  const featuredRecipes = [
    { id: 1, name: 'Quinoa Buddha Bowl', image: 'https://healthecooks.com/mediaRouter/v3/image/9743/accessKey/762/W1UiPXyRAyON6Icc/QY0pEXn7391l7YjT/format/webp/cropType/3/width/1200?height=400&width=800', category: 'Vegetarian' },
    { id: 2, name: 'Lemon Herb Grilled Salmon', image: 'https://prescotthealthyliving.com/wp-content/uploads/2024/06/iStock-2078289951.jpg?height=400&width=800', category: 'Seafood' },
    { id: 3, name: 'Spicy Thai Basil Chicken', image: 'https://www.healthychefoil.com/uploaded/recipe/thumb/200803-150215-q.jpg?height=400&width=800', category: 'Poultry' },
  ];

  return (
    <Container fluid className="p-0">
      <div className="py-5" style={{ backgroundColor: '#2b0808', color: '#f3bebf' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Culinary Adventures Await</h1>
              <p className="lead mb-4">
                Embark on a gastronomic journey with our curated collection of mouthwatering recipes.
              </p>
              <Link to="/search">
                <Button variant="light" size="lg" className="text-dark">
                  Start Your Culinary Journey
                </Button>
              </Link>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <img
                src="https://t4.ftcdn.net/jpg/08/97/49/15/360_F_897491574_Q4I9WCNQIw7nSFo4O2ljj92ClX1FlkYQ.jpg"
                alt="Culinary Collage"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5" style={{ color: '#2b0808' }}>Why Choose Our Recipe Platform?</h2>
        <Row>
          {benefits.map((benefit, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: '#fbe9ea', color: '#2b0808' }}>
                <Card.Body className="text-center">
                  <div className="mb-3">
                    {benefit.icon}
                  </div>
                  <Card.Title>{benefit.title}</Card.Title>
                  <Card.Text>{benefit.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="py-5" style={{ backgroundColor: '#fbe9ea', color: '#2b0808' }}>
        <Container>
          <h2 className="text-center mb-5">Featured Culinary Creations</h2>
          <Carousel>
            {featuredRecipes.map((recipe) => (
              <Carousel.Item key={recipe.id}>
                <img
                  className="d-block w-100"
                  src={recipe.image}
                  alt={recipe.name}
                  style={{ objectFit: 'cover', height: '400px' }}
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.category}</p>
                  <Link to={`/recipe/${recipe.id}`}>
                    <Button variant="outline-light">View Recipe</Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>

      <Container className="my-5 text-center">
        <h2 className="mb-4" style={{ color: '#2b0808' }}>Ready to Elevate Your Cooking Game?</h2>
        <p className="lead mb-4" style={{ color: '#2b0808' }}>
          Join our community of food enthusiasts and discover a world of flavors at your fingertips.
        </p>
        <Link to="/search">
          <Button variant="dark" size="lg" style={{ backgroundColor: '#2b0808', color: '#f3bebf' }}>
            Explore Our Recipe Collection
          </Button>
        </Link>
      </Container>

      <div className="py-4" style={{ backgroundColor: '#2b0808', color: '#f3bebf' }}>
        <Container className="text-center">
          <h3 className="mb-3">Stay Connected for Culinary Inspiration</h3>
          <p>
            Follow us on social media for daily recipe ideas, cooking tips, and foodie discussions.
          </p>
          <div>
            <Button variant="outline-light" className="me-2 mb-2">Facebook</Button>
            <Button variant="outline-light" className="me-2 mb-2">Instagram</Button>
            <Button variant="outline-light" className="me-2 mb-2">Pinterest</Button>
            <Button variant="outline-light" className="mb-2">YouTube</Button>
          </div>
        </Container>
      </div>

      {/* Footer with attributions */}
      <footer className="py-4" style={{ backgroundColor: '#2b0808', color: '#f3bebf' }}>
        <Container className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Recipe Finder | Powered by 
            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="text-light mx-1">React</a>, 
            <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer" className="text-light mx-1">Bootstrap</a>, 
            and <a href="https://developer.edamam.com/" target="_blank" rel="noopener noreferrer" className="text-light mx-1">Edamam</a>.
          </p>
        </Container>
      </footer>
    </Container>
  );
};

export default Home;
