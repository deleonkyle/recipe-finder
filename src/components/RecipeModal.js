// src/components/RecipeModal.js
import React from 'react';
import { Modal, Button, Row, Col, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import { Clock, Users, ExternalLink } from 'lucide-react';

const RecipeModal = ({ recipe, show, handleClose, onSave, onRemove, isSaved }) => {
  const nutritionItems = [
    { label: 'Calories', value: Math.round(recipe.calories), unit: 'kcal' },
    { label: 'Protein', value: Math.round(recipe.totalNutrients.PROCNT?.quantity || 0), unit: 'g' },
    { label: 'Carbs', value: Math.round(recipe.totalNutrients.CHOCDF?.quantity || 0), unit: 'g' },
    { label: 'Fat', value: Math.round(recipe.totalNutrients.FAT?.quantity || 0), unit: 'g' },
  ];

  return (
    <Modal show={show} onHide={handleClose} size="lg" className="recipe-modal">
      <Modal.Header closeButton style={{ backgroundColor: '#f3bebf', color: '#2b0808' }}>
        <Modal.Title>{recipe.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Row>
          <Col md={6}>
            <img src={recipe.image} alt={recipe.label} className="img-fluid rounded mb-3 shadow" />
          </Col>
          <Col md={6}>
            <h5 style={{color: '#2b0808' }}>Quick Info</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent">
                <Clock size={18} className="me-2" />
                {recipe.totalTime > 0 ? `${recipe.totalTime} minutes` : 'Time not specified'}
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent">
                <Users size={18} className="me-2" />
                {recipe.yield} servings
              </ListGroup.Item>
            </ListGroup>
            <h5 className="mt-3" style={{color: '#2b0808' }}>Diet Labels</h5>
            <div>
              {recipe.dietLabels.map((label, index) => (
                <Badge bg="info" className="me-2 mb-2" key={index}>{label}</Badge>
              ))}
            </div>
            <h5 className="mt-3" style={{color: '#2b0808' }}>Health Labels</h5>
            <div>
              {recipe.healthLabels.slice(0, 5).map((label, index) => (
                <Badge bg="success" className="me-2 mb-2" key={index}>{label}</Badge>
              ))}
              {recipe.healthLabels.length > 5 && (
                <Badge bg="secondary">+{recipe.healthLabels.length - 5} more</Badge>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
            <h5 style={{color: '#2b0808' }}>Ingredients</h5>
            <ListGroup variant="flush">
              {recipe.ingredientLines.map((ingredient, index) => (
                <ListGroup.Item className="bg-transparent" key={index}>{ingredient}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={6}>
            <h5 style={{color: '#2b0808' }}>Nutrition (per serving)</h5>
            {nutritionItems.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="d-flex justify-content-between">
                  <span>{item.label}</span>
                  <span>{item.value} {item.unit}</span>
                </div>
                <ProgressBar 
                  now={item.value} 
                  max={item.label === 'Calories' ? 2000 : 100}
                  variant={index % 4 === 0 ? 'info' : index % 4 === 1 ? 'success' : index % 4 === 2 ? 'warning' : 'danger'}
                />
              </div>
            ))}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#f3bebf', color: '#2b0808' }}>
        <Button variant="light" href={recipe.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={18} className="me-2" />
          View Full Recipe
        </Button>
        <Button variant="outline-light" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;
