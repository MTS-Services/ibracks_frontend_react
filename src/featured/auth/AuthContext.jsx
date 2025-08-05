import { createContext, useContext } from "react";

// ===============code_by_shakil_munshi===================
// 1. Creating AuthContext
// This Context allows any component in the application to access authentication status.
// =================================

export const AuthContext = createContext(null);

// ===============code_by_shakil_munshi===================
// 2. Creating the useAuth custom hook
// This provides a simple way to consume AuthContext.
// =================================

export const useAuth = () => {
  return useContext(AuthContext);
};
