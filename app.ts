import express from 'express';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";

import presaleRoutes from './src/routes/presaleRoutes';
import salesRoutes from './src/routes/salesRoutes';
import refundRoutes from './src/routes/refundRoutes';
import invoiceDownload from './src/routes/invoiceDownloadRoutes';


dotenv.config();

const app = express().use(bodyParser.json());

const swaggerDocument = YAML.load("./swagger.yaml");

// Montar la documentación Swagger en la ruta `/api-docs`
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', presaleRoutes);
app.use('/', salesRoutes);
app.use('/', refundRoutes);
app.use('/', invoiceDownload);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});