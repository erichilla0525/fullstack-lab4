import { useEffect, useMemo, useState } from "react";
import * as roleService from "../services/validOrganizationService";

interface Role {
    id: string;
    name: string;
    title: string;
    description: string;
}

interface FilterOption {
    searchTerm: string;
    title: string;
}

export function useRole(dependencies: unknown[] =[], filterFn?:(role: Role) => boolean) {
    const [role, setRole] = useState<Role[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterOption>({
        searchTerm: "",
        title: "All",
    });

    const fetchRole = async() => {
        try {
            let result = await roleService.fetchRole();

            if (filterFn) {
                result = result.filter(filterFn);
            }
            setRole([...result])
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };

    const createRole = async(name: string, title: string, description: string) => {
        try {
            await roleService.createRole({ name, title, description });
            await fetchRole(); // ✅ 刷新 UI
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };

        const deleteRole = async(id: string) => {
        try {
            await roleService.deleteRole(id);
            await fetchRole(); // ✅ 刷新 UI
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };


    const titleOptions = useMemo(() =>{
        const titles = [...new Set(role.map((r) => r.title))] as string[];
        return ["All", ...titles]

    },[role])

    const filteredRole = useMemo(() =>{
        let result = [...role];

        if (filter.title !=="All") {
            result = result.filter((r) => r.title === filter.title)
        }

        if (filter.searchTerm) {
            const st = filter.searchTerm.toLowerCase();
            result = result.filter((r) => r.name.toLowerCase().includes(st))
        }
        return result
    },[role, filter])

    const setSearchTerm = (searchTerm: string) => {
            setFilter((prev) => ({...prev, searchTerm}));
        };
    
    const setTitle = (title: string) => {
            setFilter((prev) => ({...prev, title}));
    };

    useEffect(()=> {
        fetchRole();
    },[...dependencies]);

    return {
        error,
        setTitle,
        setSearchTerm,
        filteredRole,
        titleOptions,
        deleteRole,
        createRole,
    };

}




