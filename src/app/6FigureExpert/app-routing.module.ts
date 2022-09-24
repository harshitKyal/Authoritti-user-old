import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {InitGuard} from "../6FigureExpertAdmin/gaurds/can-load/init.guard";
import {AuthGuard} from "../6FigureExpertAdmin/gaurds/can-active/auth.guard";


const routes:Routes = [
     {path: '', redirectTo: 'splash', pathMatch: 'full'},
     {
          path        : 'splash',
          loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
     },
     {
          path        : 'login',
          loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
          canLoad     : [InitGuard],
     },
     {
          path        : 'home',
          loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
          canActivate : [AuthGuard],
     },
     {
          path        : 'financial-goals',
          loadChildren: () => import('./pages/apps/custom/financial-goals/financial-goals.module').then(m => m.FinancialGoalsModule),
          canActivate : [AuthGuard],
     },
     {
          path        : ':id',
          loadChildren: () => import('./pages/apps/dynamic/dynamic.module').then(m => m.DynamicModule),
          canActivate : [AuthGuard]
     },
];


@NgModule({
     imports: [
          RouterModule.forRoot(routes, {
               preloadingStrategy: PreloadAllModules,
          })
     ],
     exports: [RouterModule]
})
export class AppRoutingModule
{
}
