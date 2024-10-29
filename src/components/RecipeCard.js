import React, { useState } from 'react';
import { Card, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Bookmark, BookmarkFill, Eye, Clock, PeopleFill, Star, StarFill } from 'react-bootstrap-icons';

const RecipeCard = ({ recipe, onSave, onRemove, onShow, isFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Card 
      className="h-100 shadow-sm transition-all duration-300 ease-in-out"
      style={{ 
        transform: isHovered ? 'translateY(-5px)' : 'none',
        transition: 'transform 0.3s ease-in-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={recipe.label}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <Button 
            variant="light" 
            size="sm" 
            className="align-self-end"
            onClick={onShow}
          >
            <Eye className="me-2" /> View Recipe
          </Button>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{truncateText(recipe.label, 20)}</Card.Title>
          <Button 
            variant="link" 
            className="p-0" 
            onClick={() => isFavorite ? onRemove(recipe) : onSave(recipe)}
          >
            {isFavorite ? <BookmarkFill color="var(--bs-danger)" /> : <Bookmark />}
          </Button>
        </div>
        <Card.Text className="text-muted small mb-2">
          {truncateText(recipe.cuisineType.join(', '), 30)}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{Math.round(recipe.calories)} calories</Tooltip>}
          >
            <Badge bg="info" className="me-2">
              {Math.round(recipe.calories)} cal
            </Badge>
          </OverlayTrigger>
          <div className="d-flex align-items-center">
            <Clock className="me-1" />
            <small>{recipe.totalTime} min</small>
          </div>
          <div className="d-flex align-items-center">
            <PeopleFill className="me-1" />
            <small>{recipe.yield} servings</small>
          </div>
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="link"
                  className="p-0 me-1"
                  onClick={() => handleRating(star)}
                >
                  {star <= rating ? <StarFill color="gold" /> : <Star />}
                </Button>
              ))}
            </div>
            <small className="text-muted">{rating > 0 ? `${rating}/5` : 'Rate'}</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
