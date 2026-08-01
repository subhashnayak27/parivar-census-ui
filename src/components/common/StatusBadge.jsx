function StatusBadge({ active }) {

    return active ? (

        <span className="badge bg-success">
            Active
        </span>

    ) : (

        <span className="badge bg-danger">
            Inactive
        </span>

    );

}

export default StatusBadge;