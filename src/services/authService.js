import api from "./api";

export const login = async (username, password) => {

    const response = await api.post("/auth/login", {
        username,
        password
    });

    return response.data;
};

export const registerUser = async (user) => {

    const response = await api.post("/auth/register", user);

    return response.data;
};

export const forgotPassword = (email) => {

    return api.post(
        "/auth/forgot-password",
        {
            email
        }
    );

};


export const resetPassword = (
    token,
    newPassword
) => {

    return api.post(
        "/auth/reset-password",
        {
            token,
            newPassword
        }
    );

};