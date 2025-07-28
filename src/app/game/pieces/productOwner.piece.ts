import { Piece, Position, Board } from "../models/models";

const directions: Position[] = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 }
];

export class ProductOwnerPiece extends Piece {
    getValidMoves(board: Board, from: Position): Position[] {
        return directions
            .map(d => ({ row: from.row + d.row, col: from.col + d.col }))
            .filter(p => board.isWithinBounds(p));
    }
}
