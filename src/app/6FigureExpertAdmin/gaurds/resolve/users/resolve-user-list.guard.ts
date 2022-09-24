import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOUser} from "../../../../vo/VOUser";
import {NavController} from "@ionic/angular";
import {BackendService} from "../../../../services/backend.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {VOError} from "../../../../vo/VOError";


@Injectable({
	providedIn: 'root'
})
export class ResolveUserListGuard implements Resolve<VOUser>
{
	constructor(private navController:NavController,
			  private backendService:BackendService,
			  private alertService:ArrowAlertService,
			  private navControllerArrow:ArrowNavigationService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOUser> | Promise<VOUser> | VOUser
	{
		console.log('ResolveUserListGuard');


		return this.backendService.getUsers()
			   .then((users) => {

				   this.backendService.users = users;
				   return users;
			   })

			   .catch((error:VOError) => {

				   this.alertService.error(error.msg);
				   this.navController.navigateRoot(this.navControllerArrow.root);


				   return null;
			   });
	}
}
