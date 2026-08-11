import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import StatusBadge from "../../components/common/StatusBadge";
import Pagination from "../../components/common/Pagination";
import UserForm from "./UserForm";

import {
    canViewUsers,
    canCreateUser,
    canEditUser,
    canDeleteUser,
    canChangeUserStatus,
    canChangeUserRole,
    getCurrentRole
} from "../../utils/roleUtils";

import {
    getUsers,
    deleteUser,
    updateUserStatus,
    updateUserRole
}
from "../../services/userService";

function UserList() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [showStatusDialog, setShowStatusDialog] = useState(false);
    const [statusUser, setStatusUser] = useState(null);

    // Role change
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const [roleUser, setRoleUser] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // ================================
    // Get Roles
    // ================================

    const pageSize = 10;

    const currentRole = getCurrentRole();
console.log("CURRENT ROLE:", currentRole);
console.log("CAN CHANGE ROLE:", canChangeUserRole());
    const availableRoles =
        currentRole === "SUPER_ADMIN"
            ? [
                { id: 1, name: "ADMIN" },
                { id: 2, name: "SUPER_ADMIN" },
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
    // Load Users
    // ================================

    useEffect(() => {

        loadUsers();

    }, [currentPage]);


    const loadUsers = async () => {

        try {

            setLoading(true);

            const response = await getUsers({

                page: currentPage - 1,

                size: pageSize,

                sortBy: "id",

                direction: "asc"

            });

            const pageData = response.data.data;

            setUsers(pageData.content);

            setTotalPages(pageData.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load users");

        } finally {

            setLoading(false);

        }

    };


    // ================================
    // Delete
    // ================================

    const deleteUserRecord = async () => {

        try {

            await deleteUser(deleteId);

            toast.success(
                "User deleted successfully"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        } finally {

            setDeleteId(null);

            setShowDeleteDialog(false);

        }

    };


    // ================================
    // Activate / Deactivate
    // ================================

    const handleStatusChange = (user) => {

        setStatusUser(user);
        setShowStatusDialog(true);

    };

    const confirmStatusChange = async () => {

        if (!statusUser) {
            return;
        }

        try {

            const newStatus = !statusUser.active;

            await updateUserStatus(
                statusUser.id,
                newStatus
            );

            toast.success(
                newStatus
                    ? "User activated successfully"
                    : "User deactivated successfully"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update user status"
            );

        } finally {

            setStatusUser(null);
            setShowStatusDialog(false);

        }
    };


    // ================================
    // Change Role
    // ================================

    const handleRoleChange = (user) => {

        setRoleUser(user);

        setSelectedRoleId("");

        setShowRoleDialog(true);

    };

    const confirmRoleChange = async () => {

          if (!roleUser || !selectedRoleId) {

              toast.error("Please select a role");

              return;

          }

          const roleId = Number(selectedRoleId);

          // Frontend safety check
          const allowedRoleIds =
              availableRoles.map(role => role.id);

          if (!allowedRoleIds.includes(roleId)) {

              toast.error("You are not allowed to assign this role");

              return;

          }

          try {

              await updateUserRole(
                  roleUser.id,
                  roleId
              );

              toast.success(
                  "User role updated successfully"
              );

              await loadUsers();

          } catch (error) {

              console.error(error);

              toast.error(
                  error.response?.data?.message ||
                  "Failed to update user role"
              );

          } finally {

              setRoleUser(null);

              setSelectedRoleId("");

              setShowRoleDialog(false);

          }

      };


    // ================================
    // Table Columns
    // ================================

    const columns = [

        {
            field: "id",
            header: "ID"
        },

        {
            field: "username",
            header: "Username"
        },

        {
            field: "fullName",
            header: "Full Name"
        },

        {
            field: "email",
            header: "Email"
        },

        {
            field: "mobileNo",
            header: "Mobile"
        },

        {
            field: "roleName",
            header: "Role"
        },

        {
            field: "active",
            header: "Status",

            render: (row) => (

                <StatusBadge
                    active={row.active}
                />

            )

        }

    ];


    return (

        <div className="container-fluid">

            <PageHeader

                title="User Management"

                buttonText="Add User"

                onAdd={() => {

                    setSelectedUser(null);

                    setShowModal(true);

                }}

                showButton={canCreateUser()}

            />


            <CommonTable

                columns={columns}

                data={users}

                loading={loading}

                renderActions={(user) => (

                    <div className="d-flex gap-2 flex-wrap">

                        {/* Edit */}

                        {canEditUser() && (

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => {

                                    setSelectedUser(user);

                                    setShowModal(true);

                                }}
                            >
                                Edit
                            </button>

                        )}


                        {/* Activate / Deactivate */}

                        {canChangeUserStatus() && (

                            <button
                                type="button"
                                className={
                                    user.active
                                        ? "btn btn-sm btn-outline-warning"
                                        : "btn btn-sm btn-outline-success"
                                }
                                onClick={() =>
                                    handleStatusChange(user)
                                }
                            >
                                {user.active
                                    ? "Deactivate"
                                    : "Activate"}
                            </button>

                        )}


                        {/* Change Role */}

                        {canChangeUserRole() && (

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-info"
                                onClick={() =>
                                    handleRoleChange(user)
                                }
                            >
                                Role
                            </button>

                        )}


                        {/* Delete */}

                        {canDeleteUser() && (

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {

                                    setDeleteId(user.id);

                                    setShowDeleteDialog(true);

                                }}
                            >
                                Delete
                            </button>

                        )}

                    </div>

                )}

            />


            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={setCurrentPage}

            />


            {/* ================================
                User Modal
            ================================= */}

            <CommonModal

                show={showModal}

                title={
                    selectedUser
                        ? "Edit User"
                        : "Add User"
                }

                onClose={() => {

                    setShowModal(false);

                    setSelectedUser(null);

                }}

            >

                <UserForm

                    user={selectedUser}

                    onSuccess={async () => {

                        setShowModal(false);

                        setSelectedUser(null);

                        await loadUsers();

                    }}

                    onClose={() => {

                        setShowModal(false);

                        setSelectedUser(null);

                    }}

                />

            </CommonModal>


            {/* ================================
                Delete Confirmation
            ================================= */}

            <ConfirmDialog
                show={showStatusDialog}

                title={
                    statusUser?.active
                        ? "Deactivate User"
                        : "Activate User"
                }

                message={
                    statusUser
                        ? `Are you sure you want to ${
                            statusUser.active
                                ? "deactivate"
                                : "activate"
                        } "${statusUser.fullName}"?`
                        : ""
                }

                confirmText={
                    statusUser?.active
                        ? "Deactivate"
                        : "Activate"
                }

                onConfirm={confirmStatusChange}

                onCancel={() => {

                    setStatusUser(null);
                    setShowStatusDialog(false);

                }}
            />


            <CommonModal
                show={showRoleDialog}
                title="Change User Role"
                onClose={() => {

                    setRoleUser(null);
                    setSelectedRoleId("");
                    setShowRoleDialog(false);

                }}
            >
                <div>

                    <p>
                        Change role for{" "}
                        <strong>
                            {roleUser?.fullName}
                        </strong>
                    </p>

                    <div className="mb-3">

                        <label className="form-label">
                            Select Role
                        </label>

                        <select
                            className="form-select"
                            value={selectedRoleId}
                            onChange={(e) =>
                                setSelectedRoleId(e.target.value)
                            }
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

                    <div className="d-flex justify-content-end gap-2">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {

                                setRoleUser(null);
                                setSelectedRoleId("");
                                setShowRoleDialog(false);

                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={confirmRoleChange}
                            disabled={!selectedRoleId}
                        >
                            Change Role
                        </button>

                    </div>

                </div>

            </CommonModal>
        </div>

    );

}

export default UserList;