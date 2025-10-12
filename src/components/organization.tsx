import React, { useState} from "react";
import { useRole } from "../hooks/useRole";
import SearchBar from "./SearchBar";

const ManagementRole = () => {
    const {
        error,
        setTitle,
        setSearchTerm,
        filteredRole,
        titleOptions,
        deleteRole,
        createRole,
    } = useRole();

    const [name, setName] = useState("");
    const [title, setNewTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = (e: React.FormEvent) => {
            e.preventDefault();

            createRole(name, title, description);
            setName("");
            setNewTitle("");
            setDescription("");
    };

    return(
        <main>
            <h2>Leadership Team</h2>
            <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
            <select onChange={(e) => setTitle(e.target.value)}>
                {titleOptions.map((title) => (
                    <option key={title} value={title}>
                        {title}
                    </option>
                ))}
            </select>  

            {error && <p style={{ color: "red" }}>{error}</p>}

            <hr />

            <form onSubmit={handleCreate}>
                <h3>Create a role</h3>

                <input type="text" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Enter the title" value={title} onChange={(e) => setNewTitle(e.target.value)} />
                <input type="text" placeholder="Enter the title description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <button type="submit">Create a role</button>
            </form>

            <hr />
            {filteredRole.map((role) => (
                <section>
                    <p>{role.title}</p>
                    <p>{role.name}</p>
                    <p>{role.description}</p>

                    <button onClick={() => deleteRole(role.id)}>Delete</button>
                </section>
            ))}
        </main>
    );
  
};

export default ManagementRole;