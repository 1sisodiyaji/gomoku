import React, { useEffect, useState } from "react";
import GetIdFromToken from "../config/GetIdFromToken";
import axios from "axios";
import config from "../config/config";

const Rewards = () => {
  const [id, setId] = useState(null);
  const [gamedata, setGamedata] = useState([]);
  const [winCount, setWinCount] = useState(0);

  async function getId() {
    const id = await GetIdFromToken(); 
    setId(id);
  }

  async function checkPreviousMatch() {
    if (!id) return;
    const response = await axios.post(`${config.BASE_URL}/game/all-matches`, JSON.stringify({ id }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setGamedata(response.data.game);
    setWinCount(response.data.game.filter((game) => (game.status === 'Win') && (game.winner.name === game.AuthorID.name)).length);
  }

  useEffect(() => {
    getId();  
  }, []);

  
  useEffect(() => {
    if (!id) return;

    const intervalId = setInterval(checkPreviousMatch, 2000); 
    return () => clearInterval(intervalId);
  }, [id]);


  let badge;
  let badgeIcon;

  if (winCount === 1) {
    badge = 'Achiever Badge';
    badgeIcon = <i className="fi fi-ss-leadership"></i>;
  } else if (winCount <= 3) {
    badge = 'Trailblazer Ribbon ';
    badgeIcon = <i className="fi fi-sr-badge"></i>;
  } else if (winCount <= 5) {
    badge = "Champion's Laurel";
    badgeIcon = <i className="fi fi-sr-ranking-star"></i>;
  } else if (winCount <= 10) {
    badge = 'Legendary Crown';
    badgeIcon = <i className="fi fi-sr-award"></i>;
  } else if (winCount >= 11) {
    badge = 'Ultimate Badge of Honor';
    badgeIcon = <i className="fi fi-sr-dragon"></i>;
  } else {
    badge = 'No badge earned yet!';
  }

  return (
    <div className="card p-3 design">
      <h2>Rewards <i className="fi fi-sr-trophy-star ps-2"></i></h2>
      <p>You have earned {winCount} wins!</p>
      <p>Your badge is : <span className="border py-2 px-4 rounded-6 bg-success shadow-lg">{badge} {badgeIcon}</span></p>
    </div>
  );
};

export default Rewards;