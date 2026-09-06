import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
    logout,
    getFullName,
    getUsername
} from "../utils/tokenStorage";

function Navbar() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);

    const fullName = getFullName();
    const username = getUsername();
    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                setShowMenu(false);
            }

        };

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }

        };

        if (showMenu) {

            document.addEventListener(
                "keydown",
                handleKeyDown
            );

            document.addEventListener(
                "mousedown",
                handleClickOutside
            );

        }

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, [showMenu]);
    const handleLogout = () => {

        logout();

        navigate("/login", { replace: true });

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

            <div className="container-fluid">

                <span className="navbar-brand fw-bold">
                    👨‍👩‍👧‍👦 {t("appName")}
                </span>

                <div className="d-flex align-items-center">

                    <select
                        className="form-select form-select-sm me-3"
                        style={{ width: "120px" }}
                        value={i18n.language}
                        onChange={(e) => changeLanguage(e.target.value)}
                    >
                        <option value="en">
                            English
                        </option>

                        <option value="hi">
                            हिन्दी
                        </option>
                    </select>

                    <i className="bi bi-bell fs-4 text-white me-3"></i>

                    <div className="position-relative">

                        <button
                            type="button"
                            className="btn btn-primary d-flex align-items-center border-0"
                            onClick={() => setShowMenu(!showMenu)}
                        >

                            <i className="bi bi-person-circle fs-3 me-2"></i>

                            <span className="me-2">
                                {fullName || username || "User"}
                            </span>

                            <i className="bi bi-chevron-down"></i>

                        </button>

                        {showMenu && (

                            <div
                                className="position-absolute bg-white shadow rounded p-2"
                                style={{
                                    right: 0,
                                    top: "100%",
                                    minWidth: "200px",
                                    zIndex: 1050
                                }}
                            >

                                <div className="px-3 py-2">

                                    <div className="fw-bold">
                                        {fullName || username}
                                    </div>

                                    <small className="text-muted">
                                        {username}
                                    </small>

                                </div>

                                <hr className="my-1" />

                                <button
                                    type="button"
                                    className="btn btn-link text-danger text-decoration-none w-100 text-start px-3"
                                    onClick={handleLogout}
                                >

                                    <i className="bi bi-box-arrow-right me-2"></i>

                                    Logout

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;