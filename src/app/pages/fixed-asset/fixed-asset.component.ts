import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FixedAssetService } from 'src/app/services/fixed-asset/fixed-asset.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-fixed-asset',
  templateUrl: './fixed-asset.component.html',
  styleUrls: ['./fixed-asset.component.scss']
})
export class FixedAssetComponent implements OnInit {

  @ViewChild('assetCreateModal', { static: true }) assetCreateModal;
  @ViewChild('assetEditModal', { static: true }) assetEditModal;

  assetForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    acquisition_cost: [0, [Validators.required]],
    accumulated_depreciation: [0, [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  assets: any = []

  headElements = ['Name', 'Acquisition cost', 'Depreciation', 'Book value', 'status', 'Action'];

   constructor(
    private fb: FormBuilder,
    private fixedAssetService: FixedAssetService,
    private helper: HelperService,
  ) {
    this.getAssets()
  }

  ngOnInit(): void {
  }

  getAssets(){
    this.loading = true
    this.fixedAssetService.getAssets().subscribe((data: any) => {
      console.log(data)
      this.assets = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.assetCreateModal.hide()
    this.assetEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.assetForm.value)
    this.fixedAssetService.create(this.assetForm.getRawValue()).subscribe((data: any) => {
      this.getAssets()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(asset){
    this.assetForm.get('name').patchValue(asset.name)
    this.assetForm.get('description').patchValue(asset.description)
    this.assetForm.get('accumulated_depreciation').patchValue(asset.accumulated_depreciation)
    this.assetForm.get('acquisition_cost').patchValue(asset.acquisition_cost)
    this.assetForm.get('id').patchValue(asset.id)
    this.assetEditModal.show()
  }

  update(){
    this.submit = true
    this.fixedAssetService.edit(this.assetForm.getRawValue()).subscribe((data: any) => {
      this.getAssets()
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
        this.fixedAssetService.delete(this.assetForm.value.id).subscribe((data: any) => {
          this.getAssets()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.assetForm.reset()
    this.assetForm.get('acquisition_cost').patchValue(0)
    this.assetForm.get('accumulated_depreciation').patchValue(0)
  }

}
