function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

            <div className="container-fluid">

                <span className="navbar-brand fw-bold">
                    👨‍👩‍👧‍👦 Shringirishi Census System
                </span>

                <div className="d-flex align-items-center">

                    <input
                        className="form-control me-3"
                        style={{ width: "250px" }}
                        placeholder="Search..."
                    />

                    <i className="bi bi-bell fs-4 text-white me-3"></i>

                    <i className="bi bi-person-circle fs-3 text-white"></i>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;