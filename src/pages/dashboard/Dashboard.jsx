import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeroBanner from "./HeroBanner";
import { getDashboard } from "../../services/dashboardService";
import DashboardCard from "./DashboardCard";

function Dashboard() {

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load dashboard");

        }

    };

    return (

        <div className="container-fluid">

            <div className="container-fluid">

                        <HeroBanner />

                        {/* Dashboard Cards */}

                    </div>
            <h2 className="mb-4">

                📊 Shringirishi Census Dashboard

            </h2>

            <div className="row">

                <DashboardCard
                    title="States"
                    value={dashboard.totalStates}
                    icon="🏛"
                    color="primary"
                    path="/states"
                />

                <DashboardCard
                    title="Districts"
                    value={dashboard.totalDistricts}
                    icon="📍"
                    color="success"
                    path="/districts"
                />

                <DashboardCard
                    title="Villages"
                    value={dashboard.totalVillages}
                    icon="🌾"
                    color="warning"
                    path="/villages"
                />

                <DashboardCard
                    title="Families"
                    value={dashboard.totalFamilies}
                    icon="👨‍👩‍👧"
                    color="danger"
                    path="/families"
                />

                <DashboardCard
                    title="Members"
                    value={dashboard.totalMembers}
                    icon="👤"
                    color="info"
                    path="/members"
                />

                <DashboardCard
                    title="Active"
                    value={dashboard.activeMembers}
                    icon="✅"
                    color="secondary"
                    path="/members"
                />

            </div>

        </div>

    );

}

export default Dashboard;