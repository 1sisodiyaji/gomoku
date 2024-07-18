import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import config from '../../config/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Board.css';

const GameGround = () => {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [newBoard, setNewBoard] = useState(Array(15).fill(null).map(() => Array(15).fill(null)));
  const [winner, setWinner] = useState(null);
  const [isClickable, setIsClickable] = useState(true);

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
      } catch (error) {
        console.error('Error fetching game details:', error.message);
        toast.error(error.message, { theme: 'dark' });
      }
    };

    fetchGameDetails();
  }, [gameId]);

  useEffect(() => {
    const fetchWinnerDetails = async () => {
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

        if (data.gameDetails.winner === 1 || data.gameDetails.winner === 2) {
          setWinner(data.gameDetails.winner);
        }
      } catch (error) {
        console.error('Error fetching winner details:', error.message);
      }
    };

    fetchWinnerDetails();
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
        body: JSON.stringify({ gameId, row, col, currentPlayer }),
      });

      if (!response.ok) {
        throw new Error('Failed to store coordinates');
      }
    } catch (error) {
      console.error('Error storing coordinates:', error);
    }
  };

  const handleWinnerName = (winner) => {
    if (winner === 1) {
      return gameDetails.playerName1;
    } else if (winner === 2) {
      return gameDetails.playerName2;
    }
    return '';
  };

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div>
        <div className='container-fluid g-0 design'>
          <div className="d-flex justify-content-between align-items-center">
            <div className='ps-2 text-center'>
              <h5>You</h5>
              <span className='fw-medium'>{gameDetails.playerName1} </span>
            </div>
            <div>
              <h3 className='fw-bold '>Game ID :
                <span style={{fontSize: '1rem'}} className='mx-2'>{gameDetails.gameId}</span>
              </h3>
            </div>
            <div className='pe-2 text-center'>
              <h5>Opponent</h5>
              <span className='fw-medium'>{gameDetails.playerName2} </span>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-center align-items-center mt-5'>
          <div className='board'>
            {newBoard.map((row, rowIndex) => (
              <div key={rowIndex} className='flex'>
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`cell ${cell === null ? 'pointer' : 'not-allowed'}`}
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
            <h2 className='fw-bold'>Current Player :</h2>
            <h1 className='fw-medium '>{currentPlayer}</h1>
          </div>
        </div>

        {winner && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">Winner:</h2>
              <p className="text-xl font-medium text-center">{handleWinnerName(winner)}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GameGround;
