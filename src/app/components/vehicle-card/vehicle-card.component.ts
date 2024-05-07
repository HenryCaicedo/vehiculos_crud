import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDTO } from 'src/app/models/vehicle.model';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css'],
})
export class VehicleCardComponent {
  @Input() vehicle: VehicleDTO = {
    name: 'Sedan X',
    description:
      'A stylish sedan with excellent fuel efficiency and advanced safety features.',
    tags: ['Sedan', 'Fuel Efficient', 'Safety'],
    img: 'https://via.placeholder.com/150',
  };
  constructor(private _matDialog: MatDialog, private _vehicleService: VehicleService) {
    
  }

  editVehicle() {
    this._matDialog.open(ModalFormComponent, {
      data: {
        action: 'update',
        vehicle: this.vehicle,
      },
      width: '500px',
    });
  }

  deleteVehicle() {
    this._vehicleService.deleteVehicle(this.vehicle);
  }
}
