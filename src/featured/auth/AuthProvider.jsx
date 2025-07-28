import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://backend-ibracks.mtscorporate.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, rememberMe }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        setToken(data.data.token);
        setSuccess(data.message || "Login successful!");
        return { success: true, message: data.message || "Login successful!" };
      } else {
        setError(
          data.message || "Login failed. Please check your credentials.",
        );
        return { success: false, message: data.message || "Login failed." };
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error or server unavailable.");
      return {
        success: false,
        message: "Network error or server unavailable.",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name,
    phoneNumber,
    email,
    password,
    confirmPassword,
    profileImage,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return { success: false, message: "Passwords do not match." };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return { success: false, message: "Please enter a valid email address." };
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "user");
      formData.append("uid", crypto.randomUUID());

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await fetch(
        "https://backend-ibracks.mtscorporate.com/api/users/register",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          data.message || "User registered successfully! You can now log in.",
        );
        // navigate('/login'); // নেভিগেশন এখন RegisterView কম্পোনেন্ট থেকে হবে
        return {
          success: true,
          message: data.message || "User registered successfully!",
        };
      } else {
        setError(data.message || "Registration failed. Please try again.");
        return {
          success: false,
          message: data.message || "Registration failed.",
        };
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error or server unavailable.");
      return {
        success: false,
        message: "Network error or server unavailable.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("YOUR_FORGOT_PASSWORD_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || "Password reset link sent to your email.");
        return {
          success: true,
          message: data.message || "Password reset link sent.",
        };
      } else {
        setError(data.message || "Failed to send password reset link.");
        return {
          success: false,
          message: data.message || "Failed to send password reset link.",
        };
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Network error or server unavailable.");
      return {
        success: false,
        message: "Network error or server unavailable.",
      };
    } finally {
      setLoading(false);
    }
  };

  const authContextValue = {
    user,
    token,
    loading,
    error,
    success,
    login,
    register,
    logout,
    forgotPassword,
    setError,
    setSuccess,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
