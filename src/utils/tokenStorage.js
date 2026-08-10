export const saveAuth = (auth) => {

    localStorage.setItem("token", auth.accessToken);
    localStorage.setItem("username", auth.username);
    localStorage.setItem("fullName", auth.fullName);
    localStorage.setItem("role", auth.role);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUsername = () => {
    return localStorage.getItem("username");
};

export const getFullName = () => {
    return localStorage.getItem("fullName");
};

export const getRole = () => {
    return localStorage.getItem("role");
};

export const logout = () => {
    localStorage.clear();
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};