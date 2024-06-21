import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.css',
})
export class ShowDataComponent {
  @Input() price!: BehaviorSubject<string>;
  @Input() timestamp!: BehaviorSubject<string>;
  symbol!: string;

  constructor(
    public data: DataService
  ) {}

  ngOnInit() {
    this.data.dataStorage$.subscribe((val: any) => {
      this.symbol = val.symbol;
    });


  }
}
