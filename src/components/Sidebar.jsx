import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: "bi-speedometer2" },
        { name: "State", path: "/state", icon: "bi-map" },
        { name: "District", path: "/district", icon: "bi-building" },
        { name: "Village", path: "/village", icon: "bi-house-door" },
        { name: "Family", path: "/family", icon: "bi-people" },
        { name: "Member", path: "/member", icon: "bi-person" }
    ];

    return (
        <div className="bg-dark text-white vh-100">

            <div className="p-3 border-bottom">
                <h4 className="m-0">Menu</h4>
            </div>

            <ul className="nav flex-column mt-3">

                {menuItems.map((item) => (

                    <li className="nav-item" key={item.path}>

                        <Link
                            to={item.path}
                            className={`nav-link text-white px-4 py-3 ${
                                location.pathname === item.path ? "bg-primary" : ""
                            }`}
                        >
                            <i className={`bi ${item.icon} me-2`}></i>

                            {item.name}
                        </Link>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default Sidebar;