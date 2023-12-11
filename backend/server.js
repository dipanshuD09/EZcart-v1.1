import express from 'express';
//const express = require('express');
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

connectDB();

const port = process.env.PORT || 5000;
//const port = 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

// app.get('/api/products', (req, res) => {
//     res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// });

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));