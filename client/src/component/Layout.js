import React, { useState } from "react";
import "./Layout.css";
import { adminMenu, loginMenu } from "../data/menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Badge } from "antd";

import Logo from "../img/FlexFitLogo.png";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const menus = user?.isAdmin ? adminMenu : loginMenu;

  const handleToggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="main">
        {/* Navbar */}
        <header className="shadow-md sticky top-0 left-0 w-full z-50 bg-bgNavbar">
          <nav className="flex justify-between items-center w-[92%] mx-auto py-4">
            {/* Logo */}
            <div className="w-12 md:w-14 flex items-center">
              <img
                className=" object-contain cursor-pointer"
                src={Logo}
                alt="Logo"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menus.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <Link
                    key={menu.path}
                    className={`text-xl px-4 py-3 no-underline hover:text-[#EAEAEA] hover:bg-[#252525] ${
                      isActive
                        ? "text-menuTextActive border-b border-menuTextActive"
                        : "text-menuText"
                    } hover:text-menuHover transition`}
                    to={menu.path}
                  >
                    {menu.name}
                  </Link>
                );
              })}
            </div>

            {/* User Info + Mobile Menu Toggle */}
            <div className="flex items-center gap-6">
              <Badge
                count={user?.notifications?.length}
                onClick={() => navigate("/notifications")}
                className="cursor-pointer text-yellow-600"
              >
                <i className="fa-solid fa-bell text-xl"></i>
              </Badge>

              {user ? (
                <>
                  <Link
                    className="bg-btnPrimary text-btnPrimaryText hover:bg-btnPrimaryHover px-4 py-2 rounded-md md:block hidden no-underline"
                    to="/profile"
                  >
                    {user.name}
                  </Link>

                  <Link
                    to={"/book-slot"}
                    className="md:hidden px-3 py-2 bg-btnPrimary text-btnPrimaryText hover:bg-btnPrimaryHover no-underline rounded-md"
                  >
                    Book Slot
                  </Link>

                  <button
                    className="hidden md:block bg-btnSecondary text-btnSecondaryText hover:bg-btnSecondaryHover px-4 py-2 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  to="/login"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-textHeading"
                onClick={handleToggleMobileMenu}
              >
                <i className={`text-3xl fa-solid fa-bars`}></i>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-bgNavbar z-40 flex flex-col items-center justify-center transition-all ${
              mobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {menus.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={menu.path}
                  className={`text-2xl py-2 px-3 mb-3 rounded-md text-menuText no-underline hover:text-menuTextHover ${
                    isActive
                      ? "text-menuTextActive border-b border-menuTextActive"
                      : "text-menuText"
                  }`}
                  to={menu.path}
                  onClick={() => setMobileMenu(false)}
                >
                  {menu.name}
                </Link>
              );
            })}

            <button
              onClick={() => setMobileMenu(false)}
              className="absolute top-5 right-5 text-3xl text-menuText"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="content w-full mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;
