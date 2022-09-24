import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {InitGuard} from "./gaurds/can-load/init.guard";
import {ResolveAppDataGuard} from "./gaurds/resolve/app/resolve-app-data.guard";
import {AuthGuard} from "./gaurds/can-active/auth.guard";


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
		path        : 'apps',
		loadChildren: () => import('./pages/apps/apps.module').then(m => m.AppsModule),
		canActivate : [AuthGuard],
	},
	{
		path        : 'users',
		loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
		canActivate : [AuthGuard],
	},
	{
		path        : ':id',
		loadChildren: () => import('./pages/app/tabs/tabs.module').then(m => m.TabsPageModule),
		canActivate : [AuthGuard],
		resolve     : {not_using_anywhere: ResolveAppDataGuard}
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
