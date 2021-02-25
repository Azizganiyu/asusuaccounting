import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-no-account',
  templateUrl: './no-account.component.html',
  styleUrls: ['./no-account.component.scss']
})
export class NoAccountComponent implements OnInit {

  submit: boolean = false

  constructor(
    private accountService: AccountService,
    private helper: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  initialize(){
    this.submit = true
    this.accountService.initialize().subscribe((data: any) => {
      this.submit = false
      this.helper.showSuccess('you will be redirected shortly...', data.message)
      this.router.navigate([''])
    }, (error => {
      console.log(error)
      this.submit = false
    }))
  }

}
