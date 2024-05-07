import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleDTO } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent {
  // @Output() submit: EventEmitter<VehicleDTO> = new EventEmitter();

  formFields = {
    name: '',
    description: '',
    tags: '',
    img: '',
  };

  title = 'Vehicle Form';

private action: 'add' | 'update' = 'add';

  constructor(
    private vehicleService: VehicleService,
    private _matDialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: 'update' | 'add'; vehicle: VehicleDTO }
  ) {
    this.action = data.action;
    if (data.action == 'update') {
      this.title = 'Edit Vehicle';
      this.formFields = {
        name: data.vehicle.name,
        description: data.vehicle.description,
        tags: data.vehicle.tags.join(', '),
        img: data.vehicle.img,
      };
    } else {
      this.title = 'Add Vehicle';
    }
  }

  onNameChange(event: Event) {
    this.formFields.name = String(event);
  }

  onDescriptionChange(event: Event) {
    this.formFields.description = String(event);
  }

  onTagsChange(event: Event) {
    this.formFields.tags = String(event);
  }

  onImgChange(event: Event) {
    this.formFields.img = String(event);
  }

  onCancel() {
    this._matDialogRef.close();
  }

  onSubmit() {
    console.log('Enviando formulario...');

    if (
      !this.formFields.name ||
      !this.formFields.description ||
      !this.formFields.tags
    ) {
      console.log('Faltan campos por llenar');

      return;
    }

    console.log(this.formFields);


    const vehicleDTO: VehicleDTO = {
      name: this.formFields.name,
      description: this.formFields.description,
      tags: this.formFields.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      img: this.formFields.img || 'assets/images/car.jpg',
    };

    if (this.action === 'update') {
      console.log(1);

      this.vehicleService
        .updateVehicle(vehicleDTO)
        .subscribe((vehicleDTO: VehicleDTO) => {
          console.log('Respuesta del servidor:', vehicleDTO);
        });
    } else if (this.action === 'add') {
      console.log(2);
      this.vehicleService
        .addVehicle(vehicleDTO)
        .subscribe((vehicleDTO: VehicleDTO) => {
          console.log('Respuesta del servidor:', vehicleDTO);
        });
    }

    console.log('Formulario enviado');

    this._matDialogRef.close();
  }
}
