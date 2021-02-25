import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountTransferService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  getMergedAccounts(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/account_transfer/merge_accounts",
          {headers: this.helper.header()}
        )
    );
  }

  getTransfers(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/account_transfer",
          {headers: this.helper.header()}
        )
    );
  }

  create(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/account_transfer/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  edit(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/account_transfer/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  delete(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/account_transfer/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }
}
