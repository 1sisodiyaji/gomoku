import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { playSound, stopAllSounds } from "../../component/SoundManager"; 

const PlayWithAi = () => {
  const { gameId } = useParams(); 
  const [gameDetails, setGameDetails] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [copy, setCopy] = useState(false); 
  const [played, setPlayed] = useState(false);
  const [newBoard, setNewBoard] = useState( 
    Array(15)
     .fill(null) 
     .map(() => Array(15).fill(null)));
  const [winner, setWinner] = useState(null);
  const [isClickable, setIsClickable] = useState(true);
  const [lastClicked, setLastClicked] = useState(null); // Track last clicked cell
  const [lastAiMove, setLastAiMove] = useState(null); // Track AI's last move

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
          clearInterval(intervalId);
          playSound(data.gameDetails.winner === '66a0fd50afaf59d211da0be4' ? 'lose' : 'celebration');
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
          const { player1Input, player2Input, currentPlayer, winner } =
            data.playersCordinate;
          const updatedBoard = Array(15).fill().map(() => Array(15).fill(null));

          player1Input.forEach(({ row, col }) => {
            updatedBoard[row][col] = 1;
          });

          player2Input.forEach(({ row, col }) => {
            updatedBoard[row][col] = 2;
          });

          setNewBoard(updatedBoard);
          setCurrentPlayer(currentPlayer);
          setWinner(winner);
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
      stopAllSounds();
    };
  }, [gameId]);

  useEffect(() => {
    if (!played) {
      playSound('alert'); 
      setPlayed(true);
    }
  }, []);

  const handleClick = async (row, col) => {
    if (!isClickable || winner || newBoard[row][col] !== null || currentPlayer === 2) return;

    setLastClicked({ row, col }); // Set last clicked cell
    setIsClickable(false);

    const updatedBoard = [...newBoard];
    updatedBoard[row][col] = currentPlayer;
    setNewBoard(updatedBoard);

    try { 
      playSound('click');
      const response = await fetch(`${config.BASE_URL}/game/store-coordinate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId: gameId, row, col, currentPlayer }),
      });
      const data = await response.json(); 

      if (!winner) {
        const boardForAI = updatedBoard.map(row => row.map(cell => (cell === null ? 0 : cell)));

        const aiResponse = await fetch(`${config.BASE_URL}/game/ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ board: boardForAI, player: 1, opponent: 2 }),
        });
        const aiData = await aiResponse.json();

        const { row: aiRow, col: aiCol } = aiData;
        if (aiRow !== undefined && aiCol !== undefined) {
          const newBoardWithAI = [...updatedBoard];
          newBoardWithAI[aiRow][aiCol] = 2; // Mark AI's move
          setNewBoard(newBoardWithAI);
          setLastAiMove({ row: aiRow, col: aiCol }); // Set last AI move

          const updateResponse = await fetch(`${config.BASE_URL}/game/store-coordinate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameId: gameId, row: aiRow, col: aiCol, currentPlayer: 2 }),
          });
          const updateData = await updateResponse.json();  
          setCurrentPlayer(1);
        }
      }
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
      console.error("Error handling move:", error);
    } finally {
      setIsClickable(true); // Re-enable clicks after server responds
    }
  };

  const handleWinnerName = (winner) => {
    if (winner === 1) {
      return gameDetails && gameDetails.playerName1;
    } else if (winner === 2) {
      return "Gomoku-AI";
    }
    return "";
  };

  const handleCopyGameId = () => { 
    setCopy(true);
    navigator.clipboard.writeText(gameId);
    toast.info("Game ID copied to clipboard!", { theme: "dark" }); 
  };

  return (
    <>
      <ToastContainer />
      {winner ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="bg-success  px-4 py-3">
            <div className="  rounded-lg">
              <h1 className="fw-bold text-center my-4 ">
                Winner : {handleWinnerName(winner)}
              </h1>
              <div className="text-center my-3">
              <img src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1722667204/blog-app/trophy_sm5qv9.png" className="bg-image hover-zoom" alt="trophy" />
              </div>
              <Link to="/dashboard" className="text-light">
                <h3> 
                  Move to Dashboard{" "}
                  <i className="fi fi-br-sign-in-alt pe-2"></i>{" "}
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
                  <h6 className="p-3  bg-dark rounded-4 shadow-lg">
                    {gameDetails && gameDetails.playerName1}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card mb-3 text-center m-1">
                  <h5 className="card-header">Game ID : <span onClick={handleCopyGameId} className={`border border-dark py-2 px-4 rounded-6 ${copy ? 'bg-success' : 'bg-transparent'}`} style={{cursor: 'pointer'}}> {gameId} <i className="fi fi-sr-copy-alt"></i> </span> </h5>
                  <div className="card-body">
                    <p>
                      Current Player :{" "}
                      <span className="py-2 bg-warning px-4 rounded-6">
                        {currentPlayer === 1
                          ? gameDetails && gameDetails.playerName1
                          : "AI"}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-md-block d-none">
                <div className="p-3 ">
                  <p>Player 2 :</p>
                  <h6 className="p-3  bg-dark rounded-4 shadow-lg">
                    AI
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
                              ? "bg-primary text-light"
                              : cell === 2
                              ? `bg-secondary text-black ${lastAiMove && lastAiMove.row === rowIndex && lastAiMove.col === cellIndex ? 'border border-3 border-warning' : ''}`
                              : "bg-light"
                          } ${lastClicked && lastClicked.row === rowIndex && lastClicked.col === cellIndex ? 'border border-3 border-warning' : ''}`}
                          onClick={() => handleClick(rowIndex, cellIndex)}
                          disabled={winner || cell !== null || currentPlayer === 2}
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

export default PlayWithAi;
