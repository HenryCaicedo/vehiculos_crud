import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { VehicleDTO } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';

@Component({
  selector: 'app-vehicle-grid',
  templateUrl: './vehicle-grid.component.html',
  styleUrls: ['./vehicle-grid.component.css'],
})
export class VehicleGridComponent {
  private readonly vehicles$: Observable<VehicleDTO[]> =
    this.vehicleService.getVehicles();
  vehicles: VehicleDTO[] = [];
  vehiclesSubscription?: Subscription;

  constructor(private readonly vehicleService: VehicleService, private _matDialog: MatDialog) {}

  ngOnDestroy(): void {
    this.vehiclesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.vehiclesSubscription = this.vehicles$.subscribe(
      (vehiclesDTO: VehicleDTO[]) => {
        this.vehicles = vehiclesDTO;
      }
    );
  }

  addVehicle(): void {
    this._matDialog.open(ModalFormComponent, {
      data: {
        action: 'add',
      },
      width: '500px',
    });
  }
}
