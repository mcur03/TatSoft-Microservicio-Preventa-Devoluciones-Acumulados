"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const presaleRoutes_1 = __importDefault(require("./src/routes/presaleRoutes"));
const salesRoutes_1 = __importDefault(require("./src/routes/salesRoutes"));
const refundRoutes_1 = __importDefault(require("./src/routes/refundRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)().use(body_parser_1.default.json());
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
// Montar la documentación Swagger en la ruta `/api-docs`
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', presaleRoutes_1.default);
app.use('/', salesRoutes_1.default);
app.use('/', refundRoutes_1.default);
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
