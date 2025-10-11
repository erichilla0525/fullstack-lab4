import * as organizationRepo from "../apis/organizationsRepo";

export async function fetchRole() {
    const roles = await organizationRepo.getRoles();
    return roles;
}

export async function createRole(role: { name: string, title: string, description: string }) {
    return await organizationRepo.createRole(role);
}

export async function deleteRole(id: string) {
    return await organizationRepo.deleteRole(id);
}

export async function validateRole(role: { name: string, title: string, description: string }) {
    const validateError = new Map<string, string>();

    if (!role.name.trim()) validateError.set("name", "The name of the role must be defined.");
    if (!role.title.trim()) validateError.set("title", "The title of the role must be defined.");
    if (!role.description.trim() validateError.set()

}