import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import axios from "../../utils/axiosInstance";

// Firebase imports
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "../../firebase.config";

export const AuthProvider = ({ children }) => {
  // Load user from localStorage, token from cookies
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

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Determine if the app is running on localhost
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // Sync token to cookies
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, {
        expires: 7,
        secure: !isLocalhost,
        sameSite: "strict",
      });
      console.log("Cookie set with token:", token);
    } else {
      Cookies.remove("token");
      console.log("Cookie removed.");
    }
  }, [token, isLocalhost]);

  // Set axios default header if token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Axios Authorization header set.");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.log("Axios Authorization header removed.");
    }
  }, [token]);

  // Firebase auth initialization
  const auth = getAuth(firebaseApp);
  auth.languageCode = "it";
  const provider = new GoogleAuthProvider();

  // -------------- LOGIN --------------------
  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/users/login", {
        email,
        password,
        rememberMe,
      });

      const data = response.data;
      console.log("Login response data:", data);

      if (data.data && data.data.user && data.data.token) {
        setUser(data.data.user);
        setToken(data.data.token);
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

  // -------------- REGISTER --------------------
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
      // Firebase-e user create kora
      const firebaseUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = firebaseUserCredential.user;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "user");
      formData.append("uid", user.uid); // Firebase UID backend-e pathano

      if (profileImage) formData.append("profileImage", profileImage);

      const response = await axios.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      console.log("Register response data:", data);

      if (data.data && data.data.user && data.data.token) {
        setUser(data.data.user);
        setToken(data.data.token);
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
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";

      // Firebase error handling for 'email-already-in-use'
      if (err.code === "auth/email-already-in-use") {
        const loginResponse = await login(email, password, false);
        if (loginResponse.success) {
          setSuccess(
            "An account already exists with this email. You have been logged in.",
          );
          return {
            success: true,
            message:
              "An account already exists with this email. You have been logged in.",
          };
        }
      }

      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // -------------- GOOGLE SIGN-IN --------------------
  const googleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const formData = new FormData();
      formData.append("email", user.email || "");
      formData.append("uid", user.uid);
      formData.append("name", user.displayName || "Google User");
      formData.append("role", "user");
      formData.append("profileImage", user.photoURL || "");

      const response = await axios.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      if (data.data && data.data.user && data.data.token) {
        setUser(data.data.user);
        setToken(data.data.token);
        setSuccess(data.message || "Google sign-in successful!");
        return {
          success: true,
          message: data.message || "Google sign-in successful!",
        };
      } else {
        const message =
          "Google sign-in failed: Unexpected response from backend.";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      console.error("Google Sign-in error:", err);

      const msg = err.response?.data?.message || "";
      if (msg.includes("already exists") || err.response?.status === 400) {
        console.warn("User exists. Trying to login with Firebase UID...");

        try {
          const loginResponse = await axios.post("/users/login-with-firebase", {
            uid: user.uid,
          });
          const loginData = loginResponse.data;

          if (loginData.data && loginData.data.user && loginData.data.token) {
            setUser(loginData.data.user);
            setToken(loginData.data.token);
            setSuccess("Google user logged in successfully.");
            return {
              success: true,
              message: "Google user logged in successfully.",
            };
          } else {
            throw new Error("Fallback login failed.");
          }
        } catch (loginErr) {
          console.error("Fallback login error:", loginErr);
          const message =
            loginErr.response?.data?.message ||
            "Failed to log in existing Google user.";
          setError(message);
          return { success: false, message };
        }
      }

      const message =
        err.code === "auth/popup-closed-by-user"
          ? "Google sign-in cancelled by user."
          : err.response?.data?.message ||
            "Google sign-in failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // -------------- LOGOUT --------------------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    Cookies.remove("token");
    console.log("Logged out. User and token cleared.");
  };

  // -------------- FORGOT PASSWORD --------------------
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

  // -------------- UPDATE PASSWORD --------------------
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
            Authorization: `Bearer ${token}`,
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
    googleSignIn,
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
