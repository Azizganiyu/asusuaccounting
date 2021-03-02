import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { IntangibleAssetService } from 'src/app/services/intangible-asset/intangible-asset.service';

@Component({
  selector: 'app-intangible-asset-amortization',
  templateUrl: './intangible-asset-amortization.component.html',
  styleUrls: ['./intangible-asset-amortization.component.scss']
})
export class IntangibleAssetAmortizationComponent implements OnInit {

  @ViewChild('amortizationCreateModal', { static: true }) amortizationCreateModal;
  @ViewChild('amortizationEditModal', { static: true }) amortizationEditModal;

  amortizationForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    description: [''],
    account_id: [null, [Validators.required]],
    amount: [0, [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  assets: any = []
  amortizations: any = []

  headElements = ['Date', 'Intangible asset', 'Description', 'Amount', 'Action'];

   constructor(
    private fb: FormBuilder,
    private intangibleAssetService: IntangibleAssetService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router,
  ) {
    this.getAmortizations()
    this.getAssets()
  }

  ngOnInit(): void {
  }

  getAssets(){
    this.loading = true
    this.intangibleAssetService.getAssets().subscribe((data: any) => {
      this.assets = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  getAmortizations(){
    this.loading = true
    this.intangibleAssetService.getAmortizations().subscribe((data: any) => {
      console.log(data.data)
      this.amortizations = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.amortizationCreateModal.hide()
    this.amortizationEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.amortizationForm.value)
    this.intangibleAssetService.createAmortization(this.amortizationForm.getRawValue()).subscribe((data: any) => {
      this.getAmortizations()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(amortization){
    this.amortizationForm.get('date').patchValue(new Date(amortization.date))
    this.amortizationForm.get('description').patchValue(amortization.description)
    this.amortizationForm.get('amount').patchValue(amortization.amount)
    this.amortizationForm.get('account_id').patchValue(amortization.account_id)
    this.amortizationForm.get('id').patchValue(amortization.id)
    this.amortizationEditModal.show()
  }

  update(){
    this.submit = true
    this.intangibleAssetService.editAmortization(this.amortizationForm.getRawValue()).subscribe((data: any) => {
      this.getAmortizations()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Asset?', 'Are you sure you want to Delete this asset?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.intangibleAssetService.deleteAmortization(this.amortizationForm.value.id).subscribe((data: any) => {
          this.getAmortizations()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.amortizationForm.reset()
    this.amortizationForm.get('amount').patchValue(0)
    this.amortizationForm.get('date').patchValue(new Date())
  }

  view(el){
    let data = {
      headElements : ['Intangible asset', 'Amount'],
      title: 'Amortization Entry',
      subtitle: el.description,
      total: el.amount,
      date: this.helper.formatDate(el.date),
      entry: [
        {"asset": el.asset.name, "amount": el.amount.toLocaleString()},
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['amortization-record'])
  }


}
