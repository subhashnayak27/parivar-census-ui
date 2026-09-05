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
    exportMembers,
    getMemberById
} from "../../services/memberService";

function MemberList() {

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedMember, setSelectedMember] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [selectedMemberIds, setSelectedMemberIds] = useState([]);

    const [viewedMember, setViewedMember] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

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

    const handleToggleMemberSelection = (memberId) => {

        setSelectedMemberIds((currentSelected) => {

            if (currentSelected.includes(memberId)) {
                return currentSelected.filter((id) => id !== memberId);
            }

            return [...currentSelected, memberId];
        });

    };

    const handleSelectAllVisibleMembers = () => {

        const allVisibleSelected =
            members.length > 0 &&
            members.every((member) => selectedMemberIds.includes(member.id));

        if (allVisibleSelected) {
            setSelectedMemberIds((currentSelected) =>
                currentSelected.filter(
                    (id) => !members.some((member) => member.id === id)
                )
            );
            return;
        }

        setSelectedMemberIds((currentSelected) => {
            const nextSelected = new Set(currentSelected);

            members.forEach((member) => nextSelected.add(member.id));

            return [...nextSelected];
        });

    };

    const handleExport = async () => {

        try {

            const payload = selectedMemberIds.length > 0
                ? { memberIds: selectedMemberIds }
                : {};

            if (selectedMemberIds.length === 0) {
                toast.info("No rows selected. Exporting all members.");
            }

            const response = await exportMembers(payload.memberIds || []);

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

    const handleViewMember = async (member) => {
        try {
            const response = await getMemberById(member.id);
            setViewedMember(response.data.data);
            setShowViewModal(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load member details.");
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

                selectable={true}

                selectedRows={selectedMemberIds}

                onRowSelect={handleToggleMemberSelection}

                onSelectAll={handleSelectAllVisibleMembers}

                renderActions={(member) => (

                    <ActionButtons
                        onView={() => handleViewMember(member)}

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

            <CommonModal
                show={showViewModal}
                title="Member Details"
                onClose={() => {
                    setShowViewModal(false);
                    setViewedMember(null);
                }}
            >
                {viewedMember && (
                    <div className="row g-3">
                        <div className="col-md-6"><strong>ID:</strong> {viewedMember.id}</div>
                        <div className="col-md-6"><strong>Member Code:</strong> {viewedMember.memberCode}</div>
                        <div className="col-md-6"><strong>First Name:</strong> {viewedMember.firstName}</div>
                        <div className="col-md-6"><strong>Last Name:</strong> {viewedMember.lastName}</div>
                        <div className="col-md-6"><strong>Gender:</strong> {viewedMember.gender}</div>
                        <div className="col-md-6"><strong>Relationship:</strong> {viewedMember.relationship}</div>
                        <div className="col-md-6"><strong>Marital Status:</strong> {viewedMember.maritalStatus}</div>
                        <div className="col-md-6"><strong>Date of Birth:</strong> {viewedMember.dateOfBirth}</div>
                        <div className="col-md-6"><strong>Mobile:</strong> {viewedMember.mobileNo}</div>
                        <div className="col-md-6"><strong>Aadhaar:</strong> {viewedMember.aadhaarNo}</div>
                        <div className="col-md-6"><strong>Occupation:</strong> {viewedMember.occupation}</div>
                        <div className="col-md-6"><strong>Education:</strong> {viewedMember.education}</div>
                        <div className="col-md-6"><strong>Gotra:</strong> {viewedMember.gotra}</div>
                        <div className="col-md-6"><strong>Pata:</strong> {viewedMember.pata}</div>
                        <div className="col-md-6"><strong>Kuldevi:</strong> {viewedMember.kuldevi}</div>
                        <div className="col-md-6"><strong>Family:</strong> {viewedMember.familyHeadName} ({viewedMember.familyCode})</div>
                        <div className="col-md-6"><strong>Village:</strong> {viewedMember.villageName}</div>
                        <div className="col-md-6"><strong>District:</strong> {viewedMember.districtName}</div>
                        <div className="col-md-6"><strong>State:</strong> {viewedMember.stateName}</div>
                        <div className="col-md-6"><strong>Status:</strong> {viewedMember.active ? "Active" : "Inactive"}</div>
                    </div>
                )}
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