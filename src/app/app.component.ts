// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board-component/board.component';
import { BoardSetupComponent } from './board-setup/board-setup.component';
import { GameService } from './game/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BoardSetupComponent,
    BoardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options?: { rows: number; cols: number };

  constructor(private gameService: GameService) {}

  onStart(event: { rows: number; cols: number }) {
    this.options = event;
    this.gameService.init(event.rows, event.cols);
  }
}
