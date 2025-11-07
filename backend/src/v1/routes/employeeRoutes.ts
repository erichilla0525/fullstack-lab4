import express from "express";
import * as employeeController from "../controllers/employeeController";

const router = express.Router();

router.get("/", employeeController.getAllEmployees);

router.post("/", employeeController.createEmployee);

export default router;