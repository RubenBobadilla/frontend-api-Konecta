import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
/** Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
/** Login */
import { RegisterComponent } from './components/register/register.component';
/** Products */
import { ProductComponent } from './components/product/product.component';
import { CreateComponent } from './components/product/create/create.component';
import { IndexComponent } from './components/product/index/index.component';
import { UpdateComponent } from './components/product/update/update.component';
/** Roles */
import { IndexRoleComponent } from './components/role/index-role/index-role.component';
import { CreateRoleComponent } from './components/role/create-role/create-role.component';
import { UpdateRoleComponent } from './components/role/update-role/update-role.component';
/** Users */
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { IndexUserComponent } from './components/user/index-user/index-user.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
/** Modulos */ 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'  // Para peticiones
/** Provider */
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    /** Components */
    AppComponent,
    HomeComponent,
    PrivateComponent,
    AdminComponent,
    /** Auth */
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    //** Products */
    ProductComponent,
    CreateComponent,
    IndexComponent,
    UpdateComponent,
    /** Roles */
    IndexRoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    /** Users */
    UpdateUserComponent,
    IndexUserComponent,
    CreateUserComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    // JWT
    {provide:JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    // Token Interceptor
    { provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
