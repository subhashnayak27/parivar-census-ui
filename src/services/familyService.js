import api from "./api";
export const getFamilies = () => api.get("/families");
export const getFamilyById = (id) => api.get(`/families/${id}`);
export const createFamily = (family) => api.post("/families", family);
export const updateFamily = (id, family) =>  api.put(`/families/${id}`, family);
export const deleteFamily = (id) =>  api.delete(`/families/${id}`);
export const getFamiliesByVillage = (villageId) => api.get(`/families/village/${villageId}`);
export const getVillagesByDistrict = (districtId) =>  api.get(`/villages/district/${districtId}`);
