import api from "./api";
export const getVillages = () => api.get("/villages");
export const getVillageById = (id) => api.get(`/villages/${id}`);
export const createVillage = (village) =>  api.post("/villages", village);
export const updateVillage = (id, village) =>  api.put(`/villages/${id}`, village);
export const deleteVillage = (id) =>  api.delete(`/villages/${id}`);
export const getVillagesByDistrict = (districtId) => api.get(`/villages/district/${districtId}`);