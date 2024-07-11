import React from "react";
import { Link } from "react-router-dom";
export const Footer = ({ onFooterClick }) => {
  return (
    <>
      <footer className="py-3">
        <div className="container-fluid g-0 mb-lg-0 mb-5">
          <div className="row g-0">
            <div className="col-lg-9 col-12 d-flex">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6 col-12  d-flex justify-content-center">
                    {/* <!-- Additional Information --> */}
                    <img
                      src="img/logo.png"
                      alt="logo"
                      style={{ height: "35px" }}
                    />
                    <h4 className="mb-0 mx-2 text-light mountains-of-christmas-regular">
                      Gomoku
                    </h4>
                  </div>
                  <div className="col-lg-6  col-12 ">
                    <div className="pb-lg-3 d-flex justify-content-evenly">
                      <Link
                        to="/privacy_policy"
                        onClick={onFooterClick}
                        className="  heading2 iconColor"
                      >
                        Privacy Policy
                      </Link>{" "}
                      |
                      <Link
                        to="/terms_conditions"
                        onClick={onFooterClick}
                        className="  ms-1 heading2 iconColor"
                      >
                        Terms Of Service
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-0 d-lg-block d-none ">
              <div
                className="pb-3 d-flex justify-content-end pe-2"
                style={{ color: "FFFFFF" }}
              >
                {/* <!-- Section: Social media --> */}
                <section className=" SocialLinks ">
                  <Link
                    className="btn btn-sm ms-3 bg-warning"
                    to="#"
                    role="button"
                    target="_blank"
                  >
                    <i className="fi fi-brands-instagram  rounded-8 "></i>
                  </Link>

                  {/* <!-- Whatsapp --> */}
                  <Link
                    className="btn btn-sm ms-3 bg-success"
                    to="#"
                    role="button"
                    target="_blank"
                  >
                    <i className="fi fi-brands-whatsapp rounded-8"></i>
                  </Link>

                  {/* <!-- Additional social media icons can be added here --> */}
                </section>
              </div>
            </div>

            <div className="d-lg-none d-block ">
              <div className="pb-3" style={{ color: "FFFFFF" }}>
                {/* <!-- Section: Social media --> */}
                <section className="row g-0">
                  <div className="col-6 text-start">
                    <Link
                      className="btn btn-sm ms-3"
                      to="#"
                      role="button"
                      target="_blank"
                    >
                      <i className="fi fi-brands-instagram  rounded-8"></i>
                    </Link>
                  </div>
                  {/* <!-- Whatsapp --> */}
                  <div className="col-6 text-end">
                    <Link
                      className="btn btn-sm ms-3"
                      to="#"
                      role="button"
                      target="_blank"
                    >
                      <i className="fi fi-brands-whatsapp rounded-8"></i>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
