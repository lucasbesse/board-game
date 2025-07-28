import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './board-setup.component.html',
  styleUrls: ['./board-setup.component.scss']
})
export class BoardSetupComponent {
  @Output() startGame = new EventEmitter<{ rows: number; cols: number }>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: [8, [Validators.required, Validators.min(6), Validators.max(12)]],
      cols: [8, [Validators.required, Validators.min(6), Validators.max(12)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.startGame.emit(this.form.value);
    }
  }
}
