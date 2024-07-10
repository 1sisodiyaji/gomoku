import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkmode, setDarkmode] = useState(false);
  const isNavLinkActive = (path) => {
    return location.pathname.includes(path);
  };
  const location = useLocation();

  const logout = async () => {
    try {
      const response = await axios.post(`${config.BASE_URL}/api/logout`);

      if (response.status === 200) {
        sessionStorage.removeItem("token");
        Cookies.remove('token');
        window.location.reload();
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token'); 
      if (token) {
        try {
          const response = await axios.post(
            `${config.BASE_URL}/api/user`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ); 
          if (response.data.status === "success") {
            setUser(response.data.user);
          } else {
            console.log("Failed to fetch user information");
          }
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    const isDarkMode = !darkmode;
    setDarkmode(isDarkMode);

    // Toggle dark theme class on body
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }

    // Optionally, persist dark mode state in localStorage
    localStorage.setItem("darkmode", JSON.stringify(isDarkMode));
  };

  return (
    <>
      {/* <!-- Navbar For small screen--> */}
      <nav className="navbar navbar-expand-lg  fixed-top d-lg-none d-md-none d-sm-block  shadow-0">
        <div className="container-fluid">
          <Link
            className="navbar-brand text-center text-decoration-none"
            to="/"
          >
            <img
              src="../img/logo.png"
              height="25"
              title="codesaarthi"
              alt="Codesaarthi  Logo"
              loading="lazy"
            />
          </Link>
          <div>
            <button
              className="btn btn-sm rounded-8  me-2"
              onClick={toggleDarkMode}
            >
              <i className="fi fi-ss-moon-stars"></i>
            </button>

            {/* <!-- Toggle button --> */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleSidebar}
            >
              <i className="fi fi-br-bars-staggered text-light"></i>
            </button>
          </div>
        </div>
      </nav>

      <div
        style={{ zIndex: "99" }}
        className={`sidebar ${
          isSidebarOpen ? "show" : ""
        } d-lg-none d-md-none d-sm-block`}
      >
        <div className="pt-5 mt-2">
          <ul className="nav flex-column text-start ms-4">
            {!user ? (
              <>
                <li className="nav-item ">
                  <Link
                    className={`nav-link ${
                      isNavLinkActive("/signup") ? "selected" : ""
                    }`}
                    to="/Register"
                  >
                    <i className="fi fi-rs-rocket-lunch pe-2"></i>
                    Create Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isNavLinkActive("/Login") ? "selected" : ""
                    }`}
                    to="/Login"
                  >
                    <i className="fi fi-br-sign-in-alt pe-2"></i>
                    Log in
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isNavLinkActive("/profile") ? "selected" : ""
                    }`}
                    to="/profile"
                  >
                    {" "}
                    <i className="fi fi-ss-user text-light pe-2"></i>
                    Profile
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isNavLinkActive("/Rules") ? "selected" : ""
                }`}
                to="/Rules"
              >
                {" "}
                <i className="fi fi-sr-info pe-2"></i>
                Rules
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isNavLinkActive("/Rewards") ? "selected" : ""
                }`}
                to="/Rewards"
              >
                <i className="fi fi-sr-trophy-star pe-2"></i>
                Rewards
              </Link>
            </li>
           
            {user && (
              <>
              <li className="nav-item">
              <Link 
                className={`nav-link ${
                  isNavLinkActive("/") ? "selected" : ""
                }`}
                to="/History"
              >
                <i className="fi fi-br-time-past pe-2"></i>
                History
              </Link>
            </li>
              <li className="nav-item">
                <Link
                  onClick={logout}
                  className={`nav-link ${
                    isNavLinkActive("/") ? "selected" : ""
                  }`}
                  to="/"
                >
                  <i className="fi fi-br-sign-in-alt pe-2"></i>
                  logout
                </Link>
              </li> 
              </>
            )}
          </ul>
        </div>
      </div>

      {/* <!-- Navbar For big screen--> */}
      <nav
        className="navbar navbar-expand-lg sticky sticky-top p-0 d-lg-block d-md-block d-none  shadow-6"
        style={{ zIndex: "100000!important" }}
      >
        <div
          className="container-fluid "
          style={{
            zIndex: "1000!important",
          }}
        >
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navbar brand */}
            <Link className="navbar-brand text-center ms-4" to="/">
              <img
                src="img/logo.png"
                className="img-fluid"
                style={{ height: "35px" }}
                alt=""
              />
              <h1 style={{ fontSize: "24px" }} className="mb-0 ms-2 text-light mountains-of-christmas-regular">
                Gomoku
              </h1>
            </Link>
            {/* Left links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center p-1">
              <li className="nav-items pe-2">
                <Link
                  className={`nav-link ${
                    isNavLinkActive("/Rules") ? "active" : ""
                  }`}
                  to="/Rules"
                >
                  Rules
                </Link>
              </li>
              <li className="nav-items pe-2">
                <Link
                  className={`nav-link ${
                    isNavLinkActive("/Rewards") ? "active" : ""
                  }`}
                  to="/Rewards"
                >
                  Rewards
                </Link>
              </li>
            </ul>
            {/* Left links */}
          </div>
          <button
            className="btn btn-sm rounded-8  me-2"
            onClick={toggleDarkMode}
          >
            <i className="fi fi-ss-moon-stars"></i>
          </button>

          <div className="d-lg-block d-md-block d-none d-flex justify-content-center align-items-center">
            {user ? (
              <>
                <div className="d-flex align-items-center">
                  <div className="nav-item " style={{ zIndex: "9999" }}>
                    <button className="btn btn-floating">
                      {user.image ? (
                        <>
                          <Link to="/profile">
                            <img
                              src={user.image}
                              className="rounded-circle border"
                              height="28"
                              alt="."
                              loading="lazy"
                            />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/profile">
                            <div className="rounded-circle pt-2">
                              <i className="fi fi-ss-user text-primary"></i>
                            </div>
                          </Link>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/Login">
                  <button className="btn btn-sm     text-capitalize">
                    Log in <span role="image">💁</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
