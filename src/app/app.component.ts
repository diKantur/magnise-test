import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowDataComponent } from './components/show-data/show-data.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { BehaviorSubject, catchError, concatMap, retry, throwError,} from 'rxjs';
import { RealTimeDataService } from './services/real-time-data.service';
import { ChartComponent } from './components/chart/chart.component';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ShowDataComponent,
    ChartComponent,
    CommonModule,
    SubscribeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  price = new BehaviorSubject('');
  timestamp = new BehaviorSubject('');

  constructor(
    private auth: AuthService,
    private RTD: RealTimeDataService,
    public data: DataService
  ) {}

  ngOnInit() {
    this.auth.getToken()
      .pipe(
        concatMap((v) => {
          this.RTD.createWS(v);
          return this.RTD.webSocketSubject$;
        })
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        retry({ delay: 5_000 })
      )
      ?.subscribe((value: any) => {
        if (value.last) {
          this.price.next(value.last.price);
          this.timestamp.next(value.last.timestamp);
        }
        if (value.bid) {
          this.price.next(value.bid.price);
          this.timestamp.next(value.bid.timestamp);
        }
        if (value.ask) {
          this.price.next(value.ask.price);
          this.timestamp.next(value.ask.timestamp);
        }
      });

    this.data.dataStorage$.subscribe((v: any) => {
      if (v.provider && v.instrumentId) {
        this.RTD.sendMessage(v.instrumentId, v.provider);
      }
    });
  }

  ngOnDestroy() {
    this.RTD.close();
  }

  handleError(error: string) {
    console.error(error);
    return throwError(() => new Error(error));
  }
}
