import { Piece, Position, Board } from "../models/models";

const directions: Position[] = [
  { row: -1, col: 0 }, { row: 1, col: 0 },
  { row: 0, col: -1 }, { row: 0, col: 1 },
  { row: -1, col: -1 }, { row: -1, col: 1 },
  { row: 1, col: -1 }, { row: 1, col: 1 }
];

export class DeveloperPiece extends Piece {
  getValidMoves(board: Board, from: Position): Position[] {
    return directions.flatMap(direction => {
      const moves: Position[] = [];
      for (let step = 1; step <= 3; step++) {
        const target = {
          row: from.row + direction.row * step,
          col: from.col + direction.col * step
        };
        if (!board.isWithinBounds(target)) break;
        if (board.isEmpty(target)) {
          moves.push(target);
          continue;
        }
        const landingStep = step + 1;
        if (landingStep <= 3) {
          const landing = {
            row: from.row + direction.row * landingStep,
            col: from.col + direction.col * landingStep
          };
          if (board.isWithinBounds(landing) && board.isEmpty(landing)) {
            moves.push(landing);
          }
        }
        break;
      }
      return moves;
    });
  }
}
