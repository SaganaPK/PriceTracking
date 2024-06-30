import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { db } from '../firebase/FirebaseConnection';
import { collection, getDocs } from 'firebase/firestore';

import { RootContainer, List, ListItem } from '../styles/styles'; // Import styled components

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Function to fetch unique product names from Firestore
    const fetchUniqueProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = new Set(); // Using Set to store unique product names
        querySnapshot.forEach((doc) => {
          // Assuming each document has a 'productName' field
          const productName = doc.data().productName;
          productsData.add(productName);
        });
        // Convert Set back to an array and set state
        setProducts(Array.from(productsData));
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    // Call the function to fetch unique product names
    fetchUniqueProducts();
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleProductClick = (productName) => {
    // Navigate to product details page with product name as a parameter
    navigate(`/product/${encodeURIComponent(productName)}`);
  };

  return (
    <RootContainer>
      <Typography variant="h4" gutterBottom>
        Products List
      </Typography>
      <List>
        {products.map((productName, index) => (
          <ListItem key={index} onClick={() => handleProductClick(productName)}>
            {productName}
          </ListItem>
        ))}
      </List>
    </RootContainer>
  );
}

export default ViewProducts;
