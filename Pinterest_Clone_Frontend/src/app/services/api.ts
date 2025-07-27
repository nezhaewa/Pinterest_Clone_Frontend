import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class Api {
  private baseUrl = 'v1';

  constructor(private http: HttpClient) {}

  getPins() {
    return this.http.get<any[]>(`${this.baseUrl}/pins`);
  }

  createPin(formData: FormData) {
    return this.http.post(`${this.baseUrl}/pins`, formData);
  }
}