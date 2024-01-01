import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { anonymousGuard } from './services/shared/anonymous.guard';
import { authGuard } from './services/shared/auth.guard';
import { StudentsComponent } from './components/students/students.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { UsersComponent } from './components/users/users.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { adminGuard } from './services/shared/admin.guard';
import { StudentNewComponent } from './components/student-new/student-new.component';
import { DeleteComponent } from './components/delete/delete.component';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent,
    canActivate: [anonymousGuard]
  },
  { path: 'unauthorized',
  component: NotAuthorizedComponent,
  canActivate: [authGuard]
},
  { path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'attendances',
        component: AttendancesComponent
      },
      {
        path: 'student-new',
        component: StudentNewComponent
      },
      {
        path: 'student-new/:id' ,
        component: StudentNewComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [adminGuard],
        data: {
          role: ['ROLE_ADMIN']
        }
      },
      {
        path: 'confirm-delete/:id/:type',
        component: DeleteComponent,
        canActivate: [adminGuard],
        data: {
          role: ['ROLE_ADMIN']
        }
      }
    ]
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
