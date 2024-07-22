import React, { useEffect, useState } from "react";
import config from "../config/config";
import axios from "axios";
import Cookies from 'js-cookie';
import YourRewards from "../component/YourRewards";
import PreviousMatch from "../component/PreviousMatch";
import fetchUserData from "../config/UserData";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  async function fetchData() {
    const data = await fetchUserData();
    setUser(data);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const logout = async () => {
    try {
      const response = await axios.post(`${config.BASE_URL}/api/logout`);

      if (response.status === 200) { 
        Cookies.remove('token');
        window.location.href = "/";
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="container-fluid design g-0" style={{ minHeight: '100vh' }}>

        {user ? <>
          <div className="container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-12">

                <div className="card p-3">
                  <div className="row">
                    <div className="col-5"><img src={!user.image ? user.image : 'img/dummyPerson.svg'} className="img-fluid rounded-circle mx-auto" alt="user" title={user.name} loading="lazy" style={{height:'200px'}} /> </div>
                    <div className="col-7">

                      <div className="container-fluid">
                        <div className="row"> 
                        <div className="col-lg-7 col-0"></div>
                        <div className="col-lg-5 col-12 text-end"> <div className="btn rounded-8">edit <i className="fi fi-ss-pen-clip"></i></div></div>
                       
                        </div>
                        <h4 className="mountains-of-christmas-regular">{user.name}</h4>
                         <p className="heading2">{user.username}</p>
                         <small className="heading3">{user.email}</small>

                        <div className="row mt-3 g-0">
                          <div className="col-lg-6 col-0"></div>
                          <div className="col-lg-6 col-10">
                            <div className="btn text-capitalize btn-block rounded-6" onClick={logout}>lOG OUT <i className="fi fi-br-sign-out-alt ps-2"></i></div>
                          </div>
                        </div>

                      </div>
                      
                    </div>
                  </div>
                </div>

                <PreviousMatch/>

              </div>
              <div className="col-lg-6 col-12">
                <YourRewards/>
              </div>
            </div>
          </div>
        </> :
          <>
          <div className="container-fluid vh-100 design g-0 d-flex justify-content-center align-items-center">
            <Link to ="/Login" >
              <h1 className="text-light">please login <i className="fi fi-br-sign-in-alt"></i></h1>
            </Link>
          </div>

          </>
        }
      </div>
    </>
  )
}

export default Profile