import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import {ApiUrl} from "../../shared/constant/ApiUrl.constant";
import {Observable} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import { Login } from 'src/app/account/auth/login/login.model';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient, private api: ApiUrl) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }
    findAll():  Observable<any> {
        return this.http.get(`${this.api.getCatalogApi()}/users/find-all`, {
          observe: 'response'
        });
    }

    register(user: User) {
        return this.http.post(`${this.api.getCatalogApi()}/register`, user, {
          observe: 'response'
        });
    }
  getPublicKey(user: any) {
    return this.http.post(`${this.api.getApiSign()}/get-public-key`, user, {
      observe: 'response',
    });
}
getPrivateKey(user: any) {
  return this.http.post(`${this.api.getApiSign()}/get-private-key`, user, {
    observe: 'response',
  });
}
getSignPrivateKey(user: any) {
return this.http.post(`${this.api.getApiSign()}/get-sign-private-key`, user, {
  observe: 'response',
});
}
getSignPublicKey(user: any) {
return this.http.post(`${this.api.getApiSign()}/get-sign-public-key`, user, {
  observe: 'response',
});
}
  
  encrypt(body: any) {
    return this.http.post(`${this.api.getAuthEncrypt()}/encrypt-text`, body, {
      observe: 'response'
    });
}
signFile(body: any) {
  return this.http.post(`${this.api.getAuthEncrypt()}/sign-file`,body,{
    observe: 'response'
  });
}
encryptFile(body: any) {
  return this.http.post(`${this.api.getAuthEncrypt()}/encrypt-file`,body,{
    observe: 'response'
  });
}
decrypt(body: any) {
  return this.http.post(`${this.api.getAuthEncrypt()}/decrypt-text`, body, {
    observe: 'response'
  });
}
testSign(body: any) {
  return this.http.post(`${this.api.getAuthEncrypt()}/test-sign`, body, {
    observe: 'response'
  });
}
decryptFile(body: any) {
return this.http.post(`${this.api.getAuthEncrypt()}/decrypt-file`,body,{
  observe: 'response'
});
}

  public search(body?: any): Observable<any> {
    return this.http.post<any[]>(`${this.api.getCatalogApi()}/user/on-search`, body,{
      observe: 'response'
    });
  }

  export(body?) {
    return this.http.post(`${this.api.getCatalogApi()}/admin/users/exportData`, body, {
      observe: 'response',
      responseType: 'blob'
    });
  }


  findAllAuthority():  Observable<any> {
    return this.http.get(`${this.api.getCatalogApi()}/admin/users/find-all-authority`, {
      observe: 'response'
    });
  }

  findAllAuthorityOfUser(login: any):  Observable<any> {
    return this.http.get(`${this.api.getCatalogApi()}/admin/users/find-all-authority-of-user/${login}`, {
      observe: 'response'
    });
  }

  public insertOrUpdate(id?: any, body?: any): Observable<any> {
    
      return this.http.post<any>(`${this.api.getCatalogApi()}/createUser`, body, {
        observe: 'response'
      });
    
  }
  public changePassword(body?: any): Observable<any> {

      return this.http.post<any>(`${this.api.getCatalogApi()}/change-pass-word`, body, {
        observe: 'response'
      });

  }

  public deleteMultiSelection(body?: any): Observable<any> {
    return this.http.post(`${this.api.getCatalogApi()}/delete`, body, {
      observe: 'response'
    });
  }
  

}
