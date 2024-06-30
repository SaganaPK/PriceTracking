
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import ProductPriceChart from './ProductPriceChart';

const ProductDetails = () => {
  const { productName } = useParams(); // Assuming productName is passed as a URL parameter

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Product: {productName}
      </Typography>
      <ProductPriceChart productName={productName} />
    </div>
  );
};

export default ProductDetails;
