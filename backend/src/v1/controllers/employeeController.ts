import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { errorResponse, successResponse } from "../models/responseModel";
import { Employee } from "@prisma/client";

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

export const getEmployeeById = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employee | null = await employeeService.fetchEmployeeById(req.params.id);

        if(employee) {
            res.json(successResponse(employee, "Employee retrieved successfully"));
        } else {
            const error = new Error(`Employee with ID ${req.params.id} not found`);
            (error as any).statusCode = 404;
            throw error
        }
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