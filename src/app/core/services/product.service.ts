import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import {ApiUrl} from "../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient, private api: ApiUrl) { }
  public search(body?: any): Observable<any> {
      debugger;
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/product/on-search`, body,{
      observe: 'response'
    });
  }
  public insertOrUpdate(id?: any, body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/product/create-or-update`, body, {
      observe: 'response'
    });
  }
  public getProductByProductNo( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/product/find-by-product-id`, body, {
      observe: 'response'
    });

  }
}
