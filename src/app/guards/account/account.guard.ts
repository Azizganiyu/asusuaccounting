import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.hasAccount().pipe(map((response: { hasAccount: boolean, status: boolean}) => {
        if (response.hasAccount) {

          if(response.status){
            return true;
          }
          else{
            this.router.navigate(['/contact-admin']);
            return false
          }
        }
        else{
          this.router.navigate(['/no-account']);
          return false;
        }
    }), catchError((error) => {
        this.router.navigate(['/no-account']);
        return of(false);
    }));
  }

}
