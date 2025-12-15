import {createBrowserRouter, Navigate, Outlet,} from "react-router-dom";

import Layout from "@/layout/Layout.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import { useAuth } from "@/context/AuthContext";

function RequireAuth() {
    // TODO
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>;
}

// Wrapper para usar Layout + Outlet
function LayoutWrapper() {
    return (
        <Layout>
            <Outlet/>
        </Layout>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWrapper/>,
        children: [
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                element: <RequireAuth/>,
                children: [
                    {
                        index: true, // "/"
                        element: <HomePage/>,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace/>,
    },
]);