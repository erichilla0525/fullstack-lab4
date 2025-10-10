import { employeeData } from "../data/mockEmployees";

export function getEmployees() {
    return employeeData;
}

export async function createEmployee(newEmployee:{ id: string; name: string; department: string }) {
    employeeData.push(newEmployee)
    return newEmployee
}

export async function updateEmployee(employee: {id: string; name: string; department: string }) {
    const foundIndex = employeeData.findIndex((e) => e.id === employee.id)

    if(foundIndex === -1) {
        throw new Error('Failed to update employee with id ${employee.id}');
    }
    employeeData[foundIndex] = employee;
    return employeeData[foundIndex];
}

export async function deleteEmployee(id: string) {
  const index = employeeData.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error(`Failed to delete employee with id ${id}`);
  }
  return employeeData.splice(index, 1)[0];
}
    

