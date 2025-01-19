import express from 'express';
import bodyParser from 'body-parser';

import dotenv from "dotenv";
import presaleRoutes from './src/routes/presaleRoutes';
dotenv.config();

const app = express().use(bodyParser.json());

app.use('/', presaleRoutes);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});