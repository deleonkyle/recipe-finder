import React, { useState } from 'react';
import { Row, Col, Button, Alert, Container, Card, Modal } from 'react-bootstrap';
import { Trash2, Heart, Grid, List } from 'lucide-react';
import RecipeCard from './RecipeCard';

const Favorites = ({ favorites, onRemoveRecipe, onShowRecipe, onRemoveAllRecipes }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRemoveAll = () => {
    setShowConfirmModal(true);
  };

  const confirmRemoveAll = () => {
    onRemoveAllRecipes();
    setShowConfirmModal(false);
  };

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Card className="shadow-sm border-0">
        <Card.Header className="d-flex flex-column flex-sm-row justify-content-between align-items-center" style={{ backgroundColor: '#f3bebf', color: '#2b0808' }}>
  <h2 className="mb-2 mb-sm-0">
    <Heart className="me-2" /> Favorite Recipes
  </h2>
  <div>
    <Button
      variant="outline-light"
      className="me-2"
      onClick={() => setViewMode('grid')}
      active={viewMode === 'grid'}
    >
      <Grid size={18} />
    </Button>
    <Button
      variant="outline-light"
      onClick={() => setViewMode('list')}
      active={viewMode === 'list'}
    >
      <List size={18} />
    </Button>
  </div>
</Card.Header>
          <Card.Body>
            {favorites.length > 0 ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="text-muted">
                    {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
                  </span>
                  <Button 
                    variant="outline-danger" 
                    onClick={handleRemoveAll}
                    className="d-flex align-items-center"
                  >
                    <Trash2 size={18} className="me-2" />
                    Remove All Favorites
                  </Button>
                </div>
                {viewMode === 'grid' ? (
                  <Row className="g-4">
                    {favorites.map((recipe, index) => (
                      <Col key={index} xs={12} sm={6} md={4} lg={3}>
                        <RecipeCard
                          recipe={recipe}
                          onSave={() => {}}
                          onRemove={onRemoveRecipe}
                          onShow={() => onShowRecipe(recipe)}
                          isFavorite={true}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="list-group">
                    {favorites.map((recipe, index) => (
                      <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img 
                            src={recipe.image} 
                            alt={recipe.label} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                            className="me-3 rounded" 
                          />
                          <div>
                            <h6 className="mb-0">{recipe.label}</h6>
                            <small className="text-muted">{recipe.cuisineType.join(', ')}</small>
                          </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row">
                          <Button variant="outline-primary" size="sm" className="me-2 mb-2 mb-sm-0" onClick={() => onShowRecipe(recipe)}>View</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => onRemoveRecipe(recipe)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Alert variant="info" className="text-center">
                You have no favorite recipes saved. Start exploring and save some delicious recipes!
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove all favorite recipes? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemoveAll}>
            Remove All
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Favorites;
