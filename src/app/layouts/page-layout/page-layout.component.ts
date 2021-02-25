import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {

  session_data;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  vendor : any

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public helper: HelperService,
    private locationService: Location
    ) {
      this.session_data = this.helper.getSession();
      this.vendor = this.helper.getVendor();
  }

  confirmLogout(){
    let dialogRef = this.helper.confirm('Logout?', 'Are you sure you want to log out?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.authService.logout(this.session_data.id)
      }
    });
  }

  back(){
    this.locationService.back()
  }

  get logo(){
    return this.helper.getLogo()
  }
}
