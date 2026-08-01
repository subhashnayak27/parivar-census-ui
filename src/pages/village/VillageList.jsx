import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";

import VillageForm from "./VillageForm";

import {
    getVillages,
    deleteVillage
} from "../../services/villageService";

function VillageList() {

    const [villages, setVillages] = useState([]);

    const [selectedVillage, setSelectedVillage] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadVillages();
    }, []);

    const loadVillages = async () => {

        try {

            const response = await getVillages();

            setVillages(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load villages");

        }

    };

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

    const deleteVillageRecord = async () => {

        try {

            await deleteVillage(deleteId);

            toast.success("Village deleted successfully");

            await loadVillages();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete village");

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

            />

            <CommonTable

                columns={columns}

                data={villages}

                renderActions={(village) => (

                    <ActionButtons

                        onEdit={() => {

                            setSelectedVillage(village);

                            setShowModal(true);

                        }}

                        onDelete={() => {

                            setDeleteId(village.id);

                            setShowDeleteDialog(true);

                        }}

                    />

                )}

            />

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

            <ConfirmDialog

                show={showDeleteDialog}

                title="Delete Village"

                message="Are you sure you want to delete this village?"

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