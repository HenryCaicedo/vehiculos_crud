import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { VehicleDTO } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-grid',
  templateUrl: './vehicle-grid.component.html',
  styleUrls: ['./vehicle-grid.component.css'],
})
export class VehicleGridComponent {
  private readonly vehicles$: Observable<VehicleDTO[]> =
    this.VehicleService.getVehicles();
  vehicles: VehicleDTO[] = [];
  VehiclesSubscription?: Subscription;

  constructor(private readonly VehicleService: VehicleService) {}

  ngOnDestroy(): void {
    this.VehiclesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.VehiclesSubscription = this.vehicles$.subscribe(
      (vehiclesDTO: VehicleDTO[]) => {
        this.vehicles = vehiclesDTO;
      }
    );
  }
}
