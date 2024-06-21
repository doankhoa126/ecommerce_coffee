import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './src/route/userRoutes.js'
import productRoutes from './src/route/productRoutes.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

app.get('/',(req, res) =>{
    res.send('Hello World');
})

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () =>{
    console.log('Server is running http://localhost:3000');
})