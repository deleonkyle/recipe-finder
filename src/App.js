import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import Search from './components/Search';
import Favorites from './components/Favorites';
import NavigationBar from './components/Navbar';
import RecipeModal from './components/RecipeModal';

const App = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // State for sidebar visibility

  const handleSaveRecipe = (recipe) => {
    if (!favorites.some((fav) => fav.uri === recipe.uri)) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveRecipe = (recipe) => {
    const updatedFavorites = favorites.filter((fav) => fav.uri !== recipe.uri);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveAllRecipes = () => {
    setFavorites([]); // Clear the favorites array
    localStorage.removeItem('favorites'); // Clear from local storage
  };

  const handleShowModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setShowModal(false);
  };

  return (
    <Router>
      <Container fluid className="p-0">
        <NavigationBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} /> {/* Only one render */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search favorites={favorites} onSaveRecipe={handleSaveRecipe} onRemoveRecipe={handleRemoveRecipe} onShowModal={handleShowModal} />} />
          <Route path="/favorites" element={
            <Favorites 
              favorites={favorites} 
              onRemoveRecipe={handleRemoveRecipe} 
              onShowRecipe={handleShowModal} 
              onRemoveAllRecipes={handleRemoveAllRecipes} // Pass the remove all function
            />
          } />
        </Routes>

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            show={showModal}
            handleClose={handleCloseModal}
            onSave={handleSaveRecipe}
            onRemove={handleRemoveRecipe}
            isSaved={favorites.some((fav) => fav.uri === selectedRecipe.uri)}
          />
        )}
      </Container>
    </Router>
  );
};

export default App;
