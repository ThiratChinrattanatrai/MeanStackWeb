import { Routes } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";
import { LoginComponent } from "./component/login/login.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { TodoComponent } from "./component/todo/todo.component";

export const appRoutes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    //   canActivate: [RouteGuard]
    },
    {
      path: 'register',
      component: RegisterComponent
    },{
      path: 'todo',
      component: TodoComponent
    }
    // {
    //   path: 'profile',
    //   component: ProfileComponent,
    //   canActivate: [RouteGuard]
    // }
  ];