import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import authService from "@/services/authService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    authService.isAuthed(setAuthed, setLoading);
  }, []);

  if (loading) return null;
  if (!authed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
