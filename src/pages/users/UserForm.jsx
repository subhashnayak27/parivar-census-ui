import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {createUser,updateUser } from "../../services/userService";
import { getCurrentRole } from "../../utils/roleUtils";

function UserForm({
    user,
    onSuccess,
    onClose
}) {

    const [form, setForm] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        mobileNo: "",
        roleId: 4
    });

    const [loading, setLoading] = useState(false);
    const currentRole = getCurrentRole();
    const availableRoles =
    currentRole === "SUPER_ADMIN"
        ? [
            { id: 1, name: "ADMIN" },
            { id: 3, name: "DATA_ENTRY" },
            { id: 4, name: "VIEWER" }
        ]
        : currentRole === "ADMIN"
            ? [
                { id: 3, name: "DATA_ENTRY" },
                { id: 4, name: "VIEWER" }
            ]
            : [];



    // ================================
    // Load User For Edit
    // ================================

    useEffect(() => {

        if (user) {

            setForm({
                username: user.username || "",
                password: "",
                fullName: user.fullName || "",
                email: user.email || "",
                mobileNo: user.mobileNo || "",
                roleId: getRoleId(user.roleName)
            });

        } else {

            setForm({
                username: "",
                password: "",
                fullName: "",
                email: "",
                mobileNo: "",
                roleId: 4
            });

        }

    }, [user]);


    // ================================
    // Convert Role Name → Role ID
    // ================================

    const getRoleId = (roleName) => {

        switch (roleName) {

            case "ADMIN":
                return 1;

            case "SUPER_ADMIN":
                return 2;

            case "DATA_ENTRY":
                return 3;

            case "VIEWER":
                return 4;

            default:
                return 4;

        }

    };


    // ================================
    // Handle Change
    // ================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // ================================
    // Submit
    // ================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const request = {
                username: form.username,
                fullName: form.fullName,
                email: form.email,
                mobileNo: form.mobileNo,
                roleId: Number(form.roleId)
            };


            // Password is required only when creating
            if (!user) {

                request.password = form.password;

            }


            if (user) {

                await updateUser(
                    user.id,
                    request
                );

                toast.success(
                    "User updated successfully"
                );

            } else {

                await createUser(request);

                toast.success(
                    "User created successfully"
                );

            }


            if (onSuccess) {

                await onSuccess();

            }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to save user"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <form onSubmit={handleSubmit}>

            {/* Username */}

            <div className="mb-3">

                <label className="form-label">
                    Username
                </label>

                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username}
                    onChange={handleChange}
                    required
                    disabled={!!user}
                />

            </div>


            {/* Password */}

            {!user && (

                <div className="mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                </div>

            )}


            {/* Full Name */}

            <div className="mb-3">

                <label className="form-label">
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                />

            </div>


            {/* Email */}

            <div className="mb-3">

                <label className="form-label">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                />

            </div>


            {/* Mobile */}

            <div className="mb-3">

                <label className="form-label">
                    Mobile No
                </label>

                <input
                    type="text"
                    name="mobileNo"
                    className="form-control"
                    value={form.mobileNo}
                    onChange={handleChange}
                />

            </div>


            {/* Role */}

            <div className="mb-3">

                <label className="form-label">
                    Role
                </label>

                <select
                    name="roleId"
                    className="form-select"
                    value={form.roleId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Role
                    </option>

                    {availableRoles.map(role => (
                        <option
                            key={role.id}
                            value={role.id}
                        >
                            {role.name}
                        </option>
                    ))}
                </select>

            </div>


            {/* Buttons */}

            <div className="d-flex justify-content-end gap-2">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >

                    {loading
                        ? "Saving..."
                        : user
                            ? "Update User"
                            : "Create User"}

                </button>

            </div>

        </form>

    );

}

export default UserForm;