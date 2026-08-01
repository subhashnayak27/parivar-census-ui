function ActionButtons({ onEdit, onDelete }) {

    return (

        <>

            <button
                className="btn btn-warning btn-sm me-2"
                onClick={onEdit}
            >
                <i className="bi bi-pencil"></i>
            </button>

            <button
                className="btn btn-danger btn-sm"
                onClick={onDelete}
            >
                <i className="bi bi-trash"></i>
            </button>

        </>

    );

}

export default ActionButtons;