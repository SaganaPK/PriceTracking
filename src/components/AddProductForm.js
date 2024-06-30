import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Button, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { db } from '../firebase/FirebaseConnection'; 
import { addDoc, collection, getDocs } from 'firebase/firestore';

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [date, setDate] = useState('');
  const [storeName, setStoreName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitType, setUnitType] = useState('');
  const [price, setPrice] = useState('');
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [storeSuggestions, setStoreSuggestions] = useState([]);

  const liquidItems = [
    { value: 'ml', label: 'ml' },
    { value: 'l', label: 'l' },
    { value: 'fl oz', label: 'fl oz' },
    { value: 'gal', label: 'gal' },
  ];
  
  const weightItems = [
    { value: 'gm', label: 'gm' },
    { value: 'kg', label: 'kg' },
    { value: 'oz', label: 'oz' },
    { value: 'lb', label: 'lb' },
  ];
  
  const quantityItems = [
    { value: 'units', label: 'Units' },
    { value: 'dz', label: 'Dz' },
    { value: 'box', label: 'Box' },
    { value: 'pack', label: 'Pack' },
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      const productsCollection = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollection);
      const products = new Set();
      const stores = new Set();

      querySnapshot.forEach((doc) => {
        products.add(doc.data().productName);
        stores.add(doc.data().storeName);
      });

      setProductSuggestions(Array.from(products));
      setStoreSuggestions(Array.from(stores));
    };

    fetchSuggestions();
  }, []);

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
    setUnitType('');
    setPrice('');
  };

  const handleUnitTypeChange = (e) => {
    setUnitType(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const pricePerUnit = price / quantity;
      await addProductToFirestore({
        productName: capitalizeFirstLetter(productName),
        productType,
        date,
        storeName: capitalizeFirstLetter(storeName),
        quantity,
        unitType,
        price,
        pricePerUnit
      });
  
      setProductName('');
      setProductType('');
      setDate('');
      setStoreName('');
      setQuantity('');
      setUnitType('');
      setPrice('');
  
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Error adding product. Please try again later.');
    }
  };
  
  const addProductToFirestore = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column" alignItems="center">
      <Autocomplete
        options={productSuggestions}
        fullWidth
        getOptionLabel={(option) => option} // Use option directly since it's a string
        onInputChange={(event, newValue) => setProductName(newValue)}
        renderInput={(params) => <TextField {...params} label="Product Name" />}
        freeSolo
     />

    <Autocomplete
    options={storeSuggestions}
    fullWidth
    getOptionLabel={(option) => option} // Use option directly since it's a string
    onInputChange={(event, newValue) => setStoreName(newValue)}
    renderInput={(params) => <TextField {...params} label="Store Name" />}
    freeSolo
    />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="product-type-label">Product Type</InputLabel>
          <Select
            labelId="product-type-label"
            value={productType}
            onChange={handleProductTypeChange}
            fullWidth
          >
            <MenuItem value="liquid">Liquid</MenuItem>
            <MenuItem value="weight">Weight</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
        {productType && (
          <Stack spacing={2} direction="row" alignItems="center">
            <FormControl fullWidth>
              <InputLabel id="unit-type-label">Unit Type</InputLabel>
              <Select
                labelId="unit-type-label"
                value={unitType}
                onChange={handleUnitTypeChange}
                fullWidth
              >
                {productType === 'liquid' && liquidItems.map(item => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))}
                {productType === 'weight' && weightItems.map(item => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))}
                {productType === 'quantity' && quantityItems.map(item => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Stack>
        )}
        <TextField
          label="Price"
          value={price}
          onChange={handlePriceChange}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default AddProductForm;
