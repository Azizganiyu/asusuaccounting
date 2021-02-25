import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  hasAccount(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/services/check",
          {headers: this.helper.header()}
        )
    );
  }

  initialize(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/services/initialize",
          {headers: this.helper.header()}
        )
    );
  }

  remove(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/services/delete",
          {headers: this.helper.header()}
        )
    );
  }
}
