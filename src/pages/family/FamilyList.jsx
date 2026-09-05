import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { canCreate, canEdit, canDelete, canExport } from "../../utils/roleUtils";
import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";
import SearchBox from "../../components/common/SearchBox";
import Pagination from "../../components/common/Pagination";
import ExcelToolbar from "../../components/common/ExcelToolbar";

import FamilyForm from "./FamilyForm";

import {
    getFamilies,
    searchFamilies,
    deleteFamily,
    exportFamilyMembers,
    getFamilyById
} from "../../services/familyService";

function FamilyList() {

    const navigate = useNavigate();
 
    const [families, setFamilies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedFamily, setSelectedFamily] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [selectedFamilyIds, setSelectedFamilyIds] = useState([]);

    const [viewedFamily, setViewedFamily] = useState(null);
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
    // Load Families
    // ================================

    useEffect(() => {

        loadFamilies();

    }, [currentPage, searchKeyword]);


    const loadFamilies = async () => {

        try {

            setLoading(true);

            const page = currentPage - 1;

            let response;

            if (searchKeyword.trim()) {

                response = await searchFamilies({

                    keyword: searchKeyword.trim(),

                    page: page,

                    size: pageSize,

                    sortBy: "id",

                    direction: "asc"

                });

            } else {

                response = await getFamilies({

                    page: page,

                    size: pageSize,

                    sortBy: "id",

                    direction: "asc"

                });

            }

            const pageData = response.data.data;

            setFamilies(pageData.content);

            setTotalPages(pageData.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load families");

        } finally {

            setLoading(false);

        }

    };


    // ================================
    // Search
    // ================================

    const handleSearch = (value) => {

        setSearchKeyword(value);

        setCurrentPage(1);

    };


    // ================================
    // Pagination
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
            field: "villageName",
            header: "Village"
        },

        {
            field: "familyCode",
            header: "Family Code"
        },

        {
            field: "familyHeadName",
            header: "Head Name"
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
    // Export Family Members
    // ================================

    const handleToggleFamilySelection = (familyId) => {

        setSelectedFamilyIds((currentSelected) => {
            if (currentSelected.includes(familyId)) {
                return currentSelected.filter((id) => id !== familyId);
            }

            return [familyId];
        });

    };

    const handleSelectAllVisibleFamilies = () => {

        const allVisibleSelected =
            families.length > 0 &&
            families.every((family) => selectedFamilyIds.includes(family.id));

        if (allVisibleSelected) {
            setSelectedFamilyIds([]);
            return;
        }

        setSelectedFamilyIds(families.map((family) => family.id));

    };

    const handleExportFamilyMembers = async () => {

        if (selectedFamilyIds.length === 0) {
            toast.info("Please select a family to export members.");
            return;
        }

        const familyId = selectedFamilyIds[0];

        try {
            const response = await exportFamilyMembers(familyId);

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");
            link.href = url;
            link.download = `Family_${familyId}_Members.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
            toast.error("Failed to export family members.");
        }

    };

    const handleViewFamily = (family) => {
        navigate(`/families/${family.id}`);
    };

    // ================================
    // Delete
    // ================================

    const deleteFamilyRecord = async () => {

        try {

            await deleteFamily(deleteId);

            toast.success(
                "Family deleted successfully"
            );

            await loadFamilies();

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to delete family"
            );

        } finally {

            setDeleteId(null);

            setShowDeleteDialog(false);

        }

    };


    return (

        <div className="container-fluid">

            <PageHeader

                title="Family Management"

                buttonText="Add Family"

                onAdd={() => {
                    setSelectedFamily(null);
                    setShowModal(true);
                }}
                showButton={canCreate()}
            />


            {/* ================================
                Search
            ================================= */}

            <ExcelToolbar
                onExport={handleExportFamilyMembers}
                showUpload={false}
                showDownloadTemplate={false}
                showExport={canExport()}
            />

            <SearchBox

                value={searchKeyword}

                onChange={handleSearch}

                placeholder="Search family code, head name, village..."

            />


            {/* ================================
                Table
            ================================= */}

            <CommonTable

                columns={columns}

                data={families}

                loading={loading}

                selectable={true}

                selectedRows={selectedFamilyIds}

                onRowSelect={handleToggleFamilySelection}

                onSelectAll={handleSelectAllVisibleFamilies}

                renderActions={(family) => (

                    <ActionButtons
                        onView={() => handleViewFamily(family)}
                        onEdit={
                            canEdit()
                                ? () => {
                                    setSelectedFamily(family);
                                    setShowModal(true);
                                }
                                : undefined
                        }

                        onDelete={
                            canDelete()
                                ? () => {
                                    setDeleteId(family.id);
                                    setShowDeleteDialog(true);
                                }
                                : undefined
                        }
                    />

                )}

            />

            {
                /* ================================
                Pagination
            ================================= */}

            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={handlePageChange}

            />


            {/* ================================
                Modal
            ================================= */}

            <CommonModal

                show={showModal}

                title={
                    selectedFamily
                        ? "Edit Family"
                        : "Add Family"
                }

                onClose={() => {

                    setShowModal(false);

                    setSelectedFamily(null);

                }}

            >

                <FamilyForm

                    family={selectedFamily}

                    onSuccess={() => {

                        loadFamilies();

                        setShowModal(false);

                        setSelectedFamily(null);

                    }}

                    onClose={() => {

                        setShowModal(false);

                        setSelectedFamily(null);

                    }}

                />

            </CommonModal>

            <CommonModal
                show={showViewModal}
                title="Family Details"
                onClose={() => {
                    setShowViewModal(false);
                    setViewedFamily(null);
                }}
            >
                {viewedFamily && (
                    <div className="row g-3">
                        <div className="col-md-6"><strong>ID:</strong> {viewedFamily.id}</div>
                        <div className="col-md-6"><strong>Family Code:</strong> {viewedFamily.familyCode}</div>
                        <div className="col-md-6"><strong>Family Head:</strong> {viewedFamily.familyHeadName}</div>
                        <div className="col-md-6"><strong>Mobile:</strong> {viewedFamily.mobileNo}</div>
                        <div className="col-md-6"><strong>State:</strong> {viewedFamily.stateName}</div>
                        <div className="col-md-6"><strong>District:</strong> {viewedFamily.districtName}</div>
                        <div className="col-md-6"><strong>Village:</strong> {viewedFamily.villageName}</div>
                        <div className="col-md-6"><strong>Ration Card:</strong> {viewedFamily.rationCardNo}</div>
                        <div className="col-12"><strong>Address:</strong> {viewedFamily.address}</div>
                        <div className="col-md-6"><strong>Status:</strong> {viewedFamily.active ? "Active" : "Inactive"}</div>
                    </div>
                )}
            </CommonModal>


            {/* ================================
                Delete Confirmation
            ================================= */}

            <ConfirmDialog

                show={showDeleteDialog}

                title="Delete Family"

                message="Are you sure you want to delete this family?"

                onConfirm={deleteFamilyRecord}

                onCancel={() => {

                    setDeleteId(null);

                    setShowDeleteDialog(false);

                }}

            />

        </div>

    );

}

export default FamilyList;