import express from "express";
import cors from "cors";
import employeeRoutes from "../../backend/src/v1/routes/employeeRoutes";
import errorHandler from "./v1/middleware/errorHandler";
import { getAllEmployees, getEmployeeById } from "./v1/controllers/employeeController";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/employees", getAllEmployees)
app.get("/api/employees/:id", getEmployeeById)

app.use(errorHandler);

export default app;
