import { useUser } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type WrapperProps = {
    children: ReactNode;
};

const AdminRouteWrapper = ({ children }: WrapperProps) => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Authenticating...</div>;

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    const role = user.publicMetadata?.userRole;

    if (role !== "admin") {
        return <div>not authorized</div>;
    }

    return children
};

export default AdminRouteWrapper;