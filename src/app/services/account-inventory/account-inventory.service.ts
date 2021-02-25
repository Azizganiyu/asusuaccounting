import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountInventoryService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  getInventories(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/inventory_item",
          {headers: this.helper.header()}
        )
    );
  }

  create(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/inventory_item/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  edit(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/inventory_item/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  delete(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/inventory_item/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }
}
