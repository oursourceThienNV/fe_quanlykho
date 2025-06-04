import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
@Injectable({ providedIn: 'root' })
export class StoresService {
  constructor(private http: HttpClient, private api: ApiUrl) { }
  public search(body?: any): Observable<any> {
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/stores/on-search`, body, {
      observe: 'response'
    });
  }
}
