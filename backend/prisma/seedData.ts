import { Employee } from "@prisma/client";

export const employeeSeedData: Omit<Employee, "id">[] = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "HR" },
  { name: "Charlie", department: "Finance" },
];
