import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import axios from "../../utils/axiosInstance"; // your axios setup

export const AuthProvider = ({ children }) => {
  // ===============code_by_shakil_munshi===================
  // Load user from localStorage, token from cookies
  // =======================================================

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => Cookies.get("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ===============code_by_shakil_munshi===================
  // Sync user to localStorage
  // =======================================================
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ===============added_by_gemini===================
  // Determine if the app is running on localhost
  // This is used to conditionally set the 'secure' flag on cookies
  // ===================================================
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // ===============code_by_shakil_munshi===================
  // Sync token to cookies
  // This useEffect runs whenever the 'token' state changes.
  // It's responsible for setting or removing the cookie.
  // =======================================================
  useEffect(() => {
    if (token) {
      // ===============code_by_shakil_munshi===================
      // Set cookie for 7 days (adjust as needed)
      // IMPORTANT:
      // - `secure: true` means the cookie will ONLY be sent over HTTPS.
      // =======================================================
      Cookies.set("token", token, {
        expires: 7, // Cookie expires in 7 days
        // ===============added_by_gemini===================
        // Conditionally set 'secure' to false for localhost
        // For production, this will be true by default
        // ===================================================
        secure: !isLocalhost,
        sameSite: "strict", // Strict same-site policy
      });
      console.log("Cookie set with token:", token); // Added for debugging
    } else {
      Cookies.remove("token");
      console.log("Cookie removed."); // Added for debugging
    }
  }, [token, isLocalhost]);

  // ===============code_by_shakil_munshi===================
  // Set axios default header if token changes
  // This ensures that all subsequent authenticated requests automatically include the token.
  // =======================================================
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Axios Authorization header set."); // Added for debugging
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.log("Axios Authorization header removed."); // Added for debugging
    }
  }, [token]);

  // ===============code_by_shakil_munshi===================
  // -------------- LOGIN --------------------
  // Handles user login by sending credentials to the backend.
  // =======================================================
  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // ===============code_by_shakil_munshi===================
      // Proper axios.post usage: url, data, config
      // =======================================================
      const response = await axios.post("/users/login", {
        email,
        password,
        rememberMe,
      });

      // ===============code_by_shakil_munshi==================
      // Assuming response.data = { data: { user, token }, message }
      // Make sure your backend API sends the token in this structure.
      // =======================================================
      const data = response.data;
      console.log("Login response data:", data); // Debugging: check what the server sends

      if (data.data && data.data.user && data.data.token) {
        setUser(data.data.user);
        setToken(data.data.token); // This will trigger the useEffect to set the cookie
        setSuccess(data.message || "Login successful!");
        return { success: true, message: data.message || "Login successful!" };
      } else {
        const message = "Login failed: Unexpected response format.";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ===============code_by_shakil_munshi===================
  // -------------- REGISTER --------------------
  // Handles user registration, including image upload.
  // =======================================================
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
      formData.append("role", "user"); // Assuming a default role
      // For `crypto.randomUUID()`, ensure you are in a secure context (HTTPS)
      // or a browser environment that supports it.
      // If not, you might need a polyfill or a different UUID generation method.
      formData.append("uid", crypto.randomUUID());

      if (profileImage) formData.append("profileImage", profileImage);

      const response = await axios.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      console.log("Register response data:", data); // Debugging: check what the server sends

      // ===============code_by_shakil_munshi==================
      // Backend থেকে আসা response data'র গঠন Login-এর মতো হওয়া উচিত।
      // এখানে নিশ্চিত করা হচ্ছে যে response-এ user এবং token আছে কিনা।
      // =======================================================
      if (data.data && data.data.user && data.data.token) {
        setUser(data.data.user);
        setToken(data.data.token); // This should trigger the useEffect to set the cookie
        setSuccess(data.message || "User registered and logged in!");

        return {
          success: true,
          message: data.message || "User registered and logged in!",
        };
      } else {
        const message = "Registration failed: Unexpected response format.";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ===============code_by_shakil_munshi===================
  // -------------- LOGOUT --------------------
  // Clears user, token, localStorage, and cookies upon logout.
  // =======================================================
  const logout = () => {
    setUser(null);
    setToken(null);
    // Explicitly remove from localStorage and cookies immediately
    localStorage.removeItem("user");
    Cookies.remove("token");
    console.log("Logged out. User and token cleared."); // Added for debugging
  };

  // ===============code_by_shakil_munshi===================
  // -------------- FORGOT PASSWORD --------------------
  // Initiates password reset process.
  // =======================================================
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/users/forgot-password", { email });

      const data = response.data;
      setSuccess(data.message || "Password reset link sent to your email.");
      return {
        success: true,
        message: data.message || "Password reset link sent.",
      };
    } catch (err) {
      console.error("Forgot password error:", err);
      const message =
        err.response?.data?.message || "Failed to send password reset link.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ===============code_by_shakil_munshi===================
  // -------------- UPDATE PASSWORD --------------------
  // Allows a logged-in user to update their password.
  // =======================================================
  const updatePassword = async (userId, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(
        `/users/${userId}`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // already set globally but kept for clarity
          },
        },
      );

      const data = response.data;

      setSuccess(data.message || "Password updated successfully.");
      return {
        success: true,
        message: data.message || "Password updated successfully.",
      };
    } catch (err) {
      console.error("Update password error:", err);
      const message =
        err.response?.data?.message || "Failed to update password.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Context value
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
    updatePassword,
    setError, // Allowing direct manipulation of error/success messages
    setSuccess, // useful for clearing messages on route change etc.
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
