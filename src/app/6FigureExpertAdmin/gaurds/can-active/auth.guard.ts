import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../services/backend.service";
import {EnumRoute} from "../../../enums/Enums";
import {NavController} from "@ionic/angular";


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
	constructor(private backendService:BackendService,
			  private navController:NavController)
	{
	}





	canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
	{
		console.log("AuthGuard");


		if (this.backendService.signedInUser)
		{
			return true;
		}


		return this.navController.navigateRoot(EnumRoute.LOGIN)
			   .then(() => false);
	}
}
