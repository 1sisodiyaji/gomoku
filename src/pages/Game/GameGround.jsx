import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import config from '../../config/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Board.css';

const GameGround = () => {
  const { gameId } = useParams();
  const [GameDetails, setGameDetails] = useState();
  const [checkgameid, setGameId] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [newBoard, setNewBoard] = useState(Array(15).fill(null).map(() => Array(15).fill(null)));
  const [winner, setWinner] = useState(null);
  const [isClickable, setIsClickable] = useState(true); 

  const socket = io(`${config.BASE_URL}`); 

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/game/game-details?gameId=${gameId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }

        const data = await response.json();
        setGameDetails(data.gameDetails);
        if (data.gameDetails.playerName2) {
          clearInterval(intervalId);
        }
      } catch (error) {
        toast.error(error.message ,{theme: 'dark'});
        console.error('Error fetching game details:', error.message);
      }
    };

    fetchGameDetails(); 
    const intervalId = setInterval(fetchGameDetails, 1000);

    return () => clearInterval(intervalId);
  }, [gameId]);


  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/game/winner-details?gameId=${gameId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }

        const data = await response.json();
        setGameId(data.gameDetails);
        console.log(checkgameid);
        if (data.gameDetails.winner === 1 || data.gameDetails.winner === 2) {
          setWinner(data.gameDetails.winner);
        }

      } catch (error) {
        toast.error(error ,{theme: 'dark'});
        console.error('Error fetching game details:', error.message);
      }
    };

    fetchGameDetails();
    const intervalId = setInterval(fetchGameDetails, 1000);

    return () => clearInterval(intervalId);
  }, [gameId]);



  useEffect(() => {
    const socket = io(`${config.BASE_URL}`);
    socket.on('move', ({ row, col, player }) => {
      const updatedBoard = [...newBoard];
      updatedBoard[row][col] = player;
      setNewBoard(updatedBoard);
      setCurrentPlayer(player === 1 ? 2 : 1);
      setIsClickable(true);
    });

    return () => {
      socket.off('move');
    };
  }, [newBoard]);

  const handleClick = async (row, col) => {
    if (!isClickable || winner || newBoard[row][col] !== null) return;

    setIsClickable(false);
    const updatedBoard = [...newBoard];
    updatedBoard[row][col] = currentPlayer;
    setNewBoard(updatedBoard);

    try {
      const response = await fetch(`${config.BASE_URL}/game/store-coordinate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: gameId, row, col, currentPlayer }),
      });
      const data = await response.json();
      console.log('coordinate is ok ' + data);
    }

    catch (error) {
      toast.error(error ,{theme: 'dark'});
      console.error('Error find coordinate:', error);
    }
    socket.emit('move', { row, col, player: currentPlayer });


  };


  const gameDetails = Array.isArray(GameDetails) ? GameDetails : [GameDetails];
  if (!GameDetails) {
    return <div>Loading...</div>; // Placeholder for loading state
  }
 
  const handleWinnerName = (winner) => {
    if (winner === 1) {
      console.log("winner is :",GameDetails.playerName1);
      return GameDetails.playerName1;
    } else if (winner === 2) {
      return GameDetails.playerName2;
    }
    return '';
  }; 
 


  return (
    <>
      <ToastContainer />
      {winner ? 
      <>
      <div className="vh-100 d-flex align-items-center justify-content-center">
       <div className="bg-success  px-4 py-3">
            <div className="  rounded-lg">
              <h1 className="fw-bold text-center my-4 ">Winner : {handleWinnerName(winner)}</h1> 
              <Link to= "/" className='text-light' >
              <h3> Move to Dashboard <i className="fi fi-br-sign-in-alt pe-2"></i> </h3>
              </Link>
            </div>
      </div>
      </div>
       

        </>
        :
        <>
      
      <div className='container-fluid g-0 design'>
        {gameDetails.map((gameDetail, index) => (
          <div className="d-flex justify-content-between align-items-center">
            <div className='ps-2 text-center'>
              <h5>Player 1</h5>
              <span className='fw-medium'>{gameDetail.playerName1}</span>
            </div>
            <div>
              <h3 className='fw-bold '>Game ID:
                <span style={{fontSize: '1rem'}} className='mx-2'>{gameDetail.gameId}</span>
              </h3>
            </div>
            <div className='pe-2 text-center'>
              <h5>Player 2</h5>
              <span className='fw-medium'>{gameDetail.playerName2}</span>
            </div>
          </div>
        ))}
        </div>

        <div className='d-flex justify-content-center align-items-center mt-5'>
          <div className='border border-secondary'>
            {newBoard.map((row, rowIndex) => (
              <div key={rowIndex} className='d-flex'>
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`bg-transparent border border-secondary d-flex align-items-center justify-content-center  ${cell === 1 ? 'bg-black' : (cell === 2 ? 'bg-white' : 'bg-secondary') }` } style={{height: '20px' , width: '20px', cursor: 'pointer'}}
                    onClick={() => handleClick(rowIndex, colIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className='ms-4'>
          <div className='d-flex gap-4 pt-4 pl-4'>
            <h2 className='fw-bold'>Current Player:</h2>
            <h1 className='fw-medium'>{currentPlayer}</h1>
          </div>
        </div>
        
      </>
      }
    </>
  );
};

export default GameGround;
