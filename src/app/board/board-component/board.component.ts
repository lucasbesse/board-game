import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { GameService } from '../../game/game.service';
import { Position } from '../../game/models/models';
import { DeveloperPiece } from '../../game/pieces/developer.piece';
import { DesignerPiece } from '../../game/pieces/designer.piece';
import { ProductOwnerPiece } from '../../game/pieces/productOwner.piece';

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, NgFor],
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnChanges {
  @Input() rows = 8;
  @Input() cols = 8;
  rowsArray: number[] = [];
  colsArray: number[] = [];
  selected?: Position;
  validMoves: Position[] = [];

  constructor(public gameService: GameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows'] || changes['cols']) {
      this.rowsArray = Array.from({ length: this.rows }, (_, i) => i);
      this.colsArray = Array.from({ length: this.cols }, (_, i) => i);
    }
  }

  onCellClick(r: number, c: number): void {
    const pos = { row: r, col: c };
    const piece = this.gameService.getPieceAt(pos);
    if (this.selected) {
      if (this.validMoves.some(m => m.row === r && m.col === c)) {
        this.gameService.movePiece(this.selected, pos);
      }
      this.selected = undefined;
      this.validMoves = [];
    } else if (piece) {
      this.selected = pos;
      this.validMoves = this.gameService.getValidMoves(pos);
    }
  }

  isValidMove(r: number, c: number): boolean {
    return this.validMoves.some(m => m.row === r && m.col === c);
  }

  isSelected(r: number, c: number): boolean {
    return this.selected?.row === r && this.selected.col === c;
  }

  getPieceLabel(r: number, c: number): string {
    const piece = this.gameService.getPieceAt({ row: r, col: c });
    if (piece instanceof DeveloperPiece) return 'Developer';
    if (piece instanceof DesignerPiece)  return 'Designer';
    if (piece instanceof ProductOwnerPiece) return 'Product Owner';
    return '';
  }
}
