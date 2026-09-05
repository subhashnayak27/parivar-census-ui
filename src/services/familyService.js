import api from "./api";

// ================================
// Get Families
// ================================
export const getFamilies = ({
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) =>
    api.get("/families", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });


// ================================
// Search Families
// ================================
export const searchFamilies = ({
    keyword,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
}) =>
    api.get("/families/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });


// ================================
// Get Family By ID
// ================================
export const getFamilyById = (id) =>
    api.get(`/families/${id}`);


// ================================
// Get Families By Village
// ================================
export const getFamiliesByVillage = (villageId) =>
    api.get(`/families/village/${villageId}`);


// ================================
// Create
// ================================
export const createFamily = (family) =>
    api.post("/families", family);


// ================================
// Update
// ================================
export const updateFamily = (id, family) =>
    api.put(`/families/${id}`, family);


// ================================
// Delete
// ================================
export const deleteFamily = (id) =>
    api.delete(`/families/${id}`);


// ================================
// Export Family Members
// ================================
export const exportFamilyMembers = (familyId) =>
    api.get(`/families/${familyId}/members/export`, {
        responseType: "blob"
    });