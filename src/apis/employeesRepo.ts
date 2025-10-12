import { employeeData } from "../data/mockEmployees";

export function getEmployees() {
    return employeeData;
}

export async function createEmployee(newEmpployee: { name: string; department: string }) {
  const id = (employeeData.length + 1).toString();
  const employee = { id, ...newEmpployee};
  employeeData.push(employee)
  return employee
}

export async function deleteEmployee(id: string) {
  const index = employeeData.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error(`Fail to delete employee with ID ${id}`);
  }
  employeeData.splice(index, 1);

}
  

    

