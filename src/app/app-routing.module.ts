import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//** Components */
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { PrivateComponent } from './components/private/private.component';
import { PrincipalComponent } from './components/principal/principal.component';
/** Products */
import { ProductComponent } from './components/product/product.component';
import { IndexComponent } from './components/product/index/index.component';
import { CreateComponent } from './components/product/create/create.component';
import { UpdateComponent } from './components/product/update/update.component';
/** Roles */
import { IndexRoleComponent } from './components/role/index-role/index-role.component';
import { CreateRoleComponent } from './components/role/create-role/create-role.component';
import { UpdateRoleComponent } from './components/role/update-role/update-role.component';
/** Users */
import { IndexUserComponent } from './components/user/index-user/index-user.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
//** Guards */
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ProductGuard } from './guards/product.guard';

const routes: Routes = [
  /** Auth */
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, },
  { path: 'private', component: PrivateComponent, canActivate: [AuthGuard] },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  /** Products */
  { path: 'product', component: ProductComponent, canActivate: [ProductGuard], data: { expectedRole: 'ROLE_ADMIN', expectedRoleT: 'ROLE_SALE' } },
  { path: 'product/index', component: IndexComponent, canActivate: [ProductGuard], data: { expectedRole: 'ROLE_ADMIN', expectedRoleT: 'ROLE_SALE' } },
  { path: 'product/create', component: CreateComponent, canActivate: [ProductGuard], data: { expectedRole: 'ROLE_ADMIN', expectedRoleT: 'ROLE_SALE' } },
  { path: 'product/update', component: UpdateComponent, canActivate: [ProductGuard], data: { expectedRole: 'ROLE_ADMIN', expectedRoleT: 'ROLE_SALE' } },
  /** Roles */
  { path: 'role/index', component: IndexRoleComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'role/create', component: CreateRoleComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'role/update', component: UpdateRoleComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  /** Roles */
  { path: 'user/index', component: IndexUserComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'user/create', component: CreateUserComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'user/update', component: UpdateUserComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
