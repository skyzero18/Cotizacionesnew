import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DivisaTable } from './components/divisa-table/divisa-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DivisaTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'defi';
}
