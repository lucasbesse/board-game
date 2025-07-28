import { Injectable } from '@angular/core';
import { Piece, Board, Position } from './models/models';
import { DeveloperPiece } from './pieces/developer.piece';
import { DesignerPiece } from './pieces/designer.piece';
import { ProductOwnerPiece } from './pieces/productOwner.piece';

@Injectable({ providedIn: 'root' })
export class GameService implements Board {
    private grid: (Piece | null)[][] = [];

    init(rows: number, cols: number) {
        this.grid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => null)
        );
        this.grid[0][cols - 2] = new DeveloperPiece();
        this.grid[0][cols - 3] = new DesignerPiece();
        this.grid[0][cols - 1] = new ProductOwnerPiece();
    }

    isWithinBounds(pos: Position): boolean {
        return (
            pos.row >= 0 &&
            pos.col >= 0 &&
            pos.row < this.grid.length &&
            pos.col < this.grid[0].length
        );
    }

    isEmpty(pos: Position): boolean {
        return this.isWithinBounds(pos) && this.grid[pos.row][pos.col] === null;
    }

    getPieceAt(pos: Position): Piece | null {
        return this.isWithinBounds(pos) ? this.grid[pos.row][pos.col] : null;
    }

    getValidMoves(from: Position): Position[] {
        const piece = this.getPieceAt(from);
        return piece ? piece.getValidMoves(this, from) : [];
    }

    movePiece(from: Position, to: Position): void {
        const piece = this.getPieceAt(from);
        if (!piece) return;
        const dRow = to.row - from.row;
        const dCol = to.col - from.col;
        const stepRow = Math.sign(dRow);
        const stepCol = Math.sign(dCol);
        const distance = Math.max(Math.abs(dRow), Math.abs(dCol));
        if (distance > 1) {
            const mid = { row: from.row + stepRow, col: from.col + stepCol };
            if (!this.isEmpty(mid)) {
                this.grid[mid.row][mid.col] = null;
            }
        }
        this.grid[to.row][to.col] = piece;
        this.grid[from.row][from.col] = null;
    }
}
