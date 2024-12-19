import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import {ApiUrl} from "../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import { Login } from 'src/app/account/auth/login/login.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient, private api: ApiUrl) { }

  public search(body?: any): Observable<any> {
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/profile/on-search`, body,{
      observe: 'response'
    });
  }
  public searchTranfers(body?: any): Observable<any> {
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/tranfer-profile/on-search`, body,{
      observe: 'response'
    });
  }
  public insertOrUpdate( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/profile/create`, body, {
      observe: 'response'
    });

  }
  public create( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/tranfer-profile/create`, body, {
      observe: 'response'
    });

  }
  public getAll(body?: any): Observable<any> {
    return this.http.post<any>(`${this.api.getCatalogApi()}/profile/get-profile-info`, body, {
      observe: 'response'
    });

  }
  public searchAll(body?: any): Observable<any> {
    debugger;
    return this.http.post<any>(`${this.api.getCatalogApi()}/profile/find-all`, body, {
      observe: 'response'
    });

  }
  public thongKe(body?: any): Observable<any> {
    return this.http.post<any>(`${this.api.getCatalogApi()}/profile/thong-ke`, body, {
      observe: 'response'
    });

  }
  public delete( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/profile/delete`, body, {
      observe: 'response'
    });

  }
  public deleteTranfer( body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/tranfer-profile/delete`, body, {
      observe: 'response'
    });

  }
}
