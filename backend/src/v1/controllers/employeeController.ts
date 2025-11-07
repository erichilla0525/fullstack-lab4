import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { errorResponse, successResponse } from "../models/responseModel";

export const getAllEmployees = async(
    req:Request,
    res:Response,
    next:NextFunction
): Promise<void> => {
    try {
        const employees = await employeeService.fetchAllEmployees();
        res.status(200).json(successResponse(employees, "Employees retrieved"));
    } catch (error) {
        next(error);
    }
};

export const createEmployee = async(
    req:Request,
    res:Response,
    next:NextFunction
): Promise<void> => {
    try {
        const newEmployee = await employeeService.createEmployee(req.body)
        res.status(201)
            .json(successResponse("Employee created successfully."))
    } catch(error) {
        next(error);
    }
}