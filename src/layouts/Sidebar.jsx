import { Link, useLocation } from "react-router-dom";
import { getCurrentRole } from "../utils/roleUtils";

function Sidebar() {

    const location = useLocation();
    const role = getCurrentRole();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: "bi-speedometer2"
        },
        {
            name: "States",
            path: "/states",
            icon: "bi-map"
        },
        {
            name: "Districts",
            path: "/districts",
            icon: "bi-building"
        },
        {
            name: "Villages",
            path: "/villages",
            icon: "bi-house-door"
        },
        {
            name: "Families",
            path: "/families",
            icon: "bi-people"
        },
        {
            name: "Members",
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