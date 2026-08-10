import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { canCreate, canEdit,canDelete } from "../../utils/roleUtils";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";
import Pagination from "../../components/common/Pagination";
import SearchBox from "../../components/common/SearchBox";

import DistrictForm from "./DistrictForm";

import {
    getDistricts,
    searchDistricts,
    deleteDistrict
} from "../../services/districtService";

function DistrictList() {

    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState("");

    useEffect(() => {

        const timer = setTimeout(() => {
            loadDistricts();
        }, 400);

        return () => clearTimeout(timer);

    }, [currentPage, search]);

    const loadDistricts = async () => {

        try {

            setLoading(true);

            const response = search.trim()
                ? await searchDistricts({
                    keyword: search.trim(),
                    page: currentPage - 1,
                    size: pageSize,
                    sortBy: "id",
                    direction: "asc"
                })
                : await getDistricts({
                    page: currentPage - 1,
                    size: pageSize,
                    sortBy: "id",
                    direction: "asc"
                });

            const pageData = response.data.data;

            setDistricts(pageData.content);
            setTotalPages(pageData.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load districts");

        } finally {

            setLoading(false);

        }
    };

    const handleSearch = (value) => {

        setSearch(value);
        setCurrentPage(1);

    };

    const deleteDistrictRecord = async () => {

        try {

            await deleteDistrict(deleteId);

            toast.success("District deleted successfully");

            await loadDistricts();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete district");

        } finally {

            setDeleteId(null);
            setShowDeleteDialog(false);

        }
    };

    const columns = [

        {
            field: "id",
            header: "ID"
        },

        {
            field: "districtCode",
            header: "District Code"
        },

        {
            field: "districtName",
            header: "District Name"
        },

        {
            field: "stateName",
            header: "State"
        },

        {
            field: "active",
            header: "Status",
            render: (row) => (
                <StatusBadge active={row.active} />
            )
        }

    ];

    return (

        <div className="container-fluid">

            <PageHeader
                title="District Management"
                buttonText="Add District"
                onAdd={() => {

                    setSelectedDistrict(null);
                    setShowModal(true);
                }}
                showButton={canCreate()}
            />

            <SearchBox
                value={search}
                onChange={handleSearch}
                placeholder="Search district..."
            />

            <CommonTable
                columns={columns}
                data={districts}
                loading={loading}
                renderActions={(district) => (

                    <ActionButtons
                        onEdit={
                            canEdit()
                                ? () => {
                                    setSelectedDistrict(district);
                                    setShowModal(true);
                                }
                                : undefined
                        }

                        onDelete={
                            canDelete()
                                ? () => {
                                    setDeleteId(district.id);
                                    setShowDeleteDialog(true);
                                }
                                : undefined
                        }
                    />

                )}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <CommonModal
                show={showModal}
                title={
                    selectedDistrict
                        ? "Edit District"
                        : "Add District"
                }
                onClose={() => {

                    setShowModal(false);
                    setSelectedDistrict(null);

                }}
            >

                <DistrictForm

                    district={selectedDistrict}

                    onSuccess={async () => {

                        setShowModal(false);
                        setSelectedDistrict(null);

                        await loadDistricts();

                    }}

                    onClose={() => {

                        setShowModal(false);
                        setSelectedDistrict(null);

                    }}

                />

            </CommonModal>

            <ConfirmDialog
                show={showDeleteDialog}
                title="Delete District"
                message="Are you sure you want to delete this district?"
                onConfirm={deleteDistrictRecord}
                onCancel={() => {

                    setShowDeleteDialog(false);
                    setDeleteId(null);

                }}
            />

        </div>
    );
}

export default DistrictList;