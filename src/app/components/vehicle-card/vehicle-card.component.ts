import { Component, Input, OnInit, OnChanges, OnDestroy, AfterViewInit, SimpleChanges } from '@angular/core';
import { VehicleDTO } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {
  @Input() vehicle: VehicleDTO = {
    name: 'Sedan X',
    description: 'A stylish sedan with excellent fuel efficiency and advanced safety features.',
    tags: ['Sedan', 'Fuel Efficient', 'Safety'],
    img: 'https://via.placeholder.com/150',
  };
constructor() { }
}
