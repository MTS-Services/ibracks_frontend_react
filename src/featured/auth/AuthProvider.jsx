import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const BASE_URL = "https://backend-lbracks.mtscorporate.com/api"; //

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

  // Update localStorage when user/token changes
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
      // NOTE: This currently uses 'ibracks'. If BASE_URL is 'lbracks', update this too for consistency.
      const response = await fetch(
        "https://backend-ibracks.mtscorporate.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

      // NOTE: This currently uses 'ibracks'. If BASE_URL is 'lbracks', update this too for consistency.
      const response = await fetch(
        "https://backend-ibracks.mtscorporate.com/api/users/register",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        // ✅ Automatically login after successful registration
        setUser(data.data.user);
        setToken(data.data.token);
        setSuccess(data.message || "User registered and logged in!");
        return {
          success: true,
          message: data.message || "User registered and logged in!",
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

  // >>>>>>>>>>>>>> `forgotPassword` function added here <<<<<<<<<<<<<<
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "POST", // Forgot password APIs usually use POST method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      const data = await response.json();

      if (response.ok) {
        // API call was successful (status 200-299)
        setSuccess(data.message || "Password reset link sent to your email.");
        return {
          success: true,
          message: data.message || "Password reset link sent.",
        };
      } else {
        // API call failed (e.g., 4xx, 5xx status codes)
        setError(data.message || "Failed to send password reset link.");
        return {
          success: false,
          message: data.message || "Failed to send password reset link.",
        };
      }
    } catch (err) {
      // Network error (e.g., server not reachable, no internet)
      console.error("Forgot password error:", err);
      setError("Network error or server unavailable.");
      return {
        success: false,
        message: "Network error or server unavailable.",
      };
    } finally {
      setLoading(false); // Always stop loading regardless of success or failure
    }
  };
  // >>>>>>>>>>>>>> End of `forgotPassword` function <<<<<<<<<<<<<<

  const updatePassword = async (userId, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Your updatePassword already uses 'backend-lbracks', which is good for consistency with my chosen BASE_URL.
      // If you decide on 'ibracks' as the BASE_URL, remember to update this endpoint too.
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT", // Use PUT method as shown in your image
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // You might need an Authorization header here if your API requires authentication (e.g., Bearer token)
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Password updated successfully.");
        return {
          success: true,
          message: data.message || "Password updated successfully.",
        };
      } else {
        setError(data.message || "Failed to update password.");
        return {
          success: false,
          message: data.message || "Failed to update password.",
        };
      }
    } catch (err) {
      console.error("Update password error:", err);
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
    forgotPassword, // <<<<<< Add forgotPassword to the context value
    updatePassword,
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
