function ActionButtons({ onEdit, onDelete }) {

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