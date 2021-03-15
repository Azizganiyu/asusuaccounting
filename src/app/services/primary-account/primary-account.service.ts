import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrimaryAccountService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

    get(){
      return (
        this.http
          .get(
            this.helper.getApiUrl() + "aas/primary_account",
            {headers: this.helper.header()}
          )
      );
     }

    set(date){
      return (
        this.http
          .post(
            this.helper.getApiUrl() + "aas/primary_account/set",
            date,
            {headers: this.helper.header()}
          )
      );
     }
}
