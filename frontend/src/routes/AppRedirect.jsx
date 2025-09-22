import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth"; 

const RoleRedirect = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) return navigate("/login");
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "driver") navigate("/driver/dashboard");
      else navigate("/user/home");
    }
  }, [user, role, loading]);

  return <p className="text-center mt-10">Redirecting...</p>;
};

export default RoleRedirect;
