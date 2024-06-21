import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { setting } from '../../assets/env';

@Injectable({
  providedIn: 'root',
})
export class RealTimeDataService {
  public webSocketSubject$!: WebSocketSubject<any>;

  sendMessage(instrumentId: string, provider: string): void {
    const data = {
      "type": "l1-subscription",
      "id": "1",
      "instrumentId": instrumentId,
      "provider": provider,
      "subscribe": true,
      "kinds": [
        "ask",
        "bid",
        "last"
      ]
    }
    this.webSocketSubject$.next(data);
  }

  createWS(token: string) {
    const WS_ENDPOINT = setting.URI_WSS + '/api/streaming/ws/v1/realtime?token=' + token;

    if (this.webSocketSubject$) {
      this.close();
    }
    this.webSocketSubject$ = webSocket<any>(WS_ENDPOINT);
  }

  close() {
    this.webSocketSubject$.complete();
  }
}
