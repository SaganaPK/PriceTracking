import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddProductPage from './pages/AddProductPage';
import ViewProductsPage from './pages/ViewProductsPage';
import ProductDetails from './components/ProductDetails';
import ViewProducts from './components/ViewProducts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/view" element={<ViewProductsPage />} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
