import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { db } from '../firebase/FirebaseConnection';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductPriceChart = ({ productName }) => {
  const [pricePerUnitData, setPriceperunitData] = useState([]);

  useEffect(() => {
    const fetchPriceperunitData = async () => {
      try {
        const q = query(collection(db, 'products'), where('productName', '==', productName));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          const { date, storeName, pricePerUnit } = doc.data();
          data.push({ date, storeName, pricePerUnit });
        });
        setPriceperunitData(data);
      } catch (error) {
        console.error('Error fetching price data: ', error);
      }
    };

    fetchPriceperunitData();
  }, [productName]);

  const renderChart = () => {
    const chartData = {
      labels: pricePerUnitData.map((entry) => entry.date),
      datasets: [],
    };

    const stores = [...new Set(pricePerUnitData.map((entry) => entry.storeName))];
    stores.forEach((store) => {
      const storeData = {
        label: store,
        data: pricePerUnitData.filter((entry) => entry.storeName === store).map((entry) => entry.pricePerUnit),
        fill: false,
        borderColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
      };
      chartData.datasets.push(storeData);
    });

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Price per unit',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    };

    return <Line data={chartData} options={options} />;
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Price Chart for {productName}
      </Typography>
      {pricePerUnitData.length > 0 ? renderChart() : <Typography>No data available</Typography>}
    </>
  );
};

export default ProductPriceChart;
