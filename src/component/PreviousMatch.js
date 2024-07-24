import React, { useEffect, useState } from "react";
import GetIdFromToken from "../config/GetIdFromToken";
import GetNameFromToken from "../config/GetNameFromToken";
import axios from "axios";
import config from "../config/config";

const PreviousMatch = () => {
  const [id, setId] = useState(null);
  const [gamedata, setGamedata] = useState([]);
  const [username , setUsername] = useState(null);
  const [message, setMessage] = useState("");

  async function getId() {
    const id = await GetIdFromToken();
    setId(id);
  }

  async function getName() {
    const name = await GetNameFromToken();
    setUsername(name);
  }


  async function checkPreviousMatch() { 
    if (!id) return;
    const response = await axios.post(`${config.BASE_URL}/game/all-matches`, JSON.stringify({ id }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });  
  if(response.data.game.length === 0){
    setMessage("You have not Played any match , Please try once !");
  }
    setGamedata( response.data.game);
  }

  useEffect(() => {
    getId();
    getName();
  }, []);

  useEffect(() => {
    if (!id) return;

    const intervalId = setInterval(checkPreviousMatch, 500); 
    return () => clearInterval(intervalId);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return    <div className="text-center">   <small>{time}</small> <br/>
    <small>{day}</small>
 
  </div>;
  };

 
  return (
    <>
      <div className="container-fluid g-0 design">
        <div className="card  p-3 my-4 m-1">
          <h3> 
            Previous matches <i className="fi fi-br-time-past"></i>{" "}
          </h3>
          <div>
            {message && message}
            {gamedata && gamedata.map((game) => (
              <div
                key={game._id}
                className={`${(game.status === 'Win') && (game.winner.name === username) ? 'bg-success ' : 'bg-danger '}p-3 my-2 rounded-4 shadow-lg`}
              >
                <div className="d-flex justify-content-around">
                  <p className={`border px-4 py-2 rounded-8 shadow-lg ${game.winner && game.winner.name === game.playerName1 ? 'bg-success' : ''} `}> {game.playerName1} </p>
                  <h3> Vs </h3>
                  <p className={`border px-4 py-2 rounded-8 shadow-lg ${game.winner && game.winner.name === game.playerName2 ? 'bg-success' : ''} `}> {game.playerName2} </p>
                </div>
                <div className="d-flex justify-content-around">
                  <small> Created By: <span className="text-decoration-underline">   {game.AuthorID.name}  </span> </small>
                  <h6> {game.winner ? <p> Winner: {game.winner.name}</p> : `No Winner ☠️`} </h6>
                  <small> {formatDate(game.createdOn)} </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousMatch;