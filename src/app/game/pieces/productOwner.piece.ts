import { Piece, Position, Board } from "../models/models";

const directions: Position[] = [
  { row: -1, col: 0 },  // up
  { row: 1,  col: 0 },  // down
  { row: 0,  col: -1 }, // left
  { row: 0,  col: 1 },  // right
  { row: -1, col: -1 }, // up‑left
  { row: -1, col: 1 },  // up‑right
  { row: 1,  col: -1 }, // down‑left
  { row: 1,  col: 1 }   // down‑right
];

export class ProductOwnerPiece extends Piece {
  getValidMoves(board: Board, from: Position): Position[] {
    return directions
      .map(d => ({ row: from.row + d.row, col: from.col + d.col }))
      .filter(p => board.isWithinBounds(p));
  }
}
