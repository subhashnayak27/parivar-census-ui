import api from "./api";

export const getMembers = () => api.get("/members");
export const getMemberById = (id) => api.get(`/members/${id}`);
export const createMember = (member) => api.post("/members", member);
export const updateMember = (id, member) => api.put(`/members/${id}`, member);
export const deleteMember = (id) => api.delete(`/members/${id}`);

// ================================
// Bulk Upload
// ================================
export const uploadMembers = (file) => {

    const formData = new FormData();
    formData.append("file", file);

    return api.post(
        "/members/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};


// ================================
// Download Template
// ================================
export const downloadTemplate = () =>
    api.get("/members/template", {
        responseType: "blob"
    });


// ================================
// Export Members
// ================================
export const exportMembers = () =>
    api.get("/members/export", {
        responseType: "blob"
    });