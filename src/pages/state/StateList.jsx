import StateForm from "./StateForm";
import { useEffect, useState } from "react";
import { getStates } from "../../services/stateService";

function StateList() {

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        loadStates();
    }, []);
    const loadStates = async () => {
        try {

            const response = await getStates();

            console.log(response.data);

            setStates(response.data.data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="page-title">
                    State Management
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedState(null);
                        setShowModal(true);
                    }}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add State
                </button>

            </div>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>State Code</th>
                        <th>State Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {states.map((state) => (

                        <tr key={state.id}>

                            <td>{state.id}</td>

                            <td>{state.stateCode}</td>

                            <td>{state.stateName}</td>

                            <td>

                                {state.active ? (
                                    <span className="badge bg-success">
                                        Active
                                    </span>
                                ) : (
                                    <span className="badge bg-danger">
                                        Inactive
                                    </span>
                                )}

                            </td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setSelectedState(state);
                                        setShowModal(true);}}>
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button className="btn btn-danger btn-sm">
                                    <i className="bi bi-trash"></i>
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
{
    showModal && (

        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            {selectedState ? "Edit State" : "Add State"}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                setShowModal(false);
                                setSelectedState(null);
                            }}
                        ></button>

                    </div>

                    <div className="modal-body">

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

                    </div>
                </div>

            </div>

        </div>

    )
}
        </div>
    );

}

export default StateList;