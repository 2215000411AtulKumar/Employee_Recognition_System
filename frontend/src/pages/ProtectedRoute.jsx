import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("role");


    if (!userId || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
