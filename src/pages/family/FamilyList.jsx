import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";

import FamilyForm from "./FamilyForm";

import {
    getFamilies,
    deleteFamily
} from "../../services/familyService";

function FamilyList() {

    const [families, setFamilies] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadFamilies();
    }, []);

    const loadFamilies = async () => {

        try {

            const response = await getFamilies();

            setFamilies(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load families");

        }

    };

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

    const deleteFamilyRecord = async () => {

        try {

            await deleteFamily(deleteId);

            toast.success("Family deleted successfully");

            loadFamilies();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete family");

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
            />

            <CommonTable

                columns={columns}

                data={families}

                renderActions={(family) => (

                    <ActionButtons

                        onEdit={() => {

                            setSelectedFamily(family);

                            setShowModal(true);

                        }}

                        onDelete={() => {

                            setDeleteId(family.id);

                            setShowDeleteDialog(true);

                        }}

                    />

                )}

            />

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