function PageHeader({
    title,
    buttonText,
    onAdd,
    showButton = true
}) {

    return (
        <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="page-title mb-0">
                {title}
            </h2>

            {showButton && (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onAdd}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    {buttonText}
                </button>
            )}

        </div>
    );
}

export default PageHeader;