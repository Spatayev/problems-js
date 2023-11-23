import Bot from "../model/Bot.ts";
import Piece from "../types/Piece.ts";

class MyTicTacToeBot extends Bot {
  constructor(name: string, avatarUrl: string) {
    super(name, avatarUrl);
  }

  move(board: Piece[], ownPiece: Piece): number {
    // Check for winning move or block opponent's winning move
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const copyBoard = [...board];
        copyBoard[i] = ownPiece;

        if (this.checkWinner(copyBoard, ownPiece)) {
          return i; // Winning move
        }

        copyBoard[i] = ownPiece === "x" ? "o" : "x"; // Opponent's piece
        if (this.checkWinner(copyBoard, ownPiece === "x" ? "o" : "x")) {
          return i; // Block opponent's winning move
        }
      }
    }

    // If no winning or blocking moves, select a random available move
    const availableMoves: number[] = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        availableMoves.push(i);
      }
    }

    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }

    return -1; // No available move
  }

  private checkWinner(board: Piece[], piece: Piece): boolean {
    // Check for winning conditions in the board for the given piece (ownPiece or opponentPiece)
    // Insert logic for winning conditions: rows, columns, diagonals
    // Example: Check rows for a winning pattern

    for (let i = 0; i < 9; i += 3) {
      if (board[i] === piece && board[i + 1] === piece && board[i + 2] === piece) {
        return true; // Winning condition met
      }
    }

    // ... Check other winning conditions (columns, diagonals)

    return false; // No winning condition found
  }
}

export default MyTicTacToeBot;
