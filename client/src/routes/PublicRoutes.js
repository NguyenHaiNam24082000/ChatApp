import { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};

const PublicRoutes = () => {
  const history = useNavigate();
  const isAuth = useAuth();
  // useEffect(() => {
  //   isAuth && history("/chanel/@me");
  // }, [isAuth]);
  return isAuth ? history("/chanel/@me") : <Outlet />;
};

export default PublicRoutes;
