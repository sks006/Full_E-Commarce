/** @format */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/store";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
     const user = useSelector((state: RootState) => state.auth.user);
     const accessToken = useSelector(
          (state: RootState) => state.auth.accessToken,
     );

     // Check if the user is authenticated
     const isAuthenticated = !!user && !!accessToken;

     if (!isAuthenticated) {
          return <Navigate to='/login' replace />;
     }

     return <>{children}</>;
}
