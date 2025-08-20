import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const FooterStyle = () => {
  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "Tracks", path: "/tracks" },
    { name: "Video", path: "/video" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Futures", path: "/" }, // Ensure you create this route
    { name: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Licensing info", path: "/" },
    { name: "Terms & use", path: "/" },
    { name: "Privacy policy", path: "/" },
    {
      name: "YouTube terms of service",
      path: "https://www.youtube.com/@BeatzInGeez",
      target: "_blank",
      external: true,
    },
  ];

  return (
    <footer className="flex w-full flex-col border-t border-neutral-500 bg-[#3B0045]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-start justify-between gap-8 px-8 py-8 md:px-16 lg:px-28">
        {/* Logo & Social */}
        <div className="flex w-full flex-col gap-8 md:w-60">
          <div className="flex flex-col gap-6">
            <img className="w-40" src="/footer/footerlogo.png" alt="Logo" />
            <p className="text-base font-normal text-neutral-200 capitalize">
              Simplicity drives results. Keep it simple, and sell more.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-white">
              <FaXTwitter className="h-[24px] w-[23.98px]" />
            </div>
            <div className="text-white">
              <FaInstagram className="h-[24px] w-[23.98px]" />
            </div>
            <div className="text-white">
              <FaYoutube className="h-[24px] w-[23.98px]" />
            </div>
            <div className="text-white">
              <FaLinkedinIn className="h-[24px] w-[23.98px]" />
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex w-full flex-col gap-3 md:w-64">
          <h3 className="pb-4 text-base font-medium text-white capitalize">
            Company
          </h3>
          <div className="flex flex-col gap-2">
            {companyLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="cursor-pointer p-2 text-sm leading-tight font-normal text-white hover:underline"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex w-full flex-col gap-3 md:w-64">
          <h3 className="pb-4 text-base font-medium text-white capitalize">
            Legal
          </h3>
          <div className="flex flex-col gap-2">
            {legalLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="mb-4 cursor-pointer text-sm leading-tight font-normal text-white hover:underline"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mx-auto flex w-full justify-center border-t border-zinc-500 px-8 py-4 md:px-16 lg:px-28">
        <p className="text-center text-base font-normal text-neutral-200">
          © 2025 BeatzInGeez. All rights reserved. Made with ❤️ for travelers
          worldwide.
        </p>
      </div>
    </footer>
  );
};

export default FooterStyle;
