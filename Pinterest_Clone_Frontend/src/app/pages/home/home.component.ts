// import { Component } from '@angular/core';
// import { NgFor } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [NgFor],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.sass']
// })
// export class HomeComponent {
//   pins = [
//     {
//       title: 'Stylish Coat',
//       imageUrl: 'https://via.placeholder.com/300x400.png?text=Pin+1',
//       altText: 'A stylish coat'
//     },
//     {
//       title: 'Cute Cat',
//       imageUrl: 'https://via.placeholder.com/300x300.png?text=Pin+2',
//       altText: 'Cat image'
//     },
//     {
//       title: 'Red Dress',
//       imageUrl: 'https://via.placeholder.com/300x500.png?text=Pin+3',
//       altText: 'Red dress'
//     }
   
//   ];
// }

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
