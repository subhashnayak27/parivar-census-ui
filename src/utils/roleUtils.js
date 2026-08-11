// ================================
// Get Current Role
// ================================

export const getCurrentRole = () => {

    const role = localStorage.getItem("role");

    if (!role) {
        return null;
    }

    return role
        .replace("ROLE_", "")
        .trim()
        .toUpperCase();
};


// ================================
// Create
// ================================

export const canCreate = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN",
        "DATA_ENTRY"
    ].includes(role);
};


// ================================
// Edit
// ================================

export const canEdit = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN",
        "DATA_ENTRY"
    ].includes(role);
};


// ================================
// Delete
// ================================

export const canDelete = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN"
    ].includes(role);
};


// ================================
// Upload Excel
// ================================

export const canUpload = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN",
        "DATA_ENTRY"
    ].includes(role);
};


// ================================
// Download Template
// ================================

export const canDownloadTemplate = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN",
        "DATA_ENTRY"
    ].includes(role);
};


// ================================
// Export Excel
// ================================

export const canExport = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN",
        "DATA_ENTRY"
    ].includes(role);
};


// ================================
// User Management
// ================================

// View Users
export const canViewUsers = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN"
    ].includes(role);
};


// Create User
export const canCreateUser = () => {

    const role = getCurrentRole();

    return role === "SUPER_ADMIN";
};


// Edit User
export const canEditUser = () => {

    const role = getCurrentRole();

    return role === "SUPER_ADMIN";
};


// Delete User
export const canDeleteUser = () => {

    const role = getCurrentRole();

    return role === "SUPER_ADMIN";
};


// Activate / Deactivate User
export const canChangeUserStatus = () => {

    const role = getCurrentRole();

    return [
        "SUPER_ADMIN",
        "ADMIN"
    ].includes(role);
};


// Change User Role
export const canChangeUserRole = () => {

    const role = getCurrentRole();

    return role === "SUPER_ADMIN";
};