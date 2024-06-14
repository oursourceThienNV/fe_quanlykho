import {environment} from "../../../environments/environment";

export class ApiUrl {

  public getAuthApi(): string {
    // return `${environment.apiUrl}/oauth/token`;
    //return `http://103.142.139.54:8101/oauth/token`;
    return `${environment.apiUrl}/login`
  }
  public getAuthSign(): string {
    // return `${environment.apiUrl}/oauth/token`;
    //return `http://103.142.139.54:8101/oauth/token`;
    return `${environment.apiUrlSign}/login`
  }
  public getAuthEncrypt(): string {
    // return `${environment.apiUrl}/oauth/token`;
    //return `http://103.142.139.54:8101/oauth/token`;
    return `${environment.apiUrlAgent}`
  }
  public getCatalogApi(): string {
    return `${environment.apiUrl}`;
  }
  public getApiSign(): string {
    return `${environment.apiUrlSign}`;
  }

  public getKpiApi(): string {
    return `${environment.apiUrl}/api`;
  }

  public getImportApi(): string {
    return `${environment.apiUrl}/api`;
  }
  public getPlanApi(): string {
    return `${environment.apiUrl}/lims`;
  }
}
