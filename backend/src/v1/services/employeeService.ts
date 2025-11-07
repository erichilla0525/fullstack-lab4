import { PrismaClient, Employee } from "@prisma/client";

let prisma = new PrismaClient()

export const fetchAllEmployees = async (): Promise<Employee[]> => {
  return await prisma.employee.findMany()
};

export const fetchEmployeeById = async(id: string): Promise<Employee | null> => {
    try {
        const employee = await prisma.employee.findUnique({
            where: {id},
        });
        return employee
    } catch(error) {
        throw error;
    }
};

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