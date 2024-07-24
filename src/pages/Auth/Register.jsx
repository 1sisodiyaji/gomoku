import React, { useState,useEffect } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config/config";
import Cookies from 'js-cookie';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
    const from = location.state?.from || '/profile';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = formData;

    if (!name) {
      toast.warn("Please enter your name to create an account", {
        theme: "dark",
      });
      return;
    }

    if (!email) {
      toast.warn("Please enter your email", { theme: "dark" });
      return;
    }

    if (!isValidEmail(email)) {
      toast.warn("Please enter a valid email", { theme: "dark" });
      return;
    }

    if (!password) {
      toast.warn("Please enter your password to create an account", {
        theme: "dark",
      });
      return;
    }

    try {
      setLoading(true);
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append("name", name);
      formDataEncoded.append("email", email);
      formDataEncoded.append("password", password);

      const response = await axios.post(`${config.BASE_URL}/api/register`, formDataEncoded);

      if (response.data.status === "success") {
        toast.success("Account created successfully!", { theme: "dark" });
        Cookies.set('token', response.data.token, { expires: 7, secure: true });  
        setLoading(false);
        window.location.href= "/dashboard";
      } else {
        toast.error(response.data.message, { theme: "dark" });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.status === 500) {
        toast.error("User with this email already exists", { theme: "dark" });
      } else {
        toast.error("Error creating account. Please try again later.", {
          theme: "dark",
        });
      }
      setLoading(false);
    }
  };

  // login through google function
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      try {
        setLoading(true);
  
        // Fetch user data from Google API
        const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const userData = googleResponse.data; 
        const formDataEncoded = new URLSearchParams();
        formDataEncoded.append("email", userData.email);
        formDataEncoded.append("name", userData.name);
        formDataEncoded.append("username", userData.given_name);
        formDataEncoded.append("image", userData.picture);
      
          const saveUserDataResponse = await axios.post(
            `${config.BASE_URL}/api/saveuserData`,formDataEncoded);
            
        if (saveUserDataResponse.data.status === "success") {
          Cookies.set('token', saveUserDataResponse.data.token, { expires: 7, secure: true });  
          setLoading(false);
          window.location.href= "/dashboard";
        } else {
          toast.error("Error saving user data", { theme: "dark" });
          console.log(saveUserDataResponse.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Error during login. Please try again later.", { theme: "dark" });
        setLoading(false);
      }
    },
    onFaliure: (error) => {
      console.error("Error during login:", error);
      toast.error("Error during login. Please try again later.", { theme: "dark" });
      setLoading(false);
    },
  });
  
    useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');

      if (token) {
        navigate(from);  
      }
    };
    fetchUserData();
  }, [navigate, from]);
  

  return (
    <>
      <ToastContainer />
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Gomoku" content="Gomoku" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://Gomoku.com/Register" />
        <meta
          name="description"
          content="Join Gomoku and show your moves ."
        />
        <title>Sign up | Gomoku </title>
        <meta property="og:title" content="Sign up | Gomoku" />
        <meta
          property="og:description"
          content="Join Gomoku and show your moves."
        />
        <meta
          property="og:image"
          content="https://Gomoku.com/img/logo.png"
        />
        <meta property="og:url" content="https://Gomoku.com/Register" />
        <meta property="og:type" content="gaming - website" />
        <link
          rel="icon"
          type="image/png"
          href="https://Gomoku.com/img/favicon.ico"
          sizes="32x32"
        />
      </Helmet>

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{  minHeight: "100vh"  }}
      >
        <div className="col-lg-5 col-12 d-flex justify-content-center align-items-center">
          <div
            className="container-fluid m-lg-0 p-lg-0"
            style={{ maxWidth: "420px" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <img src="../img/logo.png" width={95} alt="Logo" />
                <h3 className="pt-3">
                Lets start the Game 🎮
                </h3>
                <br />
              </div>

              {/* Name input */}
              <div className="mb-4">
                <div className="col-12 g-0">
                  <div className="input-group w-100">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      className="form-control rounded-8 py-2"
                      placeholder="Your Name"
                      onChange={handleInputChange} 
                    />
                    <i
                      id="checkname"
                      style={{ color: "#703BF7", display: "none" }}
                      className="fi fi-ss-check-circle text-center ms-1"
                    ></i>
                  </div>
                </div>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <div className="input-group w-100">
                  <input
                    type="email"
                    id="emailId"
                    name="email"
                    required 
                    email = "true"
                    value={formData.email}
                    className="form-control rounded-8 py-2"
                    onChange={handleInputChange} 
                    placeholder="Email"
                  />
                  <i
                    id="checkemail"
                    style={{ color: "#703BF7", display: "none" }}
                    className="fi fi-ss-check-circle text-center ms-1"
                  ></i>
                </div>
              </div>

              {/* Password input */}
              <div className="mb-4 position-relative">
                <div className="input-group w-100">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    className="form-control rounded-8 py-2"
                    onChange={handleInputChange}
                    
                    placeholder="Password"
                  />
                  <i
                    id="passwordViewer"
                    onClick={togglePasswordVisibility}
                    className={`fi ${
                      isPasswordVisible ? "fi-ss-eye" : "fi-ss-eye-crossed"
                    } position-absolute top-50 end-0 pe-2 translate-middle-y`}
                    style={{ color: "#703BF7", cursor: "pointer" }}
                  ></i>
                  <i
                    id="checkpass"
                    style={{ color: "#703BF7", display: "none" }}
                    className="fi fi-ss-check-circle text-center ms-1"
                  ></i>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-block mb-4 text-capitalize py-3"
                style={{
                  fontSize: "1rem"
                }}
              >
                {loading ? (
                  <>
                  Creating your account...
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <h3
                className="text-center mb-3"
                style={{
                  fontWeight: "light",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                - OR -
              </h3>

              {/* Google login button */}
              <div className="text-center mb-2">
                <div className="row d-flex justify-content-evenly align-items-center">
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn   w-100"
                      onClick={login}
                    >
                      <img
                        src="../img/Google.png"
                        style={{ height: "26px" }}
                        alt="Google Icon"
                      />
                      <span className=" text-capitalize ms-2">
                        Sign Up With Google
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p>
                  Already have an account?
                  <Link to="/Login" className="  mx-1 fw-bold" style={{ color: "#79b4e2" , textDecoration: 'underline' }}>
                   
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-7 d-lg-block d-none d-flex justify-content-center align-items-center">
          <img
            src="img/Auth.png"
            className="img-fluid w-100"
            alt="Login Page"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
