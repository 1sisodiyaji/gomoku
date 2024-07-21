import React, { useEffect, useState } from "react";
import GetIdFromToken from "../config/GetIdFromToken";
import axios from "axios";
import config from "../config/config";

const PreviousMatch = () => {
  const [id, setId] = useState();
  const [gamedata, setGamedata] = useState([]);

  async function getId() {
    const id = await GetIdFromToken();
    setId(id);
  }

  async function checkPreviousMatch() { 
    const response = await axios.post(`${config.BASE_URL}/game/all-matches`, JSON.stringify({ id }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
    console.log((await response).data.game);
    setGamedata((await response).data.game);
  }

  useEffect(() => {
    getId();
    checkPreviousMatch();
  },[id]);

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
            {" "}
            Previous matches <i className="fi fi-br-time-past"></i>{" "}
          </h3>
          <div>
            {gamedata.map((game) => (
              <div
                key={game._id}
                className={`${game.status === 'win' ? 'bg-success ' : 'bg-danger '}p-3 my-2 rounded-4 shadow-lg`}
              >
                <div className="d-flex justify-content-around">
                  <p className="border px-4 py-2 rounded-8 shadow-lg"> {game.playerName1} </p>
                  <h3> Vs </h3>
                  <p className="border px-4 py-2 rounded-8 shadow-lg"> {game.playerName2} </p>
                </div>
                <div className="d-flex justify-content-around">
                  <small> Created By: <span className="text-decoration-underline">   {game.AuthorID.name}  </span> </small>
                  <h3> {game.winner ? <p> Winner: {game.winner.name}</p> : `Loser ☠️`} </h3>
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