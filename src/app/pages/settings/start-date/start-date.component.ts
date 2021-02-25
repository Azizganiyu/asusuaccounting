import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { StartDateService } from 'src/app/services/start-date/start-date.service';

@Component({
  selector: 'app-start-date',
  templateUrl: './start-date.component.html',
  styleUrls: ['./start-date.component.scss']
})
export class StartDateComponent implements OnInit {

  loading: boolean = true
  submit: boolean = false

  dateForm  = this.fb.group({
    date: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private startDateService: StartDateService,
    public helper: HelperService
  ) {
    this.getStartDate()
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.dateForm.value)
    this.submit = true
    this.startDateService.set({date: new Date(this.dateForm.value.date)}).subscribe((data: any) => {
      this.submit = false
      this.helper.showSuccess(data.message, 'Success!')
    }, (error => {
      this.submit = false
      console.log(error)
    }))
  }

  getStartDate(){
    this.startDateService.get().subscribe((data: any) => {
      if(data.data){
        this.dateForm.get('date').patchValue(new Date(data.data.start_date))
      }
      this.loading = false
     console.log(data)
    }, (error => {
      this.loading = false
      console.log(error)
    }))
  }

}
