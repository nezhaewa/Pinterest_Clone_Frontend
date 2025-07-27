import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePinComponent } from './pages/create-pin/create-pin.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pins', component: CreatePinComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
