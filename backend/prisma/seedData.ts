import { Employee } from "@prisma/client";

export const employeeSeedData: Omit<Employee, "id">[] = [
    {
        name: "Tenpura",
        department: "Administration",
    },
    {
        name: "Sashimi",
        department: "Administration",
    },
    {
        name: "Sushi",
        department: "Audit",
    }
]