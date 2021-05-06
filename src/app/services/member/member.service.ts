import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

    getMemberNoPaginate()
  	{
  		return (
        this.http
        .get(
          this.helper.getApiUrl() + 'CoopManagement/coop-members-no-paginate/'+this.helper.getVendor().id,
          {headers: this.helper.header()}
        )
      );
  	}
}
