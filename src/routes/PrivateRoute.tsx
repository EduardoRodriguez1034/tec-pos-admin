import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const PrivateRoute = () => {
  const user = localStorage.getItem("email");

  return (
    <>
      {user ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
