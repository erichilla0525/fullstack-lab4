import { roleData as initialData } from "../data/mockOrganizations";

// ✅ 建立一个独立副本，不直接用导入的常量
let roles = [...initialData];

export async function getRoles() {
  // 每次返回新引用，React 才会 re-render
  return [...roles];
}

export async function createRole(newRole: { name: string; title: string; description: string }) {
  const id = (roles.length + 1).toString();
  const role = { id, ...newRole };
  roles = [...roles, role];  // ✅ 替换数组引用
  console.log("✅ 当前角色列表:", roles);
  return role;
}

export async function deleteRole(id: string) {
  roles = roles.filter((r) => r.id !== id);  // ✅ 同样替换引用
  console.log("❌ 删除后角色列表:", roles);
  return true;
}
