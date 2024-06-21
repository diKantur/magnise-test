import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

import { HistoryDataService } from '../../services/history-data.service';
import { CommonModule } from '@angular/common';
import { type IURLParams } from '../../../assets/interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
})
export class SubscribeComponent {
  public providers$!: Observable<any>;
  subscribeForm = new FormGroup({
    provider: new FormControl('simulation'),
    symbol: new FormControl('AUD/CAD'),
  });

  constructor(public HD: HistoryDataService, public data: DataService) {}

  ngOnInit() {
    this.providers$ = this.HD.getListProviders();
  }
  onSubscribe() {
    this.HD.getListInstruments(this.subscribeForm.value as IURLParams)
      .subscribe(
        (value:any) => {
        this.data.dataStorage$.next({
          provider: this.subscribeForm.value.provider,
          symbol: this.subscribeForm.value.symbol,
          instrumentId: value.data[0].id,
        });
      }
    );
  }
}
