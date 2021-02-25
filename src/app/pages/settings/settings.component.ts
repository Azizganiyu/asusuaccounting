import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  session_data;

  constructor(
    private accountService: AccountService,
    private helper: HelperService,
    private authService: AuthService,
  ) {
    this.session_data = this.helper.getSession();
  }

  ngOnInit(): void {
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete account?', 'Are you sure you want to Delete this account? This action can not be reversed as you will lose all your data, please be sure before you continue');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.deleteAccount()
      }
    });
  }

  deleteAccount(){
    this.accountService.remove().subscribe((data: any) => {
      console.log(data)
      this.authService.logout(this.session_data.id)
    }, (error => {
      console.log(error)
    }))
  }

}
