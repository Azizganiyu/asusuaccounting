import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {


  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  getAssets(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/fixed_asset",
          {headers: this.helper.header()}
        )
    );
  }

  create(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/fixed_asset/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  edit(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/fixed_asset/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  delete(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/fixed_asset/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }

  getDepreciations(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/fixed_asset/depreciations",
          {headers: this.helper.header()}
        )
    );
  }

  createDepreciation(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/fixed_asset/depreciation/create",
          data,
          {headers: this.helper.header()}
        )
    );
  }

  editDepreciation(data){
    return (
      this.http
        .post(
          this.helper.getApiUrl() + "aas/fixed_asset/depreciation/edit/"+data.id,
          data,
          {headers: this.helper.header()}
        )
    );
  }

  deleteDepreciation(id){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/fixed_asset/depreciation/delete/"+id,
          {headers: this.helper.header()}
        )
    );
  }
}
