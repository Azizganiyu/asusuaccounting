import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountInventoryService } from 'src/app/services/account-inventory/account-inventory.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit {

  @ViewChild('inventoryCreateModal', { static: true }) inventoryCreateModal;
  @ViewChild('inventoryEditModal', { static: true }) inventoryEditModal;

  start_total: number = 0

  inventoryForm = this.fb.group({
    name: ['', [Validators.required]],
    start_qty: [0],
    start_cost: [0],
    description: [''],
    id: [''],
    sales_price: [0],
    purchase_price: [0],
  })

  submit: boolean = false

  loading: boolean = true
  inventories: any = []

  headElements = ['Name', 'Purchase price', 'Sales price', 'Qty on hand', 'Average cost', 'Total cost', 'Action'];

   constructor(
    private fb: FormBuilder,
    private inventoryService: AccountInventoryService,
    private helper: HelperService,
  ) {
    this.getInventories()
  }

  ngOnInit(): void {
    this.inventoryForm.get('start_qty').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.inventoryForm.get('start_cost').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
  }

  calculateTotal(){
    let start_qty = this.inventoryForm.get('start_qty').value?? 0
    let start_cost = this.inventoryForm.get('start_cost').value?? 0
    this.start_total = start_qty * start_cost
  }

  getInventories(){
    this.loading = true
    this.inventoryService.getInventories().subscribe((data: any) => {
      console.log(data)
      this.inventories = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.inventoryCreateModal.hide()
    this.inventoryEditModal.hide()
    this.inventoryForm.reset()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.inventoryForm.value)
    this.inventoryService.create(this.inventoryForm.value).subscribe((data: any) => {
      this.getInventories()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(inventory){
    this.inventoryForm.get('start_qty').patchValue(inventory.start_qty)
    this.inventoryForm.get('start_cost').patchValue(inventory.start_cost)
    this.inventoryForm.get('purchase_price').patchValue(inventory.purchase_price)
    this.inventoryForm.get('sales_price').patchValue(inventory.sales_price)
    this.inventoryForm.get('name').patchValue(inventory.name)
    this.inventoryForm.get('description').patchValue(inventory.description)
    this.inventoryForm.get('id').patchValue(inventory.id)
    this.inventoryEditModal.show()
  }

  update(){
    this.submit = true
    this.inventoryService.edit(this.inventoryForm.value).subscribe((data: any) => {
      this.getInventories()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Inventory?', 'Are you sure you want to Delete this inventory?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.inventoryService.delete(this.inventoryForm.value.id).subscribe((data: any) => {
          this.getInventories()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }


}
