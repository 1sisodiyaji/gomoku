import React from 'react'

const Rules = () => {
  return (
    <div className="container design g-0">
    <h1 className='text-center py-lg-5 py-3'>Gomoku Rules</h1>

    <h2>Freestyle Gomoku</h2>
    <ul>
        <li><strong>Board</strong>: Played on a 19x19 grid (Go board), though smaller boards like 15x15 are also common.</li>
        <li><strong>Players</strong>: Two players, Black and White.</li>
        <li><strong>Starting Move</strong>: Black goes first.</li>
        <li><strong>Moves</strong>: Players take turns placing one stone of their color on an empty intersection of the grid.</li>
        <li><strong>Objective</strong>: The first player to align five of their stones in a row, either horizontally, vertically, or diagonally, wins.</li>
        <li><strong>No Restrictions</strong>: There are no additional restrictions; any alignment of five or more stones in a row wins.</li>
    </ul>

    <h2>Standard Gomoku</h2>
    <ul>
        <li><strong>Board</strong>: Played on a 19x19 grid (Go board), though smaller boards like 15x15 are also common.</li>
        <li><strong>Players</strong>: Two players, Black and White.</li>
        <li><strong>Starting Move</strong>: Black goes first.</li>
        <li><strong>Moves</strong>: Players take turns placing one stone of their color on an empty intersection of the grid.</li>
        <li><strong>Objective</strong>: The first player to align five of their stones in a row, either horizontally, vertically, or diagonally, wins.</li>
    </ul>

    <h2>Renju</h2>
    <ul>
        <li><strong>Board</strong>: Played on a 15x15 grid.</li>
        <li><strong>Players</strong>: Two players, Black and White.</li>
        <li><strong>Starting Move</strong>: Black goes first.</li>
        <li><strong>Moves</strong>: Players take turns placing one stone of their color on an empty intersection of the grid.</li>
        <li><strong>Objective</strong>: The first player to align five of their stones in a row, either horizontally, vertically, or diagonally, wins.</li>
        <li><strong>Additional Restrictions</strong>:
            <ul>
                <li><strong>Forbidden Moves for Black</strong>:
                    <ul>
                        <li><strong>Double-three</strong>: Black cannot create two open rows of three stones simultaneously.</li>
                        <li><strong>Double-four</strong>: Black cannot create two rows of four stones simultaneously.</li>
                        <li><strong>Overline</strong>: Black cannot form a line of more than five stones in a row (six or more).</li>
                    </ul>
                </li>
                <li><strong>Opening Rules</strong>: There are specific opening move sequences to balance the advantage of going first. One common opening rule is the <strong>RIF opening rule</strong>:
                    <ul>
                        <li>Black places the first stone at the center of the board.</li>
                        <li>White places the second stone anywhere on the board.</li>
                        <li>Black places the third stone within a specified region around the center.</li>
                        <li>White places the fourth stone anywhere on the board.</li>
                        <li>Black places the fifth stone within a specified region around the center.</li>
                        <li>From the sixth move onward, players place stones alternately without restrictions (other than the forbidden moves for Black).</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>

    </div>
  )
}

export default Rules;