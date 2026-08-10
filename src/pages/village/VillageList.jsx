import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { canCreate, canEdit,canDelete } from "../../utils/roleUtils";
import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";
import SearchBox from "../../components/common/SearchBox";
import Pagination from "../../components/common/Pagination";

import VillageForm from "./VillageForm";

import {
    getVillages,
    searchVillages,
    deleteVillage
} from "../../services/villageService";

function VillageList() {

    const [villages, setVillages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedVillage, setSelectedVillage] = useState(null);

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
    // Load Villages
    // ================================

    useEffect(() => {

        loadVillages();

    }, [currentPage, searchKeyword]);


    const loadVillages = async () => {

        try {

            setLoading(true);

            const page = currentPage - 1;

            let response;

            if (searchKeyword.trim()) {

                response = await searchVillages({

                    keyword: searchKeyword.trim(),

                    page: page,

                    size: pageSize,

                    sortBy: "id",

                    direction: "asc"

                });

            } else {

                response = await getVillages({

                    page: page,

                    size: pageSize,

                    sortBy: "id",

                    direction: "asc"

                });

            }

            const pageData = response.data.data;

            setVillages(pageData.content);

            setTotalPages(pageData.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load villages");

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
            field: "districtName",
            header: "District"
        },

        {
            field: "villageCode",
            header: "Village Code"
        },

        {
            field: "villageName",
            header: "Village Name"
        },

        {
            field: "postalCode",
            header: "Postal Code"
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

    const deleteVillageRecord = async () => {

        try {

            await deleteVillage(deleteId);

            toast.success(
                "Village deleted successfully"
            );

            await loadVillages();

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to delete village"
            );

        } finally {

            setDeleteId(null);

            setShowDeleteDialog(false);

        }

    };


    return (

        <div className="container-fluid">

            <PageHeader
                title="Village Management"
                buttonText="Add Village"
                onAdd={() => {
                    setSelectedVillage(null);
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

                placeholder="Search village, code, district..."

            />


            {/* ================================
                Table
            ================================= */}

            <CommonTable
                columns={columns}
                data={villages}
                loading={loading}
                renderActions={(village) => (

                    <ActionButtons

                        onEdit={
                            canEdit()
                                ? () => {
                                    setSelectedVillage(village);
                                    setShowModal(true);
                                }
                                : undefined
                        }

                        onDelete={
                            canDelete()
                                ? () => {
                                    setDeleteId(village.id);
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
                    selectedVillage
                        ? "Edit Village"
                        : "Add Village"
                }

                onClose={() => {

                    setShowModal(false);

                    setSelectedVillage(null);

                }}

            >

                <VillageForm

                    village={selectedVillage}

                    onSuccess={() => {

                        loadVillages();

                        setShowModal(false);

                        setSelectedVillage(null);

                    }}

                    onClose={() => {

                        setShowModal(false);

                        setSelectedVillage(null);

                    }}

                />

            </CommonModal>


            {/* ================================
                Delete Confirmation
            ================================= */}

            <ConfirmDialog

                show={showDeleteDialog}

                title="Delete Village"

                message={
                    "Are you sure you want to delete this village?"
                }

                onConfirm={deleteVillageRecord}

                onCancel={() => {

                    setDeleteId(null);

                    setShowDeleteDialog(false);

                }}

            />

        </div>

    );

}

export default VillageList;