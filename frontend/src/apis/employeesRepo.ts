import { employeeData } from "../data/mockEmployees";

const api_base = "http://localhost:3000/api/employees";

export async function getEmployees() {
    const res = await fetch(api_base)
    if (!res) throw new Error("Failed to fetch Employees from database")
    const result = await res.json();
    return result.data;
}

export async function createEmployee(newEmpployee: { name: string; department: string }) {
  const id = (employeeData.length + 1).toString();
  const employee = { id, ...newEmpployee};
  employeeData.push(employee)
  return employee
}

export async function updateEmployee(updatedEmployee: { id: string; name: string; department: string }) {
  const index = employeeData.findIndex((e) => e.id === updatedEmployee.id)
  
  if (index === -1) {
    throw new Error(`Failed to update employee with ID ${updatedEmployee.id}`);
  }
  employeeData[index] = updatedEmployee;
  return employeeData[index]
}

export async function deleteEmployee(id: string) {
  const index = employeeData.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error(`Fail to delete employee with ID ${id}`);
  }
  employeeData.splice(index, 1);

}
  

    

