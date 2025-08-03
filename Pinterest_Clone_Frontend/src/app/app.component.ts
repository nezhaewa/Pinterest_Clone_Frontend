import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateBoardModalComponent } from './create-board-modal/create-board-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateBoardModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Pinterest Clone';
}
