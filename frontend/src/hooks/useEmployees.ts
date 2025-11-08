import { useEffect, useMemo, useState } from "react";
import * as EmployeeService from "../services/validEmployeeServices";

interface Employee {
    id: string;
    name: string;
    department: string;
}

interface FilterOption {
    searchTerm: string;
    department: string;
}

export function useEmployees(dependencies: unknown[] = [], filterFn?: ((employee: Employee) => boolean) | null) {
        const [employees, setEmployees] = useState<Employee[]>([]);
        const [error, setError] = useState<string | null>(null);
        const [filters, setFilters] = useState<FilterOption>({
            searchTerm: "",
            department: "All",
        });

        const fetchEmployees = async() => {
            try {
                let result = await EmployeeService.fetchEmployees();
                
                if (filterFn) {
                    result = result.filter(filterFn);
                }
                setEmployees([...result]);
            } catch (errorObject) {
                setError(`${errorObject}`);
            }

        };

        const createEmployee = async (name: string, department: string) => {

            if (!name.trim()) {
                setError("Employee name is required.");
                return  
            }
            setError("")

            if (name.trim().length <3) {
                setError("Employee name at least requires 3 letters")
                return
            }
            setError("")

            try {
                await EmployeeService.createEmployee({ name, department });
                await fetchEmployees();
                
            } catch (errorObject) {
                setError(`${errorObject}`)
            }

        };

        const deleteEmployee = async(id: string) => {
            try {
                await EmployeeService.deleteEmployee(id);
                await fetchEmployees();
            } catch (errorObject) {
                setError(`${errorObject}`);
            }
        };

        const departmentOptions = useMemo(() => {
            const departments = [...new Set(employees.map((e) => e.department))] as string[];
            return ["All", ...departments];

        }, [employees])

        const filteredEmployees = useMemo(() => {
            let result = [...employees];

            if (filters.department !== "All") {
                result = result.filter((e) => e.department === filters.department);
            }
            if (filters.searchTerm) {
                const st = filters.searchTerm.toLowerCase();
                result = result.filter((e) => e.name.toLowerCase().includes(st))
            }
            return result;

        }, [employees, filters])

        const setSearchTerm = (searchTerm: string) => {
            setFilters((prev) => ({...prev, searchTerm}));

        };

        const setDepartment = (department: string) => {
            setFilters((prev) => ({...prev, department }))
        };

        useEffect(() => {
            fetchEmployees();
        }, [...dependencies]);

        return {
            employees,
            filters,
            filteredEmployees,
            error,
            createEmployee,
            deleteEmployee,
            departmentOptions,
            setSearchTerm,
            setDepartment,
        }
    } 
