import { roleData } from "../data/mockOrganizations";

export function getRoles() {
    return roleData;
}

export async function createRole(newRole: {name: string, title: string, description: string}) {
    const id = (roleData.length + 1).toString();
    const role = { id, ...newRole };
    roleData.push(role);
    return role;
}

export async function deleteRole(id: string) {
    const index = roleData.findIndex((r) => r.id === id );
    roleData.splice(index, 1);
}