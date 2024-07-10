import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
export const FootNabar = () => {
  const location = useLocation();
  const [user, setUser] =useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <>
      {/* <!-- Navbar For small screen--> */}
      <nav
        className="navbar navbar-expand-lg   fixed-bottom d-lg-none d-md-none d-sm-block  shadow-0" style={{backgroundColor: '#001926'}}
      >
        <div className="container-fluid d-flex justify-content-around  align-items-center p-1">
          <Link className="text-center" style={{ fontSize: "1.4rem" }} to="/"> 
            <i className="fi fi-rr-house-window iconColor"></i>{" "}
          </Link>
          <Link  className="text-center"  style={{ fontSize: "1.4rem" }}to="/Rules"  > 
            <i className="fi fi-rr-users-alt iconColor"></i>
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
              {user && user.image ? 
              <>  <img
              src={user.image}
              className="rounded-circle border"
              height="28"
              alt="."
              loading="lazy"
            /></>
            :
            <><i className="fi fi-rr-circle-user iconColor"></i></>}
          
          </Link>
        </div>
      </nav>
    </>
  );
};
