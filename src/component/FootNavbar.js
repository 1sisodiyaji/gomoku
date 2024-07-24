import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import fetchUserData from "../config/UserData";


export const FootNabar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  async function fetchData() {
    const data = await fetchUserData();
    setUser(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <!-- Navbar For small screen--> */}
      <nav
        className="navbar navbar-expand-lg   fixed-bottom d-lg-none d-md-none d-sm-block  shadow-0"
        style={{ backgroundColor: "#001926" }}
      >
        <div className="container-fluid d-flex justify-content-around  align-items-center p-1">
          {user ? (
            <Link
              className="text-center"
              style={{ fontSize: "1.4rem" }}
              to="/dashboard"
            >
              <i className="fi fi-rr-house-window iconColor"></i>{" "}
            </Link>
          ) : (
            <Link className="text-center" style={{ fontSize: "1.4rem" }} to="/">
              <i className="fi fi-rr-house-window iconColor"></i>{" "}
            </Link>
          )}

          <Link
            className="text-center"
            style={{ fontSize: "1.4rem" }}
            to="/History"
          >
             <i className="fi fi-br-time-past pe-2 iconColor"></i>
          </Link>

          <Link
            className="text-center"
            style={{ fontSize: "1.4rem" }}
            to="/Your-Rewards"
          >
            <i className="fi fi-sr-trophy-star iconColor "></i>
          </Link>
          <Link
            className="text-center"
            style={{ fontSize: "1.4rem" }}
            to="/profile"
          >
            {user && user.image ? (
              <>
                {" "}
                <img
                  src={user.image}
                  className="rounded-circle border"
                  height="28"
                  alt="."
                  loading="lazy"
                />
              </>
            ) : (
              <>
                <i className="fi fi-rr-circle-user iconColor"></i>
              </>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
};
