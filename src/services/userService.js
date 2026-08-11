import api from "./api";

// ================================
// Get Users
// ================================
export const getUsers = ({
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) =>
    api.get("/users", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });


// ================================
// Get User By ID
// ================================
export const getUserById = (id) =>
    api.get(`/users/${id}`);


// ================================
// Create User
// ================================
export const createUser = (user) =>
    api.post("/users", user);


// ================================
// Update User
// ================================
export const updateUser = (id, user) =>
    api.put(`/users/${id}`, user);


// ================================
// Update User Status
// ================================
export const updateUserStatus = (id, active) =>
    api.patch(`/users/${id}/status`, null, {
        params: {
            active
        }
    });


// ================================
// Update User Role
// ================================
export const updateUserRole = (id, roleId) =>
    api.patch(`/users/${id}/role`, {
        roleId
    });


// ================================
// Delete User
// ================================
export const deleteUser = (id) =>
    api.delete(`/users/${id}`);