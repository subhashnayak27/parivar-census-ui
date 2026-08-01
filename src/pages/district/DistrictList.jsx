import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";

import DistrictForm from "./DistrictForm";

import {
    getDistricts,
    getDistrictById,
    deleteDistrict
} from "../../services/districtService";

function DistrictList() {

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadDistricts();
    }, []);

    const loadDistricts = async () => {

        try {

            const response = await getDistricts();

            setDistricts(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load districts");

        }

    };

    const handleEdit = async (id) => {

        try {

            const response = await getDistrictById(id);

            setSelectedDistrict(response.data.data);

            setShowModal(true);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load district details");

        }

    };

    const columns = [

        {
            field: "id",
            header: "ID"
        },

        {
            field: "stateName",
            header: "State"
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
            field: "active",
            header: "Status",
            render: (row) => (
                <StatusBadge active={row.active} />
            )
        }

    ];

    const deleteDistrictRecord = async () => {

        try {

            await deleteDistrict(deleteId);

            toast.success("District deleted successfully");

            loadDistricts();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete district");

        } finally {

            setDeleteId(null);

            setShowDeleteDialog(false);

        }

    };

    return (

        <div className="container-fluid">

            <PageHeader
                title="District Management"
                buttonText="Add District"
                onAdd={() => {

                    setSelectedDistrict(null);

                    setShowModal(true);

                }}
            />

            <CommonTable
                columns={columns}
                data={districts}
                renderActions={(district) => (

                    <ActionButtons

                        onEdit={() => handleEdit(district.id)}

                        onDelete={() => {

                            setDeleteId(district.id);

                            setShowDeleteDialog(true);

                        }}

                    />

                )}
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

                    onSuccess={() => {

                        loadDistricts();

                        setShowModal(false);

                        setSelectedDistrict(null);

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

                    setDeleteId(null);

                    setShowDeleteDialog(false);

                }}

            />

        </div>

    );

}

export default DistrictList;