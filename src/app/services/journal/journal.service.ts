import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  getJournals(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/journal",
          {headers: this.helper.header()}
        )
    );
  }

  create(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/journal/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  edit(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/journal/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  delete(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/journal/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }

  getMemberLoanAccounts(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/journal/member_loans/"+id,
          {headers: this.helper.header()}
        )
    );
  }

  getMemberSavingAccounts(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/journal/member_savings/"+id,
          {headers: this.helper.header()}
        )
    );
  }
}
