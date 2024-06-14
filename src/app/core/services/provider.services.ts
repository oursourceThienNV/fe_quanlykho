import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import {ApiUrl} from "../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";

@Injectable({ providedIn: 'root' })
export class ProviderServices {
  constructor(private http: HttpClient, private api: ApiUrl) { }
  public search(body?: any): Observable<any> {
    debugger;
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/provider/on-search`, body,{
      observe: 'response'
    });
  }
  public insertOrUpdate(id?: any, body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/provider/create-or-update`, body, {
      observe: 'response'
    });
  }
  public insertOrUpdateResult(id?: any, body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/provider/createOrUpdate`, body, {
      observe: 'response'
    });

  }
  public getProviderByProviderNo( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/provider/find-by-provider-id`, body, {
      observe: 'response'
    });

  }


}
