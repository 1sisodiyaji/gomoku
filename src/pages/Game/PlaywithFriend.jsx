import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import GetIdFromToken from "../../config/GetIdFromToken";
import config from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlayWithFriend() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState(""); 
  const [gameId, setGameId] = useState("");
  const [playerName2, setPlayerName2] = useState("");
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  async function getId() {
    const id = await GetIdFromToken();
    setId(id);
  }

  useEffect(() => {
    getId();
  }, []);

  const onChangePlayerName1 = (e) => {
    e.preventDefault();
    setPlayerName(e.target.value);
  };

  const onChangePlayerName2 = (e) => {
    e.preventDefault();
    setPlayerName2(e.target.value);
  };

  const onChangeGameId = (e) => {
    e.preventDefault();
    setGameId(e.target.value);
  };

  const generateCodeId = async () => {
    if(!playerName) {
        toast.warn("Please enter your name !", { theme: "dark" });
        return;
    }
    try {
      setLoading(true); 
      const response = await fetch(`${config.BASE_URL}/game/generate-game-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerName1: playerName , id : id}),
      });
      if(response.status === 201){
        toast.success("Game Created Successfully..",{theme: 'dark'})
        const data = await response.json();
        setLoading(false); 
        navigate(`/gameground/${data.newGame.gameId}`);
      }else{
        setLoading(false);
        toast.error(response.statusText, { theme: "dark" });
      }
     
    } catch (error) {
      console.error("Error creating game:", error);
      toast.error(error, { theme: "dark"});
      setLoading(false);
    }
  };

  const sendGameIdByPlayer2 = async () => {
    if(!gameId){
        toast.warn("Please enter game ID!", { theme: "dark" });
        return;
    }
    if(!playerName2){
        toast.warn("Please enter your name!", { theme: "dark" });
        return;
    }
    try {
        setLoading2(true);
      const response = await fetch(`${config.BASE_URL}/game/check-game-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId: gameId, playerName2: playerName2 , id : id}),
      });
      if(response.status === 200){
        const data = await response.json();
        toast.success("Movinf to Playground!", { theme: "dark" });
        setLoading2(false);
        setGameId(data.game.gameId);
        navigate(`/gameground/${data.game.gameId}`);
      }else{
        setLoading2(false);
        toast.error(response.statusText, { theme: "dark" });
      }
     
    } catch (error) {
      console.error("Error joining game:", error);
      setLoading2(false);
      toast.error(error, { theme: "dark" });
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="container design g-0" style={{ minHeight: "100vh" }}>
      <div className="text-center py-lg-4 py-3">
        <h1 className="">GOMOKU</h1>
      </div>

      <div className="row">

        <div className="col-lg-6 col-md-6 col-12">
          <div className="card p-3 my-2">
            <div className="d-flex justify-content-center my-3">
              <img
                src="img/dummyPerson.svg"
                alt="person"
                loading="lazy"
                className="img-fluid "
                style={{ height: "210px" }}
              />
            </div>
            <div className="d-flex">
              <label htmlFor="PlayerName" className=" fw-bold">
                PlayerName:
              </label>
              <input
                type="text"
                name="PlayerName"
                required 
                placeholder="Please Enter your name to start game 🎮..."
                className="p-2 form-control w-100 ms-2"
                value={playerName}
                onChange={onChangePlayerName1}
              />
            </div>
           
              {loading ? (
                <>
                <button
              type="submit"
              className="btn my-3 text-capitalize disabled"
              onClick={generateCodeId}
            >
                  creating the game playground for you
                  <span
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  </button>
                </>
              ) : (
                <button
                type="submit"
                className="btn my-3 text-capitalize"
                onClick={generateCodeId}
              >
                Create a Game 🎮
                </button>
              )}
            
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12">
        <div className="card p-3 my-2">
            <div className="d-flex justify-content-center align-items-center">
            <img src="img/team.png" alt="team" className="img-fluid"  style={{height: '200px'}}/>
            </div>
          <div className="d-flex my-2">
            <label htmlFor="gameId" className="fw-bold">
              GameId: 
            </label>
            <input
              type="text"
              name="gameId"
              required
              placeholder="please enter the Game Id of your friend"
              className="form-control w-100"
              value={gameId}
              onChange={onChangeGameId}
            />
          </div>
          <div className="d-flex my-3">
            <label htmlFor="playerName2" className="fw-bold">
              PlayerName:
            </label>
            <input
              type="text"
              name="playerName2"
              required
              placeholder="Please enetr your name .."
              className="form-control w-100"
              value={playerName2}
              onChange={onChangePlayerName2}
            />
          </div>

         
          {loading2 ? 
          <>
           <button
            type="submit"
            className="btn text-capitalize disabled"
          >
            Joining the Game ...
            <span
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
          </button>
          </>
          :
          <>
           <button
            type="submit"
            className="btn text-capitalize"
            onClick={sendGameIdByPlayer2}
          >
            Join Game
          </button>
          
          </>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PlayWithFriend;
