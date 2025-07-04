/** @format */

import { useState } from "react";
import Product from "./Product";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const isXNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const currHistory = history.slice(0, currentMove + 1);
		const nextHistory = [...currHistory, nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
		let description = move > 0 ? "Go to move #" + move : "Go to game start";

		return (
			<>{/* <button onClick={() => jumpTo(move)}>{description}</button> */}</>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

function Square({ value, onSquareClick }) {
	return (
		<>
			<button className="square" onClick={onSquareClick}>
				{value}
			</button>
		</>
	);
}

function Board({ isXNext, squares, onPlay }) {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		// creates a copy of squares array (nextSquares) w JS slice()
		const nextSquares = squares.slice();
		// updates nextSquares to add X to first ([0] index) square.
		nextSquares[i] = isXNext ? "X" : "O";
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let stat = winner
		? "Winner: " + winner
		: "Next Player: " + (isXNext ? "X" : "O");

	return (
		<>
			{/* <div className="status">{stat}</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div> */}
			<Product />
		</>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
