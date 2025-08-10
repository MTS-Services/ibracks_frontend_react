import { useNavigate } from "react-router-dom";
import PasswordResetModal from "./PasswordResetModal";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <PasswordResetModal isOpen={true} onClose={() => navigate("/auth/login")} />
  );
};

export default ResetPasswordPage;
