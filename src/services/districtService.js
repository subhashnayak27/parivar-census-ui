import api from "./api";

export const getDistricts = ({
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) => {

    return api.get("/districts", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });
};

export const searchDistricts = ({
    keyword,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) => {

    return api.get("/districts/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });
};

export const getDistrictById = (id) =>
    api.get(`/districts/${id}`);

export const getDistrictsByState = (stateId) =>
    api.get(`/districts/state/${stateId}`);

export const createDistrict = (district) =>
    api.post("/districts", district);

export const updateDistrict = (id, district) =>
    api.put(`/districts/${id}`, district);

export const deleteDistrict = (id) =>
    api.delete(`/districts/${id}`);