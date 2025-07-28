export interface Position { row: number; col: number; }

export interface Board {
  isWithinBounds(pos: Position): boolean;
  isEmpty(pos: Position): boolean;
}

export abstract class Piece {
  abstract getValidMoves(board: Board, from: Position): Position[];
}
