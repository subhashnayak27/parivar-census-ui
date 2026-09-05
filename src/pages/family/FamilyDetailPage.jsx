import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFamilyById } from "../../services/familyService";
import { getMembersByFamilyId } from "../../services/memberService";

function FamilyDetailPage() {
    const { familyId } = useParams();
    const navigate = useNavigate();

    const [family, setFamily] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFamilyDetails = async () => {
            try {
                setLoading(true);

                const [familyResponse, membersResponse] = await Promise.all([
                    getFamilyById(familyId),
                    getMembersByFamilyId(familyId)
                ]);

                setFamily(familyResponse.data.data);
                setMembers(membersResponse.data.data || []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load family details.");
            } finally {
                setLoading(false);
            }
        };

        if (familyId) {
            loadFamilyDetails();
        }
    }, [familyId]);

    if (loading) {
        return <div className="container py-4">Loading family details...</div>;
    }

    if (!family) {
        return <div className="container py-4">Family not found.</div>;
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Family Details</h3>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/families")}
                >
                    Back to Families
                </button>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-6"><strong>ID:</strong> {family.id}</div>
                        <div className="col-md-6"><strong>Family Code:</strong> {family.familyCode}</div>
                        <div className="col-md-6"><strong>Family Head:</strong> {family.familyHeadName}</div>
                        <div className="col-md-6"><strong>Mobile:</strong> {family.mobileNo}</div>
                        <div className="col-md-6"><strong>State:</strong> {family.stateName}</div>
                        <div className="col-md-6"><strong>District:</strong> {family.districtName}</div>
                        <div className="col-md-6"><strong>Village:</strong> {family.villageName}</div>
                        <div className="col-md-6"><strong>Ration Card:</strong> {family.rationCardNo}</div>
                        <div className="col-12"><strong>Address:</strong> {family.address}</div>
                        <div className="col-md-6"><strong>Status:</strong> {family.active ? "Active" : "Inactive"}</div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Family Members</h5>
                </div>
                <div className="card-body p-0">
                    {members.length === 0 ? (
                        <div className="p-3">No members found for this family.</div>
                    ) : (
                        <table className="table table-bordered mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Member Code</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Relationship</th>
                                    <th>Mobile</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.id}>
                                        <td>{member.id}</td>
                                        <td>{member.memberCode}</td>
                                        <td>{`${member.firstName || ""} ${member.lastName || ""}`.trim()}</td>
                                        <td>{member.gender}</td>
                                        <td>{member.relationship}</td>
                                        <td>{member.mobileNo}</td>
                                        <td>{member.active ? "Active" : "Inactive"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FamilyDetailPage;
