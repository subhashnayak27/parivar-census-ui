import { Link, useLocation } from "react-router-dom";
import { getCurrentRole } from "../utils/roleUtils";
import { useTranslation } from "react-i18next";
function Sidebar() {

    const { t, i18n } = useTranslation();
    const location = useLocation();
    const role = getCurrentRole();

    const menuItems = [
        {
            name: t("dashboard"),
            path: "/",
            icon: "bi-speedometer2"
        },
        {
            name: t("location.state"),
            path: "/states",
            icon: "bi-map"
        },
        {
            name: t("location.district"),
            path: "/districts",
            icon: "bi-building"
        },
        {
            name: t("location.village"),
            path: "/villages",
            icon: "bi-house-door"
        },
        {
            name: t("location.family"),
            path: "/families",
            icon: "bi-people"
        },
        {
            name: t("member.title"),
            path: "/members",
            icon: "bi-person"
        }
    ];

    // ================================
    // User Management
    // SUPER_ADMIN + ADMIN only
    // ================================

    if (
        role === "SUPER_ADMIN" ||
        role === "ADMIN"
    ) {
        menuItems.push({
            name: "User Management",
            path: "/users",
            icon: "bi-person-gear"
        });
    }

    return (

        <div className="bg-dark text-white vh-100">

            <div className="p-3 border-bottom">

                <h4 className="m-0">
                    Menu
                </h4>

            </div>

            <ul className="nav flex-column mt-3">

                {menuItems.map((item) => (

                    <li
                        className="nav-item"
                        key={item.path}
                    >

                        <Link
                            to={item.path}
                            className={`nav-link text-white px-4 py-3 ${
                                location.pathname === item.path
                                    ? "bg-primary"
                                    : ""
                            }`}
                        >

                            <i
                                className={`bi ${item.icon} me-2`}
                            ></i>

                            {item.name}

                        </Link>

                    </li>

                ))}

            </ul>

        </div>

    );
}

export default Sidebar;