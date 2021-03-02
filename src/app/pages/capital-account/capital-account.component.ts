import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CapitalAccountService } from 'src/app/services/capital-account/capital-account.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-capital-account',
  templateUrl: './capital-account.component.html',
  styleUrls: ['./capital-account.component.scss']
})
export class CapitalAccountComponent implements OnInit {

  @ViewChild('capitalCreateModal', { static: true }) capitalCreateModal;
  @ViewChild('capitalEditModal', { static: true }) capitalEditModal;

  capitalForm = this.fb.group({
    name: ['', [Validators.required]],
    start_balance: [0, [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  capitals: any = []

  headElements = ['Name', 'Amount to pay', 'Action'];

   constructor(
    private fb: FormBuilder,
    private capitalService: CapitalAccountService,
    private helper: HelperService,
  ) {
    this.getCapitals()
  }

  ngOnInit(): void {
  }

  getCapitals(){
    this.loading = true
    this.capitalService.getCapitals().subscribe((data: any) => {
      console.log(data)
      this.capitals = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.capitalCreateModal.hide()
    this.capitalEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.capitalForm.value)
    this.capitalService.create(this.capitalForm.getRawValue()).subscribe((data: any) => {
      this.getCapitals()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(capital){
    this.capitalForm.get('name').patchValue(capital.name)
    this.capitalForm.get('start_balance').patchValue(capital.start_balance)
    this.capitalForm.get('id').patchValue(capital.id)
    this.capitalEditModal.show()
  }

  update(){
    this.submit = true
    this.capitalService.edit(this.capitalForm.getRawValue()).subscribe((data: any) => {
      this.getCapitals()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Capital?', 'Are you sure you want to Delete this capital?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.capitalService.delete(this.capitalForm.value.id).subscribe((data: any) => {
          this.getCapitals()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.capitalForm.reset()
    this.capitalForm.get('start_balance').patchValue(0)
  }


}
