import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";

import StateForm from "./StateForm";

import {
    getStates,
    deleteState
} from "../../services/stateService";

function StateList() {

    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedState, setSelectedState] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = async () => {

        try {

            setLoading(true);

            const response = await getStates();

            setStates(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load states");

        } finally {

            setLoading(false);

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

    return (

        <div className="container-fluid">

            <PageHeader
                title="State Management"
                buttonText="Add State"
                onAdd={() => {

                    setSelectedState(null);
                    setShowModal(true);

                }}
            />

            <CommonTable

                columns={columns}

                data={states}

                loading={loading}

                renderActions={(state) => (

                    <ActionButtons

                        onEdit={() => {

                            setSelectedState(state);
                            setShowModal(true);

                        }}

                        onDelete={() => {

                            setDeleteId(state.id);
                            setShowDeleteDialog(true);

                        }}

                    />

                )}

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

                    onSuccess={() => {

                        loadStates();

                        setShowModal(false);
                        setSelectedState(null);

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