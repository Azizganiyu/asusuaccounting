import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

    generateDashboardData(data){
      return (
        this.http
          .post(
            this.helper.getApiUrl() + "aas/reports/dashboard",
            data,
            {headers: this.helper.header()}
          )
      );
    }

    testApi(){

      let data = {
        first_name: 'didalla',
        last_name: 'vary',
        email: 'azizgprime@gmail.com',
        password: 'aziz1996',
      }
      return (
        this.http
          .post(
            "https://api.didalla.com/api/register",
            data,
            {headers: this.helper.header()}
          )
      );
    }
}
