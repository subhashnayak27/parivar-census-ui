import api from "./api";
export const getStates = () => api.get("/states");
export const createState = (state) => api.post("/states", state);
export const updateState = (id, state) => api.put(`/states/${id}`, state);
export const deleteState = (id) => api.delete(`/states/${id}`);
