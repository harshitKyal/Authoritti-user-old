import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../../services/backend.service";
import {EnumField} from "../../../../enums/Enums";
import {VOApp} from "../../../../vo/VOApp";


@Injectable({
	providedIn: 'root'
})
export class ResolveAppAddEditGuard implements Resolve<VOApp>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOApp> | Promise<VOApp> | VOApp
	{
		console.log('ResolveAppAddEditGuard');


		let id:string = route.paramMap.get(EnumField.APP_ID);


		return this.backendService.getApp(id) || new VOApp();
	}
}
