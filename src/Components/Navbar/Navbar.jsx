// Header.jsx or Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import DarkMode from "./DarkMode";
import { setLogin, logout } from "../../features/todo/authSlice";

// Dummy Login/Signup modals
import Login from "../../authentication/Login";
import Signup from "../../authentication/SignUp"; 

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/top-rated" },
  { id: 3, name: "Kids Wear", link: "/kids-wear" },
  { id: 4, name: "Mens Wear", link: "/mens-wear" },
  { id: 5, name: "Electronics", link: "/electronics" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/trending" },
  { id: 2, name: "Best Selling", link: "/best-selling" },
  { id: 3, name: "Top Rated", link: "/top-rated" },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const dispatch = useDispatch();
  const { userData, status } = useSelector((state) => state.user);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="shadow-md bg-white dark:bg-slate-800 dark:text-white duration-200 relative z-40">
      {/* Top Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl items-center flex gap-1">
            <FiShoppingBag size="30" />
            ShopMe
          </Link>

          {/* Search and Buttons */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-lg border py-1 px-2 text-sm dark:bg-slate-800"
              />
              <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-800 group-hover:text-primary" />
            </div>

            {/* Cart Button */}
            <Link to="/Carts">
              <button className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3">
                <span className="hidden group-hover:block transition-all duration-200">Order</span>
                <FaCartShopping className="text-xl" />
              </button>
            </Link>

            {/* Dark Mode */}
            <DarkMode />

            {/* Auth Buttons */}
            {!status ? (
              <div className="flex gap-2">
                <button onClick={() => setShowLogin(true)} className="text-sm border px-3 py-1 rounded hover:bg-primary hover:text-white">
                  Login
                </button>
                <button onClick={() => setShowSignup(true)} className="text-sm border px-3 py-1 rounded hover:bg-primary hover:text-white">
                  Signup
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">Hi, {userData}</span>
                <button onClick={handleLogout} className="text-sm border px-3 py-1 rounded hover:bg-red-500 hover:text-white">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <NavLink
                to={data.link}
                className={({ isActive }) =>
                  `inline-block px-4 duration-200 ${isActive ? "text-primary" : "hover:text-primary"}`
                }
              >
                {data.name}
              </NavLink>
            </li>
          ))}
          <li className="group relative cursor-pointer">
            <div className="flex items-center gap-[2px] py-2">
              Trending Products
              <FaCaretDown className="group-hover:rotate-180 transition-all" />
            </div>
            <div className="absolute hidden group-hover:block w-[200px] bg-white dark:bg-slate-700 shadow-md p-2 rounded-md text-black dark:text-white z-50">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <NavLink
                      to={data.link}
                      className={({ isActive }) =>
                        `block w-full rounded-md p-2 ${isActive ? "bg-primary/20" : "hover:bg-primary/20"}`
                      }
                    >
                      {data.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Modal Popups for Auth */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-700 p-6 rounded shadow-md">
            <Login />
            <button className="mt-4 text-sm text-red-500" onClick={() => setShowLogin(false)}>Close</button>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-700 p-6 rounded shadow-md">
            <Signup />
            <button className="mt-4 text-sm text-red-500" onClick={() => setShowSignup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
