import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  getReceipts(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/receipt",
          {headers: this.helper.header()}
        )
    );
  }

  create(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/receipt/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  edit(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/receipt/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  delete(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/receipt/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }
}
