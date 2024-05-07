import { Injectable } from '@angular/core';
import { VehicleDTO } from '../models/vehicle.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import vehiclesList from '../mocks/vehicle.mock';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly url: string;

  constructor(private readonly http: HttpClient) {
    this.url = 'https://localhost:7004';
  }

  addVehicle(dataInput: VehicleDTO): Observable<VehicleDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // return this.http.post<VehicleDTO>(`${this.url}/Home`, data, httpOptions);
    return new Observable<VehicleDTO>((observer) => {
      observer.next(dataInput);
    });
  }

  getVehicles(): Observable<VehicleDTO[]> {
    // return this.http.get<VehicleDTO[]>(`${this.url}/Home`);
    return new Observable<VehicleDTO[]>((observer) => {
      observer.next(vehiclesList);
    });
  }
}
