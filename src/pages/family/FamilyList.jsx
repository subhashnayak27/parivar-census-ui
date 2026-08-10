import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { canCreate, canEdit, canDelete } from "../../utils/roleUtils";
import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";
import SearchBox from "../../components/common/SearchBox";
import Pagination from "../../components/common/Pagination";

import FamilyForm from "./FamilyForm";

import {
    getFamilies,
    searchFamilies,
    deleteFamily
} from "../../services/familyService";

function FamilyList() {

    const [families, setFamilies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedFamily, setSelectedFamily] = useState(null);

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

                renderActions={(family) => (

                    <ActionButtons
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