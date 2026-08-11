function ActionButtons({
    onEdit,
    onDelete,
    onStatus,
    isActive
}) {

    return (
        <div className="d-flex gap-2">

            {onEdit && (
                <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={onEdit}
                    title="Edit"
                >
                    <i className="bi bi-pencil"></i>
                </button>
            )}

            {onStatus && (
                <button
                    type="button"
                    className={
                        isActive
                            ? "btn btn-secondary btn-sm"
                            : "btn btn-success btn-sm"
                    }
                    onClick={onStatus}
                    title={
                        isActive
                            ? "Deactivate"
                            : "Activate"
                    }
                >
                    <i
                        className={
                            isActive
                                ? "bi bi-person-x"
                                : "bi bi-person-check"
                        }
                    ></i>
                </button>
            )}

            {onDelete && (
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={onDelete}
                    title="Delete"
                >
                    <i className="bi bi-trash"></i>
                </button>
            )}

        </div>
    );
}

export default ActionButtons;