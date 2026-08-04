import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import CommonTable from "../../components/common/CommonTable";
import CommonModal from "../../components/common/CommonModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ActionButtons from "../../components/common/ActionButtons";
import StatusBadge from "../../components/common/StatusBadge";
import { getMemberById } from "../../services/memberService";
import MemberForm from "./MemberForm";
import ExcelToolbar from "../../components/common/ExcelToolbar";
import { uploadMembers, downloadTemplate, exportMembers} from "../../services/memberService";
import { getMembers, deleteMember } from "../../services/memberService";

function MemberList() {

    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {

        loadMembers();

    }, []);

    const loadMembers = async () => {

        try {

            const response = await getMembers();

            setMembers(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load members");

        }

    };

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
    const handleDownloadTemplate = async () => {

        try {

            const response = await downloadTemplate();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = "Member_Bulk_Upload_Template.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.error(error);
            alert("Unable to download template.");
        }
    };
    const handleExport = async () => {

        try {

            const response = await exportMembers();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = "Members.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.error(error);
            alert("Export failed.");
        }
    };
    const handleUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        try {

            const response = await uploadMembers(file);

            alert(response.data.message);

            // Refresh member list
            loadMembers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message || "Upload failed."
            );
        }

        event.target.value = "";
    };
    const deleteMemberRecord = async () => {

        try {

            await deleteMember(deleteId);

            toast.success("Member deleted successfully");

            loadMembers();

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to delete member");

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
            />
            <ExcelToolbar
                onDownloadTemplate={handleDownloadTemplate}
                onUpload={handleUpload}
                onExport={handleExport}
            />
            <CommonTable

                columns={columns}

                data={members}

                renderActions={(member) => (

                    <ActionButtons

                        onEdit={() => {

                            setSelectedMember(member);

                            setShowModal(true);

                        }}

                        onDelete={() => {

                            setDeleteId(member.id);

                            setShowDeleteDialog(true);

                        }}

                    />

                )}

            />

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

            <ConfirmDialog

                show={showDeleteDialog}

                title="Delete Member"

                message="Are you sure you want to delete this member?"

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