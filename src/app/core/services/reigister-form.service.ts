import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import {ApiUrl} from "../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import { Login } from 'src/app/account/auth/login/login.model';

@Injectable({ providedIn: 'root' })
export class ReigisterFormService {
    constructor(private http: HttpClient, private api: ApiUrl) { }
  public insert(body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/api/Registration/register`, body, {
      observe: 'response'
    });

  }
  public update(body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/api/Registration/update`, body, {
      observe: 'response'
    });

  }
  public createplan(body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/api/Registration/create-plan`, body, {
      observe: 'response'
    });

  }
  public listStage(body?: any): Observable<any> {

    return this.http.post<any>(`${this.api.getCatalogApi()}/api/Registration/stages`, body, {
      observe: 'response'
    });

  }
  public search(body?: any): Observable<any> {
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/api/Registration/search`, body,{
      observe: 'response'
    });
  }
}
