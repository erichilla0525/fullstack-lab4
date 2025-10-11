import React, { useState} from "react";
import { useEmployees } from "../hooks/useEmployees";

const Body = () => {
    const {
        employees,
        error,
        createEmployee,
        deleteEmployee,
    } = useEmployees();

    const [name, setName] = useState("");
    const[department, setDepartment] = useState("Administration");

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return
        
        createEmployee(name, department);
        setName("")
    }
    const handleDelete = (id:string) => {
        deleteEmployee(id);
    }
    if (error) {
        return<p> Error: {error} </p>
    }
    return(
        <main>
            <h2>Employees List</h2>
            <form onSubmit={handleCreate}>
            <input 
                type="text" 
                placeholder="Enter employee name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}/>

            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="Administration">Administration</option>
                <option value="Audit">Audit</option>
            </select>
            <button type="submit">Create Employee</button>

            </form>

             <hr />
             {employees.map((emp) => (
                <p key={emp.id}>
                    {emp.name}, {emp.department}
                    <button onClick={()=> handleDelete(emp.id)}>Delete</button>

                </p>
             ))}


        </main>
    )};

export default Body;