import * as organizationRepo from "../apis/organizationsRepo";

export async function fetchRole() {
    const roles = await organizationRepo.getRoles();
    return roles;
}

export async function createRole(role: { name: string, title: string, description: string }) {
        const allRoles = await organizationRepo.getRoles();

        const existing = allRoles.find((r) => r.title.toLowerCase() === role.title.toLowerCase());

        if (existing) {
            throw new Error(`The title of ${role.title} is already assigned to ${role.name}.`);
        }

    return await organizationRepo.createRole(role);

}

export async function deleteRole(id: string) {
    return await organizationRepo.deleteRole(id);
}

export async function validateRole(role: { name: string, title: string, description: string }) {
    const validateError = new Map<string, string>();

    if (!role.name.trim()) validateError.set("name", "The name of the role must be defined.");
    if (!role.title.trim()) validateError.set("title", "The title of the role must be defined.");
    if (!role.description.trim()) validateError.set("description", "The description of the role must be defined.")
    
    return validateError;
}