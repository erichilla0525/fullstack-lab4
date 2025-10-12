import * as employeeRepo from "../apis/employeesRepo";

export async function fetchEmployees() {
    const employees = await employeeRepo.getEmployees();
    return employees;
}

export async function createEmployee(employee: { name: string; department: string }) {
    return await employeeRepo.createEmployee(employee);
}

export async function deleteEmployee(id: string) {
    return await employeeRepo.deleteEmployee(id);
}

export async function validateEmployee(employee: { name: string; department: string }) {
    const validationErrors = new Map<string, string>();

    if (!employee.name?.trim()) validationErrors.set("name", "Employee name must be defined");
    if (!employee.department?.trim()) validationErrors.set("department", "Employee department must be defined");

    return validationErrors
}