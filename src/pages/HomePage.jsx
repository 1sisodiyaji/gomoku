import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"; 
import GetIdFromToken from '../config/GetIdFromToken';

const HomePage = () => { 
   const [id, setId] = useState();
   
    async function getId() {
        const id = await GetIdFromToken();
        setId(id);
      }

      useEffect(()=>{
        getId();
    },[]);

    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="Gomoku" content="Gomoku" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="description"
                    content="Lets Be a part of Gomoku , try your strategical move to play wisely and become a champion."
                />
                <title>Home | Gomoku</title>
                <meta property="og:title" content="Home | Gomoku" />
                <meta
                    property="og:description"
                    content="Lets Be a part of Gomoku , try your strategical move to play wisely and become a champion."
                />
                <meta
                    property="og:image"
                    content="https://Gomoku.com/img/logo.png"
                />
                <meta property="og:url" content="https://Gomoku.com" />
                <meta property="og:type" content="gaming-Website" />
                <link
                    rel="icon"
                    type="image/png"
                    href="https://Gomoku.com/img/favicon.ico"
                    sizes="32x32"
                />
            </Helmet>

            {id ?
                <>

                    <div className="container-fluid g-0 design" style={{minHeight: '100vh'}}>
                    <h1 className='text-center  py-lg-5 py-3 mountains-of-christmas-regular'>Go With Your Mood <i className="fi fi-br-portal-exit ps-2 iconColor"></i> </h1>
                        <div className="container d-flex justify-content-center align-items-center" >
                        <div className="row w-100" >
                            <div className="col-lg-6 col-12 my-3">
                                <Link to = "/play-with-friends">
                                <div className="card p-3 text-center">
                                   <h1 className='mountains-of-christmas-regular headingHeight2'> Play With  <br />Friend </h1>
                                   <i className="fi fi-sr-users headingHeight iconColor"></i>
                                </div>
                                </Link>
                            </div>
                            <div className="col-lg-6 col-12 my-3">
                            <div className="card p-3 text-center">
                                   <h1 className='mountains-of-christmas-regular headingHeight2 '> Play With  <br />AI </h1>
                                   <i className="fi fi-sr-user-robot headingHeight iconColor"></i>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </>
                :
                <>

                    <div className="container-fluid g-0 design">
                        <div className="row g-0 my-3">
                            <div className="col-lg-7 col-12 py-lg-5 ">
                                <div className="py-lg-5 ps-lg-5 p-2">
                                    <h1 className="mountains-of-christmas-regular headingHeight">Unleash Your Strategic Genius with Gomoku!"</h1>
                                    <h6 className='my-3'>Challenge Your Mind, Dominate the Board, and Conquer Your Opponents!</h6>
                                    <Link to="/Register">  <div className="btn text-capitalize rounded-8">get Strarted</div> </Link>
                                </div>
                            </div>
                            <div className="col-lg-5 col-12">
                                <img src="img/hero1.png" alt="dashboard" className='img-fluid w-100' loading='lazy' />
                            </div>
                        </div>

                        <div className="row g-0 my-3 mobileViewDashboard">
                            <div className="col-lg-6 col-12">
                                <img src="img/hero4.png" alt="dashboard" className='img-fluid w-100' loading='lazy' />
                            </div>
                            <div className="col-lg-6 col-12 py-lg-5 ">
                                <div className="py-lg-5 ps-lg-5 p-2">
                                    <h1 className="mountains-of-christmas-regular headingHeight2">Challenge the AI: Test Your Skills Against Gomoku's Intelligent Opponent.</h1>
                                    <h6 className='my-3'>Dive into an engaging battle of wits as you face off against our advanced AI model in Gomoku. With every move, you'll experience the strategic depth and cunning of a formidable opponent designed to challenge and improve your skills. Can you outsmart the computer and claim victory?</h6>
                                </div>
                            </div>

                        </div>

                        <div className="row g-0 my-3">
                            <div className="col-lg-7 col-12 py-lg-5 ">
                                <div className="py-lg-5 ps-lg-5 p-2">
                                    <h1 className="mountains-of-christmas-regular headingHeight">Mastermind Strategies:       The Ultimate Test of Wits"</h1>
                                    <h6>Dive into the world of Gomoku and challenge your intellect with our crucial mastermind strategies. Sharpen your wits, plan your moves, and outthink your opponents in this engaging and strategic boardgame experience.</h6>
                                </div>
                            </div>
                            <div className="col-lg-5 col-12">
                                <img src="img/hero2.png" alt="dashboard" className='img-fluid w-100' loading='lazy' />
                            </div>
                        </div>


                        <div className="row g-0 my-3 mobileViewDashboard">
                            <div className="col-lg-6 col-12">
                                <img src="img/hero3.png" alt="dashboard" className='img-fluid w-100' loading='lazy' />
                            </div>
                            <div className="col-lg-6 col-12 py-lg-5 ">
                                <div className="py-lg-5 ps-lg-5 p-2">
                                    <h1 className="mountains-of-christmas-regular headingHeight2">Feel the Thrill of Victory in Gomoku</h1>
                                    <h6 className='my-3'> Every match in Gomoku is designed to bring a smile to your face, whether you're winning or simply enjoying the strategic challenge. Celebrate your victories and relish the happiness that comes from playing a game that rewards skill and intellect. Join our community of happy players and share the joy of Gomoku!</h6>
                                </div>
                            </div>

                        </div>

                    </div>

                </>
            }
        </>
    )
}

export default HomePage