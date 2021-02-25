import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  assets: any = []
  equity: any = []

  submit: boolean = false
  public user;

  showResult : boolean = false
  data : any

  durationForm  = this.fb.group({
    //from: [new Date(new Date().setFullYear(new Date().getFullYear() - 10)), [Validators.required]],
    from: [null],
    to: [new Date(), [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private report: ReportService
  ) {
    this.generateData()
  }

  ngOnInit(): void {
  }

  generateData(){
    this.showResult = false
    this.submit = true
    this.report.generateDashboardData(this.durationForm.value).subscribe((data : any) => {
      console.log(data)
      this.data = data
      this.setAssets()
      this.setEquity()
      this.submit = false
      this.showResult = true
    }, ((error) => {
      console.log(error)
    }))
  }

  setAssets(){
    this.assets = [
      {
        assets: 'Cash at bank',
        value: this.data.assets.cash_at_bank
      },
      {
        assets: 'Cash at hand',
        value: this.data.assets.cash_at_hand
      },
    ]
  }

  setEquity(){
    this.equity = [
      {
        equity: 'Retained earnings',
        value: this.data.equity.retained_earnings
      },
    ]
  }
}
