import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountService {

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
    ) { }

    getTypes(){
      return (
        this.http
          .get(
            this.helper.getApiUrl() + "aas/coa/types",
            {headers: this.helper.header()}
          )
      );
    }


    getAccounts(id){
      return (
        this.http
          .get(
            this.helper.getApiUrl() + "aas/coa/subs/"+id,
            {headers: this.helper.header()}
          )
      );
    }

    getSubs(){
      return (
        this.http
          .get(
            this.helper.getApiUrl() + "aas/coa/subs",
            {headers: this.helper.header()}
          )
      );
    }

    createGroup(data, id){
      return (
        this.http
          .post(
            this.helper.getApiUrl() + "aas/coa/create_subs",
            {name: data.name, type_id: id},
            {headers: this.helper.header()}
          )
      );
    }

    editGroup(data){
      return (
        this.http
          .post(
            this.helper.getApiUrl() + "aas/coa/edit_subs/"+data.id,
            data,
            {headers: this.helper.header()}
          )
      );
    }

    deleteGroup(id){
      return (
        this.http
          .get(
            this.helper.getApiUrl() + "aas/coa/delete_subs/"+id,
            {headers: this.helper.header()}
          )
      );
    }

    create(data, id){
      return (
        this.http
          .post(
            this.helper.getApiUrl() + "aas/coa/create",
            {name: data.name, sub_id: data.sub_id, type_id: id, start_balance: data.start_balance},
            {headers: this.helper.header()}
          )
      );
    }

    edit(data){
      return (
        this.http
          .post(
            this.helper.getApiUrl() + "aas/coa/edit/"+data.id,
            data,
            {headers: this.helper.header()}
          )
      );
    }

    delete(id){
      return (
        this.http
          .get(
            this.helper.getApiUrl() + "aas/coa/delete/"+id,
            {headers: this.helper.header()}
          )
      );
    }
}
