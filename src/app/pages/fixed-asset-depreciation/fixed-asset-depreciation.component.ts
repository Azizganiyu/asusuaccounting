import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { FixedAssetService } from 'src/app/services/fixed-asset/fixed-asset.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-fixed-asset-depreciation',
  templateUrl: './fixed-asset-depreciation.component.html',
  styleUrls: ['./fixed-asset-depreciation.component.scss']
})
export class FixedAssetDepreciationComponent implements OnInit {


  @ViewChild('depreciationCreateModal', { static: true }) depreciationCreateModal;
  @ViewChild('depreciationEditModal', { static: true }) depreciationEditModal;

  depreciationForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    description: [''],
    account_id: [null, [Validators.required]],
    amount: [0, [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  assets: any = []
  depreciations: any = []

  headElements = ['Date', 'Fixed asset', 'Description', 'Amount', 'Action'];

   constructor(
    private fb: FormBuilder,
    private fixedAssetService: FixedAssetService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router,
  ) {
    this.getDepreciations()
    this.getAssets()
  }

  ngOnInit(): void {
  }

  getAssets(){
    this.loading = true
    this.fixedAssetService.getAssets().subscribe((data: any) => {
      this.assets = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  getDepreciations(){
    this.loading = true
    this.fixedAssetService.getDepreciations().subscribe((data: any) => {
      console.log(data.data)
      this.depreciations = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.depreciationCreateModal.hide()
    this.depreciationEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.depreciationForm.value)
    this.fixedAssetService.createDepreciation(this.depreciationForm.getRawValue()).subscribe((data: any) => {
      this.getDepreciations()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(depreciation){
    this.depreciationForm.get('date').patchValue(new Date(depreciation.date))
    this.depreciationForm.get('description').patchValue(depreciation.description)
    this.depreciationForm.get('amount').patchValue(depreciation.amount)
    this.depreciationForm.get('account_id').patchValue(depreciation.account_id)
    this.depreciationForm.get('id').patchValue(depreciation.id)
    this.depreciationEditModal.show()
  }

  update(){
    this.submit = true
    this.fixedAssetService.editDepreciation(this.depreciationForm.getRawValue()).subscribe((data: any) => {
      this.getDepreciations()
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
        this.fixedAssetService.deleteDepreciation(this.depreciationForm.value.id).subscribe((data: any) => {
          this.getDepreciations()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.depreciationForm.reset()
    this.depreciationForm.get('amount').patchValue(0)
    this.depreciationForm.get('date').patchValue(new Date())
  }

  view(el){
    let data = {
      headElements : ['Fixed asset', 'Amount'],
      title: 'Depreciation Entry',
      subtitle: el.description,
      total: el.amount,
      date: this.helper.formatDate(el.date),
      entry: [
        {"asset": el.asset.name, "amount": el.amount.toLocaleString()},
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['depreciation-record'])
  }


}
