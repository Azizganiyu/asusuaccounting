import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IntangibleAssetService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  getAssets(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/intangible_asset",
          {headers: this.helper.header()}
        )
    );
  }

  create(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/intangible_asset/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  edit(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/intangible_asset/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  delete(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/intangible_asset/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }

  getAmortizations(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/intangible_asset/amortizations",
          {headers: this.helper.header()}
        )
    );
  }

  createAmortization(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/intangible_asset/amortization/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  editAmortization(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/intangible_asset/amortization/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  deleteAmortization(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/intangible_asset/amortization/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }

}
