import { PrismaClient, Employee } from "@prisma/client";

let prisma = new PrismaClient()

export const fetchAllEmployees = async (): Promise<Employee[]> => {
  return await prisma.employee.findMany()
}

export const createEmployee = async(employeeData: {
    name: string;
    department: string;
}): Promise<Employee> => {
    const newEmployee: Employee = await prisma.employee.create({
        data: {
            ...employeeData
        },
    });
    return newEmployee
};