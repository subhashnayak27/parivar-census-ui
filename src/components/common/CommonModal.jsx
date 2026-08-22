import { useEffect } from "react";

function CommonModal({
    show,
    title,
    onClose,
    children
}) {

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        if (show) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [show, onClose]);

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
                            type="button"
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