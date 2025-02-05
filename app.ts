import express from 'express';
import bodyParser from 'body-parser';

import dotenv from "dotenv";
import presaleRoutes from './src/routes/presaleRoutes';
import salesRoutes from './src/routes/salesRoutes';
import refundRoutes from './src/routes/refundRoutes';
dotenv.config();

const app = express().use(bodyParser.json());

app.use('/', presaleRoutes);
app.use('/', salesRoutes);
app.use('/', refundRoutes);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});