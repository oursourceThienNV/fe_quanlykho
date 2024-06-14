import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import {ApiUrl} from "../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";

@Injectable({ providedIn: 'root' })
export class ExportServices {
  constructor(private http: HttpClient, private api: ApiUrl) { }
/*  public search(body?: any): Observable<any> {
    debugger;
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/provider/on-search`, body,{
      observe: 'response'
    });
  }
  public insertOrUpdate(id?: any, body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/provider/create-or-update`, body, {
      observe: 'response'
    });
  }*/
  public getProviderByImportId( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/export/find-by-export-id`, body, {
      observe: 'response'
    });

  }
  public insertOrUpdate(body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/export/create-or-update`, body, {
      observe: 'response'
    });

  }
  public search(body?: any): Observable<any> {
    debugger;
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/export/on-search`, body,{
      observe: 'response'
    });
  }

  public getByProductNo( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/export/find-by-product-no`, body, {
      observe: 'response'
    });

  }



}
