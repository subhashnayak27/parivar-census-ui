import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserList from "../pages/users/UserList";
import Login from "../pages/login/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import StateList from "../pages/state/StateList";
import DistrictList from "../pages/district/DistrictList";
import VillageList from "../pages/village/VillageList";
import FamilyList from "../pages/family/FamilyList";
import MemberList from "../pages/member/MemberList";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Public */}
                <Route  path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password"  element={<ForgotPassword />}/>
                <Route path="/reset-password"  element={<ResetPassword />}/>
                {/* Protected */}
                <Route element={<ProtectedRoute />}>

                    {/* Common application layout */}
                    <Route element={<MainLayout />}>

                        <Route
                            index
                            element={<Dashboard />}
                        />

                        <Route
                            path="states"
                            element={<StateList />}
                        />

                        <Route
                            path="districts"
                            element={<DistrictList />}
                        />

                        <Route
                            path="villages"
                            element={<VillageList />}
                        />

                        <Route
                            path="families"
                            element={<FamilyList />}
                        />

                        <Route
                            path="members"
                            element={<MemberList />}
                        />

                         <Route
                             path="users"element={<UserList />}
                         />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;