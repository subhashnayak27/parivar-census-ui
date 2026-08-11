import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { canCreate, canEdit, canDelete , canUpload, canExport, canDownloadTemplate} from "../../utils/roleUtils";
import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";
import SearchBox from "../../components/common/SearchBox";
import Pagination from "../../components/common/Pagination";

import MemberForm from "./MemberForm";
import ExcelToolbar from "../../components/common/ExcelToolbar";

import {
    getMembers,
    searchMembers,
    deleteMember,
    uploadMembers,
    downloadTemplate,
    exportMembers
} from "../../services/memberService";

function MemberList() {

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedMember, setSelectedMember] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    // ================================
    // Search
    // ================================

    const [searchKeyword, setSearchKeyword] = useState("");

    // ================================
    // Pagination
    // ================================

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 10;


    // ================================
    // Load Members
    // ================================

    useEffect(() => {

        loadMembers();

    }, [currentPage, searchKeyword]);


    const loadMembers = async () => {

        try {

            setLoading(true);

            const page = currentPage - 1;

            let response;

            if (searchKeyword.trim()) {

                response = await searchMembers({

                    keyword: searchKeyword.trim(),

                    page: page,

                    size: pageSize,

                    sortBy: "id",

                    direction: "asc"

                });

            } else {

                response = await getMembers({

                    page: page,

                    size: pageSize,

                    sortBy: "id",

                    direction: "asc"

                });

            }

            const pageData = response.data.data;

            setMembers(pageData.content);

            setTotalPages(pageData.totalPages);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load members");

        }

        finally {

            setLoading(false);

        }

    };


    // ================================
    // Search Handler
    // ================================

    const handleSearch = (value) => {

        setSearchKeyword(value);

        setCurrentPage(1);

    };


    // ================================
    // Pagination Handler
    // ================================

    const handlePageChange = (page) => {

        setCurrentPage(page);

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
            field: "memberCode",
            header: "Member Code"
        },

        {
            field: "firstName",
            header: "First Name"
        },

        {
            field: "lastName",
            header: "Last Name"
        },

        {
            field: "gender",
            header: "Gender"
        },

        {
            field: "relationship",
            header: "Relationship"
        },

        {
            field: "familyHeadName",
            header: "Family Head"
        },

        {
            field: "mobileNo",
            header: "Mobile"
        },

        {
            field: "active",
            header: "Status",

            render: (row) => (
                <StatusBadge active={row.active} />
            )

        }

    ];


    // ================================
    // Download Template
    // ================================

    const handleDownloadTemplate = async () => {

        try {

            const response = await downloadTemplate();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download =
                "Member_Bulk_Upload_Template.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.error(error);

            alert("Unable to download template.");

        }

    };


    // ================================
    // Export Members
    // ================================

    const handleExport = async () => {

        try {

            const response = await exportMembers();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Members.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.error(error);

            alert("Export failed.");

        }

    };


    // ================================
    // Upload Members
    // ================================

    const handleUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        try {

            const response =
                await uploadMembers(file);

            alert(response.data.message);

            // Reload current list
            loadMembers();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Upload failed."
            );

        }

        event.target.value = "";

    };


    // ================================
    // Delete Member
    // ================================

    const deleteMemberRecord = async () => {

        try {

            await deleteMember(deleteId);

            toast.success(
                "Member deleted successfully"
            );

            await loadMembers();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to delete member"
            );

        }

        finally {

            setDeleteId(null);

            setShowDeleteDialog(false);

        }

    };


    return (

        <div className="container-fluid">

            <PageHeader
                title="Member Management"
                buttonText="Add Member"

                onAdd={() => {
                    setSelectedMember(null);
                    setShowModal(true);
                }}
                    showButton={canCreate()}
            />


            <ExcelToolbar
                onDownloadTemplate={handleDownloadTemplate}
                onUpload={handleUpload}
                onExport={handleExport}
                showUpload={canUpload()}
                showExport={canExport()}
                showDownloadTemplate={canDownloadTemplate()}
            />


            {/* ================================
                Search
            ================================= */}

            <SearchBox

                value={searchKeyword}

                onChange={handleSearch}

                placeholder="Search members, family code, mobile, Aadhaar..."

            />


            {/* ================================
                Table
            ================================= */}

            <CommonTable

                columns={columns}

                data={members}

                loading={loading}

                renderActions={(member) => (

                    <ActionButtons

                        onEdit={
                            canEdit()
                                ? () => {
                                    setSelectedMember(member);
                                    setShowModal(true);
                                }
                                : undefined
                        }

                        onDelete={
                            canDelete()
                                ? () => {
                                    setDeleteId(member.id);
                                    setShowDeleteDialog(true);
                                }
                                : undefined
                        }

                    />

                )}

            />


            {/* ================================
                Pagination
            ================================= */}

            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={handlePageChange}

            />


            {/* ================================
                Member Modal
            ================================= */}

            <CommonModal

                show={showModal}

                title={
                    selectedMember
                        ? "Edit Member"
                        : "Add Member"
                }

                onClose={() => {

                    setShowModal(false);

                    setSelectedMember(null);

                }}

            >

                <MemberForm

                    member={selectedMember}

                    onSuccess={() => {

                        loadMembers();

                        setShowModal(false);

                        setSelectedMember(null);

                    }}

                    onClose={() => {

                        setShowModal(false);

                        setSelectedMember(null);

                    }}

                />

            </CommonModal>


            {/* ================================
                Delete Confirmation
            ================================= */}

            <ConfirmDialog

                show={showDeleteDialog}

                title="Delete Member"

                message={
                    "Are you sure you want to delete this member?"
                }

                onConfirm={deleteMemberRecord}

                onCancel={() => {

                    setDeleteId(null);

                    setShowDeleteDialog(false);

                }}

            />

        </div>

    );

}

export default MemberList;