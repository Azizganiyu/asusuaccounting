import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogoService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }


  get(){
    return (
      this.http
        .get(
          this.helper.getApiUrl() + "aas/business_logo",
          {headers: this.helper.header()}
        ).subscribe((data: any) => {
          if(data.data){
            this.helper.setLogo(data.data.logo);
          }
        }, (error => {
          console.log(error)
        }))
    );
  }

  upload(data){
    return this.http.post(
      this.helper.getApiUrl()+'aas/business_logo/set',
      data, {reportProgress: true, observe: 'events'}
    )
  }
}
