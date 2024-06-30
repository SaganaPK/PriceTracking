import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <Typography variant="h4" gutterBottom>
          Product Management
        </Typography>
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
          <Button variant="contained" color="primary" component={Link} to="/add">
            Add New Products
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/view">
            View Products
          </Button>
        </Stack>
      </header>
    </div>
  );
}

export default Home;
