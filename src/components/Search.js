import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert, Spinner, Row, Col, Card, Container, Badge } from 'react-bootstrap';
import { Search as SearchIcon, Filter } from 'lucide-react';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import axios from 'axios';

const Search = ({ favorites, onSaveRecipe, onRemoveRecipe }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cuisineType, setCuisineType] = useState('all');
  const [mealType, setMealType] = useState('all');
  const [dietType, setDietType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setLoading(true);
      setError('');

      const appId = '76cf32ed';
      const appKey = 'abd93b97898ba09116189a33ad68f750';

      try {
        const response = await axios.get(`https://api.edamam.com/search`, {
          params: {
            q: trimmedQuery,
            app_id: appId,
            app_key: appKey,
            cuisineType: cuisineType !== 'all' ? cuisineType : undefined,
            mealType: mealType !== 'all' ? mealType : undefined,
            diet: dietType !== 'all' ? dietType : undefined,
          }
        });
        setRecipes(response.data.hits.map(hit => hit.recipe));
      } catch (error) {
        setError("Error fetching the recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a search term.');
    }
  };

  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'american', label: 'American' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'thai', label: 'Thai' },
  ];

  const mealOptions = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'teatime', label: 'Teatime' },
  ];

  const dietOptions = [
    { value: 'all', label: 'All Diets' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'high-protein', label: 'High-Protein' },
    { value: 'low-fat', label: 'Low-Fat' },
    { value: 'low-carb', label: 'Low-Carb' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
  ];

  return (
    <Container>
      <Card className="my-4 shadow" style={{ backgroundColor: '#fffff', color: '#2b0808' }}>
        <Card.Body>
          <Card.Title className="mb-4">Find Your Perfect Recipe</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={12}>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#2b0808', color: '#f3bebf' }}>
                    <SearchIcon size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter ingredients or recipe name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search recipes"
                    style={{ borderColor: '#2b0808' }}
                  />
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowFilters(!showFilters)}
                    aria-expanded={showFilters}
                    aria-controls="filter-collapse"
                    style={{ color: '#f3bebf', backgroundColor: '#2b0808', borderColor: '#2b0808' }}
                  >
                    <Filter size={18} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </InputGroup>
              </Col>
              {showFilters && (
                <>
                  <Col md={4}>
                    <Form.Select
                      value={cuisineType}
                      onChange={(e) => setCuisineType(e.target.value)}
                      aria-label="Select cuisine type"
                      style={{ borderColor: '#2b0808' }}
                    >
                      {cuisineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      aria-label="Select meal type"
                      style={{ borderColor: '#2b0808' }}
                    >
                      {mealOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={dietType}
                      onChange={(e) => setDietType(e.target.value)}
                      aria-label="Select diet type"
                      style={{ borderColor: '#2b0808' }}
                    >
                      {dietOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </>
              )}
              <Col md={12} className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="btn-lg"
                  style={{ backgroundColor: '#fbe9ea', borderColor: '#2b0808', color: '#2b0808' }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Searching...
                    </>
                  ) : (
                    'Search Recipes'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Card.Body>
      </Card>

      {recipes.length > 0 && (
        <div className="mb-4">
          <h2 style={{ color: '#2b0808' }}>Search Results</h2>
          <p>
            Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
            {cuisineType !== 'all' && <Badge bg="info" className="ms-2" style={{ backgroundColor: '#f3bebf', color: '#2b0808' }}>{cuisineType}</Badge>}
            {mealType !== 'all' && <Badge bg="info" className="ms-2" style={{ backgroundColor: '#f3bebf', color: '#2b0808' }}>{mealType}</Badge>}
            {dietType !== 'all' && <Badge bg="info" className="ms-2" style={{ backgroundColor: '#f3bebf', color: '#2b0808' }}>{dietType}</Badge>}
          </p>
        </div>
      )}

      <Row xs={1} md={2} lg={3} className="g-4 mb-4">
        {recipes.map((recipe) => (
          <Col key={recipe.uri}>
            <RecipeCard
              recipe={recipe}
              onSave={onSaveRecipe}
              onRemove={onRemoveRecipe}
              onShow={() => handleShow(recipe)}
              isFavorite={favorites.some((fav) => fav.uri === recipe.uri)}
            />
          </Col>
        ))}
      </Row>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          show={showModal}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default Search;
