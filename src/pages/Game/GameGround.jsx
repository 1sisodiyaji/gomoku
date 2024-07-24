import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import config from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import playSound from "../../component/SoundManager";

const GameGround = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [copy, setCopy] = useState(false);
  const [played, setPlayed] = useState(false);
  const [newBoard, setNewBoard] = useState(
    Array(15)
      .fill(null)
      .map(() => Array(15).fill(null))
  );
  const [winner, setWinner] = useState(null);
  const [isClickable, setIsClickable] = useState(true);
  const audioRef = useRef(null); // Ref to manage audio element

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(
          `${config.BASE_URL}/game/game-details?gameId=${gameId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setGameDetails(data.gameDetails);
        setWinner(data.gameDetails.winner);

        if (data.gameDetails.winner) {
          playSoundBasedOnResult(data.gameDetails.winner);
        }
      } catch (error) {
        toast.error(error.message, { theme: "dark" });
        console.error("Error fetching game details:", error.message);
      }
    };

    const fetchUpdates = async () => {
      try {
        const response = await fetch(
          `${config.BASE_URL}/game/check-updates?gameId=${gameId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data && data.playersCordinate) {
          const { player1Input, player2Input, currentPlayer, winner } = data.playersCordinate;
          const updatedBoard = [...Array(15)].map(() => Array(15).fill(null));

          player1Input.forEach(({ row, col }) => {
            updatedBoard[row][col] = 1;
          });

          player2Input.forEach(({ row, col }) => {
            updatedBoard[row][col] = 2;
          });

          setNewBoard(updatedBoard);
          setCurrentPlayer(currentPlayer);
          setWinner(winner);

          if (winner) {
            playSoundBasedOnResult(winner);
          }
        }
      } catch (error) {
        console.error("Error checking updates:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchGameData();
      fetchUpdates();
    }, 200);

    return () => {
      clearInterval(intervalId);
      stopAllSounds(); // Stop sound on component unmount
    };
  }, [gameId]);

  useEffect(() => {
    if (!played) {
      playSound('alert');
      setPlayed(true);
    }
  }, []);

  const playSoundBasedOnResult = (winner) => {
    if (winner === 1) {
      playSound('celebration'); // Play win sound
    } else if (winner === 2) {
      playSound('lose'); // Play lose sound
    }
  };

  const stopAllSounds = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleClick = async (row, col) => {
    if (!isClickable || winner || newBoard[row][col] !== null) return;

    setIsClickable(false); // Prevent further clicks until server responds

    const updatedBoard = [...newBoard];
    updatedBoard[row][col] = currentPlayer;
    setNewBoard(updatedBoard);

    try {
      playSound('click'); // Play click sound when a cell is clicked
      const response = await fetch(`${config.BASE_URL}/game/store-coordinate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId: gameId, row, col, currentPlayer }),
      });
      const data = await response.json(); 
    } catch (error) {
      toast.error(error, { theme: "dark" });
      console.error("Error find coordinate:", error);
    } finally {
      setIsClickable(true); // Re-enable clicks after server responds
    }
  };

  const handleWinnerName = (winner) => {
    if (winner === 1) {
      return gameDetails && gameDetails.playerName1;
    } else if (winner === 2) {
      return gameDetails && gameDetails.playerName2;
    }
    return "";
  };

  const handleCopyGameId = () => { 
    setCopy(true);
    navigator.clipboard.writeText(gameId);
    toast.info("Game ID copied to clipboard!", { theme: "dark" }); 
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopAllSounds();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <ToastContainer />
      {winner ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="bg-success px-4 py-3">
            <div className="rounded-lg">
              <h1 className="fw-bold text-center my-4 ">
                Winner : {handleWinnerName(winner)}
              </h1>
              <Link to="/dashboard" className="text-light">
                <h3>
                  Move to Dashboard <i className="fi fi-br-sign-in-alt pe-2"></i>
                </h3>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container-fluid g-0 design">
            <div className="row g-0">
              <div className="col-md-4 d-md-block d-none">
                <div className="p-3 ">
                  <p>Player 1 :</p>
                  <h6 className="p-3 bg-dark rounded-4 shadow-lg">
                    {gameDetails && gameDetails.playerName1}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card mb-3 text-center m-1">
                  <h5 className="card-header">
                    Game ID :{" "}
                    <span
                      onClick={handleCopyGameId}
                      className={`border border-dark py-2 px-4 rounded-6 ${copy ? 'bg-success' : 'bg-transparent'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {gameId} <i className="fi fi-sr-copy-alt"></i>
                    </span>
                  </h5>
                  <div className="card-body">
                    <p>
                      Current Player :{" "}
                      <span className="py-2 bg-warning px-4 rounded-6">
                        {currentPlayer && currentPlayer === 1
                          ? gameDetails && gameDetails.playerName1
                          : gameDetails && gameDetails.playerName2}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-md-block d-none">
                <div className="p-3 ">
                  <p>Player 2 :</p>
                  <h6 className="p-3 bg-dark rounded-4 shadow-lg">
                    {gameDetails && gameDetails.playerName2}
                  </h6>
                </div>
              </div>
            </div>

            <div className="container d-flex justify-content-center p-2">
              <div className="border p-2 rounded-6 ">
                {newBoard.map((row, rowIndex) => (
                  <div key={rowIndex} className="d-flex">
                    {row.map((cell, cellIndex) => (
                      <div key={cellIndex}>
                        <button
                          className={`boardCell ${
                            cell === 1
                              ? "bg-primary text-light "
                              : cell === 2
                              ? "bg-secondary text-black"
                              : "bg-light"
                          }`}
                          onClick={() => handleClick(rowIndex, cellIndex)}
                          disabled={winner || cell !== null}
                        >
                          {cell === 1 ? "X" : cell === 2 ? "O" : ""}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GameGround;
