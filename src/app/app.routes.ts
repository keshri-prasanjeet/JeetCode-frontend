import {Routes} from '@angular/router';
import {CodemirComponent} from "./codemir/codemir.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MeComponent} from "./me/me.component";
import {AuthGuard} from "./login/auth.guard";

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, title: 'Home'
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    title: 'Signup',
    loadComponent: () => import('./signup/signup.component').then(mod => mod.SignupComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'problems',
    title: 'Problems',
    loadComponent: () => import('./problems-list-page/problems-list-page.component').then(mod => mod.ProblemsListPageComponent)
  },
  {
    path: 'problem/:problemId',
    title: 'Problem',
    loadComponent: () => import('./problem-page/problem-page.component').then(mod => mod.ProblemPageComponent)
  },
  {
    path: 'codemir',
    title: 'Codemir',
    loadComponent: () => import('./codemir/codemir.component').then(mod => mod.CodemirComponent)
  },
  {
    path: 'spin',
    title:'Spin',
    loadComponent:  () => import('./loading-spinner/loading-spinner.component').then(mod => mod.LoadingSpinnerComponent)
  },
  {
    path: 'resize',
    title: 'resize',
    loadComponent:  () => import('./resize-test/resize-test.component').then(mod => mod.ResizeTestComponent)
  },
  {
    path: 'me',
    title: 'me',
    loadComponent: () => import('./me/me.component').then(mod => MeComponent)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },//this path has to be in the bottom always
];
