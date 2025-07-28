import { Piece, Board, Position } from "../models/models";

const knightMoves: Position[] = [
  { row: -2, col: -1 },
  { row: -2, col: 1 },
  { row: -1, col: -2 },
  { row: -1, col: 2 },
  { row: 1, col: -2 },
  { row: 1, col: 2 },
  { row: 2, col: -1 },
  { row: 2, col: 1 }
];

export class DesignerPiece extends Piece {
  getValidMoves(board: Board, from: Position): Position[] {
    return knightMoves
      .map(move => ({ row: from.row + move.row, col: from.col + move.col }))
      .filter(target => board.isWithinBounds(target));
  }
}
