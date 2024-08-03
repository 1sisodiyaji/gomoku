import { useEffect, useState } from "react";
import React from "react";
import Helmet from "react-helmet";
import { useNavigate , Link } from "react-router-dom";
import GetIdFromToken from "../../config/GetIdFromToken";
import GetNameFromToken from "../../config/GetNameFromToken";
import config from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");  
  const [id, setId] = useState(); 

  async function getId() {
    const id = await GetIdFromToken();
    setId(id);
  }
  async function getName() {
    const name = await GetNameFromToken();
    setPlayerName(name);
  }

  useEffect(() => {
    getId();
    getName();
  }, []);

  const generateCodeId = async () => {
    if(!playerName) {
        toast.warn("Please enter your name !", { theme: "dark" });
        return;
    }
    try { 
      const response = await fetch(`${config.BASE_URL}/game/generate-game-id-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerName1: playerName , id : id ,playerName2 : "Gomoku Ai" , playerName2ID : "66a0fd50afaf59d211da0be4" }),
      });
      if(response.status === 201){
        toast.success("Game Created Successfully..",{theme: 'dark'})
        const data = await response.json(); 
        navigate(`/play-with-GomokuAi/${data.newGame.gameId}`);
      }else{ 
        toast.error(response.statusText, { theme: "dark" });
      }
     
    } catch (error) {
      console.error("Error creating game:", error);
      toast.error(error, { theme: "dark"}); 
    }
  };

  return (
    <>
    <ToastContainer/>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Gomoku" content="Gomoku" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Lets Be a part of Gomoku , try your strategical move to play wisely and become a champion."
        />
        <title>Dashboard | Gomoku</title>
        <meta property="og:title" content="Dashboard | Gomoku" />
        <meta
          property="og:description"
          content="Lets Be a part of Gomoku , try your strategical move to play wisely and become a champion."
        />
        <meta property="og:image" content="https://Gomoku.com/img/logo.png" />
        <meta property="og:url" content="https://Gomoku.com" />
        <meta property="og:type" content="gaming-Website" />
        <link
          rel="icon"
          type="image/png"
          href="https://Gomoku.com/img/favicon.ico"
          sizes="32x32"
        />
      </Helmet>
      <div
        className="container-fluid g-0 design"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-center  py-lg-5 py-3 mountains-of-christmas-regular">
          Go With Your Mood{" "}
          <i className="fi fi-br-portal-exit ps-2 iconColor"></i>{" "}
        </h1>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row w-100">
            <div className="col-lg-6 col-12 my-3">
              <Link to="/play-with-friends">
                <div className="card p-3  d-flex justify-content-center align-items-center">
                  <h1 className="mountains-of-christmas-regular headingHeight2">   Play With  Friend  </h1> 
                    <img src="img/CardFriend.png" className="img-fluid" style={{height:'150px' , width: '150px'}} alt="" /> 
                 
                </div>
              </Link>
            </div>
            <div className="col-lg-6 col-12 my-3">
              <Link to = "/play-with-GomokuAi">
              <div className="card p-3 d-flex justify-content-center align-items-center"  onClick={generateCodeId}>
                <h1 className="mountains-of-christmas-regular headingHeight2 ">
 
                  Play With   AI 
                </h1>
                <img src="img/cardAi.png" className="img-fluid" style={{height:'150px' , width: '150px'}} alt="" /> 
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
