import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { NoAccountComponent } from './components/no-account/no-account.component';
import { AccountGuard } from './guards/account/account.guard';
import { AuthGuard } from './guards/auth.guard';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'no-account',
    component: NoAccountComponent,
  },
  {
    path: 'contact-admin',
    component: ContactAdminComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  // path: '**',
  // component: PageNotFoundComponent
  // },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
