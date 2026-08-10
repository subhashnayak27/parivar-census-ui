import api from "./api";

export const getStates = ({
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) => {

    return api.get("/states", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });
};

export const searchStates = ({
    keyword,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
}) => {

    return api.get("/states/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });
};

export const createState = (state) =>
    api.post("/states", state);

export const updateState = (id, state) =>
    api.put(`/states/${id}`, state);

export const deleteState = (id) =>
    api.delete(`/states/${id}`);