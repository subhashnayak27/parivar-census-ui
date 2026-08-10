import api from "./api";

// ================================
// Get Members
// ================================
export const getMembers = ({
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
} = {}) => {

    return api.get("/members", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });

};


// ================================
// Search Members
// ================================
export const searchMembers = ({
    keyword,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
}) => {

    return api.get("/members/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });

};


// ================================
// Get Member By ID
// ================================
export const getMemberById = (id) =>
    api.get(`/members/${id}`);


// ================================
// Create Member
// ================================
export const createMember = (member) =>
    api.post("/members", member);


// ================================
// Update Member
// ================================
export const updateMember = (id, member) =>
    api.put(`/members/${id}`, member);


// ================================
// Delete Member
// ================================
export const deleteMember = (id) =>
    api.delete(`/members/${id}`);


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