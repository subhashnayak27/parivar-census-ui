function ConfirmDialog({
    show,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Delete"
}) {

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog modal-sm">

                <div className="modal-content">

                    <div className="modal-header bg-danger text-white">

                        <h5 className="modal-title">

                            <i className="bi bi-exclamation-triangle-fill me-2"></i>

                            {title}

                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>{message}</p>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ConfirmDialog;