function CommonModal({
    show,
    title,
    onClose,
    children
}) {

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            {title}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        {children}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CommonModal;