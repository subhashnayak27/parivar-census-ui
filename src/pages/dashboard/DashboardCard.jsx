import { useNavigate } from "react-router-dom";

function DashboardCard({

    title,
    value,
    icon,
    color,
    path

}) {

    const navigate = useNavigate();

    return (

        <div className="col-md-4 col-lg-2 mb-3">

            <div
                className={`card text-white bg-${color} shadow`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(path)}
            >

                <div className="card-body text-center">

                    <h1>{icon}</h1>

                    <h5>{title}</h5>

                    <h3>{value}</h3>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;