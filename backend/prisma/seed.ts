import { Employee, PrismaClient } from "@prisma/client";
import { employeeSeedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    await prisma.employee.deleteMany();

    const createManyEmployees = await prisma.employee.createManyAndReturn(
        {
            data: employeeSeedData as Omit<Employee, "id">[] as any,
            skipDuplicates: true
        }
    );
    console.log("Employee created:", createManyEmployees);
};

main().then(
    async() => {
        await prisma.$disconnect()
    }
).catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})