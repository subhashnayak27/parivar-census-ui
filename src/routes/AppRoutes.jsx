import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";

import StateList from "../pages/state/StateList";
import DistrictList from "../pages/district/DistrictList";
import VillageList from "../pages/village/VillageList";
import FamilyList from "../pages/family/FamilyList";
import MemberList from "../pages/member/MemberList";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<MainLayout />}>

                    <Route index element={<Dashboard />} />

                    <Route path="state" element={<StateList />} />

                    <Route path="district" element={<DistrictList />} />

                    <Route path="village" element={<VillageList />} />

                    <Route path="family" element={<FamilyList />} />

                    <Route path="member" element={<MemberList />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;