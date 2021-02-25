import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper/helper.service';
import { BusinessLogoService } from 'src/app/services/business-logo/business-logo.service';

@Component({
  selector: 'app-business-logo',
  templateUrl: './business-logo.component.html',
  styleUrls: ['./business-logo.component.scss']
})
export class BusinessLogoComponent implements OnInit {

  loading: boolean = false
  imageInfo : string = "Click to upload image"
  uploading : boolean = false
  imagePreview : any = 'assets/images/avatar.png'
  fileData: File = null;
  progress = null


  constructor(
    private businessLogoService: BusinessLogoService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {

  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }


  preview() {
    var mimeType = this.fileData.type;
    console.log(this.fileData)
    if (mimeType.match(/image\/*/) == null || this.fileData.size > 1000000) {
      this.imageInfo = "invalid image or size exceed 1mb"
      return;
    }

    this.uploading = true
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.imagePreview = reader.result;
    }
    this.startUpload()
  }

  startUpload() {
    const formData = new FormData();
    formData.append('image', this.fileData);
    this.businessLogoService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
              this.uploading = false
              this.helper.showSuccess(event.body.message, 'Success!')
              this.imageInfo = "Click to upload another image"
              this.businessLogoService.get()
          }
      });
  }

  get logo(){
    return this.helper.getLogo()
  }
}
