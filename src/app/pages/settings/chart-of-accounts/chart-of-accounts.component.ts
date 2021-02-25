import { Component, OnInit } from '@angular/core';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss']
})
export class ChartOfAccountsComponent implements OnInit {
  loading: boolean = true
  types: any []

  constructor(
    private coa: ChartOfAccountService
  ) { }

  ngOnInit(): void {
    this.getTypes()
  }

  getTypes(){
    this.coa.getTypes().subscribe((data : any) => {
      if(data.data){
        this.types = data.data
      }
      this.loading = false
    }, (error) => {
      this.loading = false
      console.log(error)
    })
  }
}
