import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { ComponentChildrenProps } from "../types/types";

const AdminRouteWrapper = ({ children }: ComponentChildrenProps) => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Authenticating...</div>;

    if (!user) return <Navigate to="/sign-in" replace />;

    const role = user.publicMetadata?.userRole;

    if (role !== "admin") return <div>Not authorized.</div>;

    return children
};

export default AdminRouteWrapper;