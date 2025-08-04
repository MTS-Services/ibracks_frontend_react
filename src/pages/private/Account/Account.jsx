import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../featured/auth/AuthContext";

const Account = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState({
    credentials: [],
    billingAddress: {},
    shippingAddress: {},
  });

  useEffect(() => {
    if (user) {
      setAccountData({
        credentials: [
          {
            label: "E-mail address",
            value: user.email || "N/A",
            action: "Change e-mail address",
          },
          {
            label: "Name",
            value: user.name || "N/A",
            action: "Change username",
          },
          {
            label: "Phone number",
            value: user.phoneNumber || "None",
            action: "Change phone number",
            isNone: !user.phone,
          },
          {
            label: "Password",
            value: "••••••",
            action: "Change password",
            isPassword: true,
          },
          {
            label: "billingAddress",
            value: user.createdAt || "None",
            isNone: !user.createdAt,
          },
        ],
      });
    } else {
      navigate("/login");
      setAccountData({
        credentials: [
          {
            label: "E-mail address",
            value: "অনুগ্রহ করে লগইন করুন",
            action: "",
          },
          {
            label: "Username",
            value: "অনুগ্রহ করে লগইন করুন",
            action: "",
          },
          {
            label: "Phone number",
            value: "অনুগ্রহ করে লগইন করুন",
            action: "",
            isNone: true,
          },
          {
            label: "Password",
            value: "••••••",
            action: "",
            isPassword: true,
          },
        ],
      });
    }
  }, [user, navigate]);

  const SectionItem = ({
    label,
    value,
    action,
    isNone = false,
    isPassword = false,
  }) => (
    <div className="mb-5 flex items-center justify-between border-b border-white/30 pb-4 last-of-type:border-b-0">
      <div className="flex flex-col text-left">
        <span className="mb-1 text-base text-gray-200">{label}</span>
        <span
          className={`${isNone ? "font-normal text-gray-500" : "font-bold text-white"} ${isPassword ? "font-mono tracking-wider" : ""} text-lg`}
        >
          {value}
        </span>
      </div>
      {action && (
        <a href="#" className="text-sm text-blue-500 hover:underline">
          {action}
        </a>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-b from-black to-fuchsia-900 p-10 text-gray-100">
      <div className="w-full max-w-2xl px-5">
        <h2 className="mb-8 text-3xl font-normal text-white">Credentials</h2>
        {accountData.credentials.map((item, index) => (
          <SectionItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Account;
