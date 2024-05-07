import { Injectable } from '@angular/core';
import { VehicleDTO } from '../models/vehicle.model';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import vehiclesList from '../mocks/vehicle.mock';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  public vehicles: VehicleDTO[] = [];

  constructor(
    // private readonly http: HttpClient
  ) {
    let vehiclesString = localStorage.getItem('vehicles');

    if (!vehiclesString || vehiclesString === '[]') {
      this.vehicles = vehiclesList;
    } else {
      this.vehicles = JSON.parse(vehiclesString);
    }
  }

  addVehicle(dataInput: VehicleDTO): Observable<VehicleDTO> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };

    // return this.http.post<VehicleDTO>(`${this.url}/Home`, data, httpOptions);
    return new Observable<VehicleDTO>((observer) => {
      this.vehicles.push(dataInput);
      localStorage.setItem(
        'vehicles',
        JSON.stringify(this.vehicles),
      );
      observer.next(dataInput);
    });
  }

  updateVehicle(dataInput: VehicleDTO): Observable<VehicleDTO> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };

    // return this.http.put<VehicleDTO>(`${this.url}/Home`, data, httpOptions);
    return new Observable<VehicleDTO>((observer) => {
      let index = this.vehicles.findIndex((v) => v.name === dataInput.name);
      this.vehicles[index] = dataInput;

      localStorage.setItem('vehicles', JSON.stringify(this.vehicles));

      observer.next(dataInput);
    });
  }

  deleteVehicle(vehicle: VehicleDTO): void {
    let index = this.vehicles.findIndex((v) => v.name === vehicle.name);
    this.vehicles.splice(index, 1);

    localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
  }

  getVehicles(): Observable<VehicleDTO[]> {
    // return this.http.get<VehicleDTO[]>(`${this.url}/Home`);
    return new Observable<VehicleDTO[]>((observer) => {
      observer.next(this.vehicles);
    });
  }
}
