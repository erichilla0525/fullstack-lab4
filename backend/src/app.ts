import express from "express";
import cors from "cors";
import employeeRoutes from "../../backend/src/v1/routes/employeeRoutes";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/employees", employeeRoutes)

export default app;
