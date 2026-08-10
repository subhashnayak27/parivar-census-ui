import api from "./api";

// ================================
// Get Villages
// ================================
export const getVillages = ({
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) =>
    api.get("/villages", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });


// ================================
// Search Villages
// ================================
export const searchVillages = ({
    keyword,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
}) =>
    api.get("/villages/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });


// ================================
// Get Villages By District
// ================================
export const getVillagesByDistrict = (districtId) =>
    api.get(`/villages/district/${districtId}`);


// ================================
// Create Village
// ================================
export const createVillage = (village) =>
    api.post("/villages", village);


// ================================
// Update Village
// ================================
export const updateVillage = (id, village) =>
    api.put(`/villages/${id}`, village);


// ================================
// Delete Village
// ================================
export const deleteVillage = (id) =>
    api.delete(`/villages/${id}`);