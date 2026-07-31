import api from "./api";
export const getStates = () => api.get("/states");
export const createState = (state) => api.post("/states", state);
export const updateState = (id, state) => {return api.put(`/states/${id}`, state);};
