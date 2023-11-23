import Bot from "../model/Bot.ts";
import Piece from "../types/Piece.ts";

class MyBotV2 extends Bot {
  constructor(name: string, avatarUrl: string) {
    super(name, avatarUrl);
  }
  move(board: Piece[], ownPiece: Piece): number {
    const opponentPiece = ownPiece === "x" ? "o" : "x";

    // Чекать если есть возможность противника
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const newBoard = [...board];
        newBoard[i] = ownPiece;
        if (this.isWinner(newBoard, ownPiece)) {
          return i; // Поиск выйгрешного хода
        }
      }
    }

    // Если есть возможность выйграша противника закрыть его
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const newBoard = [...board];
        newBoard[i] = opponentPiece;
        if (this.isWinner(newBoard, opponentPiece)) {
          return i; // Не дать противнику выйграть игру
        }
      }
    }

    // Играть по возможности выйграть или же хотябы ничьи
    const strategicMove = this.getStrategicMove(board, ownPiece);
    return strategicMove !== undefined ? strategicMove : this.getRandomMove(board);
  }

  private isWinner(board: Piece[], piece: Piece): boolean {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // x
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // y
      [0, 4, 8], [2, 4, 6] // Диагональ
    ];

    return winConditions.some((condition) =>
      condition.every((index) => board[index] === piece)
    );
  }

  private getStrategicMove(board: Piece[], ownPiece: Piece): number | undefined {
    // Первый ход либо в центр или же в углы
    if (board.every(cell => cell === "")) {
      const availableMoves = [0, 2, 4, 6, 8];
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Если бот ходит вторым
    if (board.filter(cell => cell !== "").length === 1) {
      if (board[4] === "") {
        // Если центр свободен забрать его
        return 4;
      } else {
        // Хотябы забрать углы
        const corners = [0, 2, 6, 8];
        return corners[Math.floor(Math.random() * corners.length)];
      }
    }

    // Play strategically to force a draw or win
    // Implement more advanced logic here if needed

    return undefined;
  }

  private getRandomMove(board: Piece[]): number {
    const emptyCells: number[] = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        emptyCells.push(i);
      }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
}

export default MyBotV2;