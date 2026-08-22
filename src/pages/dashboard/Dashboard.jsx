import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeroBanner from "./HeroBanner";
import { getDashboard } from "../../services/dashboardService";
import DashboardCard from "./DashboardCard";
import { useTranslation } from "react-i18next";
function Dashboard() {
    const { t } = useTranslation();
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

                📊  {t("dashboardTitle")}

            </h2>

            <div className="row">

                <DashboardCard
                    title={t("location.state")}
                    value={dashboard.totalStates}
                    icon="🏛"
                    color="primary"
                    path="/states"
                />

                <DashboardCard
                    title={t("location.district")}
                    value={dashboard.totalDistricts}
                    icon="📍"
                    color="success"
                    path="/districts"
                />

                <DashboardCard
                    title={t("location.village")}
                    value={dashboard.totalVillages}
                    icon="🌾"
                    color="warning"
                    path="/villages"
                />

                <DashboardCard
                    title={t("location.family")}
                    value={dashboard.totalFamilies}
                    icon="👨‍👩‍👧"
                    color="danger"
                    path="/families"
                />

                <DashboardCard
                    title={t("member.title")}
                    value={dashboard.totalMembers}
                    icon="👤"
                    color="info"
                    path="/members"
                />

                <DashboardCard
                    title={t("status.active")}
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