import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOPage} from "../../../../vo/VOPage";
import {BackendService} from "../../../../services/backend.service";
import {NavController} from "@ionic/angular";
import {VOApp} from "../../../../vo/VOApp";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {VOError} from "../../../../vo/VOError";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";


@Injectable({
	providedIn: 'root'
})
export class ResolveAppDataGuard implements Resolve<VOPage[]>
{
	constructor(private navController:NavController,
			  private backendService:BackendService,
			  private alertService:ArrowAlertService,
			  private navControllerArrow:ArrowNavigationService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOPage[]> | Promise<VOPage[]> | VOPage[]
	{
		console.log('ResolveAppDataGuard');


		let app:VOApp = this.backendService.currentApp;


		return this.backendService.getAppPages(app.entityId)
			   .then((value) => this.backendService.pages = value)


			   .then(() => this.backendService.getAppCategories(app.entityId))
			   .then((value) => this.backendService.categories = value)


			   .then(() => this.backendService.getAppGroups(app.entityId))
			   .then((value) => this.backendService.groups = value)


			   .catch((error:VOError) => {

				   this.alertService.error(error.msg);
				   this.navController.navigateRoot(this.navControllerArrow.root);


				   return null;
			   });
	}
}
