import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  pins: any[] = [];

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getPins().subscribe({
      next: (data) => {
        this.pins = data.map(pin => ({
          // title: pin.title,
          imageUrl: `data:${pin.mimetype};base64,${pin.image}`,
          altText: pin.alt_text
        }));
      },
      error: (err) => console.error('Failed to load pins', err)
    });
  }
}
