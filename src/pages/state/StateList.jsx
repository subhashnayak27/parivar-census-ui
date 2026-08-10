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
import StateForm from "./StateForm";

import {
    getStates,
    searchStates,
    deleteState
} from "../../services/stateService";

function StateList() {

    const [states, setStates] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedState, setSelectedState] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    // Search
    const [search, setSearch] = useState("");

   useEffect(() => {

       const timer = setTimeout(() => {
           loadStates();
       }, 400);

       return () => clearTimeout(timer);

   }, [currentPage, search]);

    const loadStates = async () => {

        try {

            setLoading(true);

            const response = search.trim()
                ? await searchStates({
                    keyword: search.trim(),
                    page: currentPage - 1,
                    size: pageSize,
                    sortBy: "id",
                    direction: "asc"
                })
                : await getStates({
                    page: currentPage - 1,
                    size: pageSize,
                    sortBy: "id",
                    direction: "asc"
                });

            const pageData = response.data.data;

            setStates(pageData.content);
            setTotalPages(pageData.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load states");

        } finally {

            setLoading(false);

        }
    };

    const handleSearch = (value) => {

        setSearch(value);
        setCurrentPage(1);

    };

    const deleteStateRecord = async () => {

        try {

            await deleteState(deleteId);

            toast.success("State deleted successfully");

            await loadStates();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete state");

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
            field: "stateCode",
            header: "State Code"
        },

        {
            field: "stateName",
            header: "State Name"
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
                   title="State Management"
                   buttonText="Add State"
                   onAdd={() => {
                       setSelectedState(null);
                       setShowModal(true);
                   }}
                   showButton={canCreate()}
               />

            <SearchBox
                value={search}
                onChange={handleSearch}
                placeholder="Search state..."
            />

            <CommonTable
                columns={columns}
                data={states}
                loading={loading}
                renderActions={(state) => (

                    <ActionButtons
                        onEdit={
                            canEdit()
                                ? () => {
                                    setSelectedState(state);
                                    setShowModal(true);
                                }
                                : undefined
                        }

                        onDelete={
                            canDelete()
                                ? () => {
                                    setDeleteId(state.id);
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
                    selectedState
                        ? "Edit State"
                        : "Add State"
                }
                onClose={() => {

                    setShowModal(false);
                    setSelectedState(null);

                }}
            >

                <StateForm

                    state={selectedState}

                    onSuccess={async () => {

                        setShowModal(false);
                        setSelectedState(null);

                        await loadStates();

                    }}

                    onClose={() => {

                        setShowModal(false);
                        setSelectedState(null);

                    }}

                />

            </CommonModal>

            <ConfirmDialog

                show={showDeleteDialog}

                title="Delete State"

                message="Are you sure you want to delete this state?"

                onConfirm={deleteStateRecord}

                onCancel={() => {

                    setShowDeleteDialog(false);
                    setDeleteId(null);

                }}

            />

        </div>

    );
}

export default StateList;