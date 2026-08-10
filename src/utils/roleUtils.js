const getCurrentRole = () => {

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
        "DATA_ENTRY",
    ].includes(role);
};