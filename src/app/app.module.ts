import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { StudentsComponent } from './components/students/students.component';
import { TuitionsComponent } from './components/tuitions/tuitions.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { UsersComponent } from './components/users/users.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StudentNewComponent } from './components/student-new/student-new.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserNewComponent } from './components/user-new/user-new.component';
import { ApiInterceptorService } from './services/shared/api-interceptor.service';
import { StudentService } from './services/student.service';
import { UserService } from './services/user.service';
import { DeleteComponent } from './components/delete/delete.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FirstLoginComponent } from './components/first-login/first-login.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    NotFoundComponent,
    LoginComponent,
    StudentsComponent,
    TuitionsComponent,
    AttendancesComponent,
    UsersComponent,
    NotAuthorizedComponent,
    StudentNewComponent,
    UserNewComponent,
    DeleteComponent,
    ResetPasswordComponent,
    FirstLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers: [
    StudentService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true
    }
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
