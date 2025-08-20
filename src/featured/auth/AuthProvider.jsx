import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import axios from "../../utils/axiosInstance";

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "../../firebase.config";

/* ------------ helpers ------------ */
const get = (o, p, d = undefined) => {
  try {
    return (
      p.reduce((a, k) => (a && a[k] !== undefined ? a[k] : undefined), o) ?? d
    );
  } catch {
    return d;
  }
};
const parseAuth = (raw) => {
  const userCandidates = [
    ["data", "data", "user"],
    ["data", "user"],
    ["user"],
    ["data"],
  ];
  const tokenCandidates = [
    ["data", "data", "token"],
    ["data", "data", "accessToken"],
    ["data", "token"],
    ["data", "accessToken"],
    ["token"],
    ["accessToken"],
    ["access_token"],
  ];
  let user, token;
  for (const p of userCandidates) {
    const u = get(raw, p);
    if (u && typeof u === "object" && (u.email || u.id || u.uid || u.name)) {
      user = u;
      break;
    }
  }
  if (!user) {
    const maybe = get(raw, ["data"]);
    if (
      maybe &&
      typeof maybe === "object" &&
      (maybe.email || maybe.id || maybe.uid || maybe.name)
    )
      user = maybe;
  }
  for (const p of tokenCandidates) {
    const t = get(raw, p);
    if (typeof t === "string" && t.length > 10) {
      token = t;
      break;
    }
  }
  return { user, token };
};

/* ------------ provider ------------ */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => Cookies.get("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isLocalhost = ["localhost", "127.0.0.1"].includes(
    window.location.hostname,
  );

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, {
        expires: 7,
        secure: !isLocalhost,
        sameSite: "strict",
        path: "/",
      });
    } else {
      Cookies.remove("token", { path: "/" });
      Cookies.remove("token");
    }
  }, [token, isLocalhost]);

  useEffect(() => {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);

  const auth = getAuth(firebaseApp);
  auth.languageCode = "en";
  const provider = new GoogleAuthProvider();

  const finalize = ({ user: u, token: t }) => {
    if (u) setUser(u);
    if (t) setToken(t);
    return !!(u && t);
  };

  /* ------------ login ------------ */
  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resp = await axios.post("/users/login", {
        email,
        password,
        rememberMe,
      });
      const parsed = parseAuth(resp.data);
      if (parsed.user && parsed.token) {
        finalize(parsed);
        return { success: true, message: "Login successful." };
      }
      return {
        success: false,
        message: "Login failed: Unexpected response format.",
      };
    } catch (e) {
      return {
        success: false,
        message:
          e?.response?.data?.message || "Login failed. Check credentials.",
      };
    } finally {
      setLoading(false);
    }
  };

  /* ------------ register (no auto-login) ------------ */
  // নতুন: শেষ প্যারাম 'autoLogin' (default=false)
  const register = async (
    name,
    phoneNumber,
    email,
    password,
    confirmPassword,
    profileImage,
    autoLogin = false,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setLoading(false);
      return { success: false, message: "Passwords do not match." };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setLoading(false);
      return { success: false, message: "Please enter a valid email." };
    }

    let fbUser, idToken;
    try {
      // 1) Firebase signUp
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      fbUser = cred.user;
      idToken = await fbUser.getIdToken(true);

      // 2) Backend register
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "user");
      formData.append("uid", fbUser.uid);
      formData.append("idToken", idToken);
      if (profileImage) formData.append("profileImage", profileImage);

      const resp = await axios.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const parsed = parseAuth(resp.data);

      // ✅ এখন থেকে ডিফল্টে অটো-লগইন নয়
      if (autoLogin && parsed.user && parsed.token) {
        finalize(parsed);
        return { success: true, message: "Registered & logged in." };
      }

      // কোনো অবস্থাতেই এখানে অটো-লগইন করবো না
      return {
        success: true,
        message: "Registration successful. Please login.",
        next: "go-login",
      };
    } catch (e) {
      if (e?.code === "auth/email-already-in-use") {
        // যেহেতু এখন register-এর পর login করাতে চাই না, direct login করবো না
        return {
          success: false,
          message: "Email already in use. Please login.",
          next: "go-login",
        };
      }
      return {
        success: false,
        message:
          e?.response?.data?.message ||
          (e?.code ? `Firebase error: ${e.code}` : "Registration failed."),
      };
    } finally {
      setLoading(false);
    }
  };

  /* ------------ Google Sign-In (এটা সাইন-ইন, তাই এখানে login থাকবে) ------------ */
  const googleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      const idToken = await fbUser.getIdToken(true);

      const formData = new FormData();
      formData.append("email", fbUser.email || "");
      formData.append("uid", fbUser.uid);
      formData.append("idToken", idToken);
      formData.append("name", fbUser.displayName || "Google User");
      formData.append("role", "user");
      formData.append("profileImage", fbUser.photoURL || "");

      const resp = await axios.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const parsed = parseAuth(resp.data);
      if (parsed.user && parsed.token) {
        finalize(parsed);
        return { success: true, message: "Google sign-in successful!" };
      }

      return {
        success: false,
        message: "Google sign-in: unexpected response without token.",
      };
    } catch (e) {
      if (e?.code === "auth/popup-closed-by-user")
        return { success: false, message: "Google sign-in cancelled by user." };
      return {
        success: false,
        message:
          e?.response?.data?.message ||
          "Google sign-in failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  /* ------------ logout ------------ */
  const logout = () => {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      Cookies.remove("token", { path: "/" });
      Cookies.remove("token");
      delete axios.defaults.headers.common["Authorization"];
    } catch {}
  };

  /* ------------ misc ------------ */
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resp = await axios.post("/users/forgot-password", { email });
      return {
        success: true,
        message: resp?.data?.message || "Password reset link sent.",
      };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Failed to send reset link.",
      };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (userId, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resp = await axios.put(`/users/${userId}`, {
        password: newPassword,
      });
      return {
        success: true,
        message: resp?.data?.message || "Password updated successfully.",
      };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Failed to update password.",
      };
    } finally {
      setLoading(false);
    }
  };

  const ctx = {
    user,
    token,
    loading,
    error,
    success,
    login,
    register,
    googleSignIn,
    logout,
    forgotPassword,
    updatePassword,
    setError,
    setSuccess,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
