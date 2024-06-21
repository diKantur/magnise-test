import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setting, url_bars, url_instruments } from '../../assets/env';
import { type IBarsParams, type IURLParams } from '../../assets/interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryDataService {
  private url = setting.URI;

  constructor(private http: HttpClient) {}

  getListInstruments(queryParams: IURLParams) {
    const params = this.setParams(queryParams);
    return this.http.get(this.url + url_instruments.instruments, { params })
  }

  getListProviders() {
    return this.http
      .get(this.url + url_instruments.providers)
      .pipe(map((v: any) => v.data));
  }

  getListExchanges(provider: string) {
    const params = this.setParams({ provider });
    return this.http.get(this.url + url_instruments.exchanges, { params });
  }

  getCountBack(queryParams: IBarsParams) {
    const params = this.setParams(queryParams);
    return this.http.get(this.url + url_bars.count_back, { params });
  }

  getDateRange(queryParams: IBarsParams) {
    const params = this.setParams(queryParams);
    return this.http.get(this.url + url_bars.date_range, { params });
  }

  getTimeBack(queryParams: IBarsParams) {
    const params = this.setParams(queryParams);
    return this.http.get(this.url + url_bars.time_back, { params });
  }

  private setParams(queryParams: IBarsParams | IURLParams) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((v: string) => {
      params = params.append(v, queryParams[v]!);
    });
    return params;
  }
}
