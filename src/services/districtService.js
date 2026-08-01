import api from "./api";
export const getDistricts = () => api.get("/districts");
export const getDistrictById = (id) => api.get(`/districts/${id}`);
export const createDistrict = (district) => api.post("/districts", district);
export const updateDistrict = (id, district) => api.put(`/districts/${id}`, district);
export const deleteDistrict = (id) => api.delete(`/districts/${id}`);
export const getDistrictsByState = (stateId) =>  api.get(`/districts/state/${stateId}`);